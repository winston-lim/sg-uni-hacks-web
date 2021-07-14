import {
	dedupExchange,
	Exchange,
	fetchExchange,
	stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import {
	LoginMutation,
	CurrentUserQuery,
	CurrentUserDocument,
	RegisterMutation,
	LogoutMutation,
	ChangePasswordMutation,
	VoteMutationVariables,
} from "../generated/graphql";
import {
	Cache,
	cacheExchange,
	DataField,
	ResolveInfo,
	Resolver,
	Variables,
} from "@urql/exchange-graphcache";
import { typedUpdateQuery } from "./typedUpdateQuery";
import Router from "next/router";
import gql from "graphql-tag";
import { isServer } from "./isServer";

const invalidateAllHacks = (cache: Cache) => {
	const allFields = cache.inspectFields("Query");
	const fieldInfos = allFields.filter((info) => info.fieldName === "hacks");
	fieldInfos.forEach((fieldInfo) => {
		cache.invalidate("Query", "hacks", fieldInfo.arguments);
	});
};

export const errorExchange: Exchange =
	({ forward }) =>
	(ops$) => {
		return pipe(
			forward(ops$),
			tap(({ error }) => {
				if (error) {
					if (error?.message.includes("not authenticated")) {
						Router.replace("/login");
					}
				}
			})
		);
	};

export const cursorPagination = (): Resolver => {
	return (
		_parent: DataField,
		fieldArgs: Variables,
		cache: Cache,
		info: ResolveInfo
	) => {
		const { parentKey: entityKey, fieldName } = info;
		//entityKey = query; fieldName = hacks
		//cache.inspectFields() returns all the Queries
		const allFields = cache.inspectFields(entityKey);
		//fieldInfos returns all Queries that are hacks
		const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
		// if no data, return undefined
		const size = fieldInfos.length;
		if (size === 0) {
			return undefined;
		}
		//check if a query is in cache
		const isInCache = cache.resolve(
			cache.resolve(
				entityKey,
				`${fieldName}(${stringifyVariables(fieldArgs)})`
			) as string,
			"posts"
		);
		//info.partial tells cacheExchange whether or not to make the query request
		//if in cache, do not make request
		// if (!isInCache) {
		// 	return undefined;
		// }
		info.partial = !isInCache;

		// If it is in the cache, then..
		const hacks: string[] = [];
		let hasMore: boolean = true;
		// resolve values from Queries of hacks
		fieldInfos.forEach((fieldInfo) => {
			const key = cache.resolve(entityKey, fieldInfo.fieldKey) as string;
			const hack = cache.resolve(key, "hacks") as string[];
			hacks.push(...hack);
			const _hasMore = cache.resolve(key, "hasMore") as boolean;
			if (!_hasMore) hasMore = _hasMore as boolean;
		});
		return {
			__typename: "PaginatedHacks",
			hasMore,
			hacks,
		};
	};
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
	let cookie = "";
	if (isServer()) {
		//cookie forwarding
		cookie = ctx?.req?.headers?.cookie;
	}
	return {
		url: "http://localhost:4000/graphql",
		fetchOptions: {
			credentials: "include" as const,
			headers: cookie
				? {
						cookie,
				  }
				: undefined,
		},
		exchanges: [
			dedupExchange,
			cacheExchange({
				keys: {
					PaginatedHacks: () => null,
				},
				resolvers: {
					Query: {
						hacks: cursorPagination(),
					},
				},
				updates: {
					Mutation: {
						login: (_result, args, cache, info) => {
							typedUpdateQuery<LoginMutation, CurrentUserQuery>(
								cache,
								{ query: CurrentUserDocument },
								_result,
								(result, query) => {
									if (result.login.errors) {
										return query;
									} else {
										return {
											currentUser: result.login.user,
										};
									}
								}
							);
							invalidateAllHacks(cache);
						},
						register: (_result, args, cache, info) => {
							typedUpdateQuery<RegisterMutation, CurrentUserQuery>(
								cache,
								{ query: CurrentUserDocument },
								_result,
								(result, query) => {
									if (result.register.errors) {
										return query;
									} else {
										return {
											currentUser: result.register.user,
										};
									}
								}
							);
						},
						logout: (_result, args, cache, info) => {
							typedUpdateQuery<LogoutMutation, CurrentUserQuery>(
								cache,
								{ query: CurrentUserDocument },
								_result,
								() => ({ currentUser: null })
							);
						},
						changePassword: (_result, args, cache, info) => {
							typedUpdateQuery<ChangePasswordMutation, CurrentUserQuery>(
								cache,
								{ query: CurrentUserDocument },
								_result,
								(result, query) => {
									if (result.changePassword.errors) {
										return query;
									} else {
										return {
											currentUser: result.changePassword.user,
										};
									}
								}
							);
						},
						createHack: (_result, args, cache, info) => {
							invalidateAllHacks(cache);
						},
						vote: (_result, args, cache, info) => {
							const { hackId, value } = args as VoteMutationVariables;
							const data = cache.readFragment(
								gql`
									fragment _ on Hack {
										id
										points
										voteStatus
									}
								`,
								{ id: hackId } as any
							);
							if (data) {
								if (data.voteStatus === value) {
									return;
								}
								const newPoints =
									data.points + (!data.voteStatus ? 1 : 2) * value;
								cache.writeFragment(
									gql`
										fragment __ on Hack {
											points
											voteStatus
										}
									`,
									{ id: hackId, points: newPoints, voteStatus: value } as any
								);
							}
						},
					},
				},
			}),
			errorExchange,
			ssrExchange,
			fetchExchange,
		],
	};
};
