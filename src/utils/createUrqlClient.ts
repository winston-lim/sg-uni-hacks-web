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

const invalidateCacheByFieldName = (fieldName: string, cache: Cache) => {
	const allFields = cache.inspectFields("Query");
	const fieldInfos = allFields.filter((info) => {
		return info.fieldName === fieldName;
	});
	fieldInfos.forEach((fieldInfo) => {
		cache.invalidate("Query", fieldName, fieldInfo.arguments);
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
		//entityKey = query; fieldName = hacks | verifiedHacks etc
		//cache.inspectFields() returns all Queries
		const allFields = cache.inspectFields(entityKey);
		//returns all Queries that are hacks
		const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
		// if no such Queries, return undefined
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
			"hacks"
		);
		//info.partial tells the cacheExchange whether or not cache is up to date or data is missing
		//if cache exists, info.partial is false = no need to update cache
		//if not in cache, info.partial is true = some data is uncached and missing = need to update cache
		//info.partial = false implicitly returns undefined
		info.partial = !isInCache;

		//info.partial is true, update cache manually
		const hacks: string[] = [];
		let hasMore: boolean = true;

		// resolve values from Queries of hacks and append it to the cache for cursor pagination
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

export const cursorPaginationByArguments = (): Resolver => {
	return (
		_parent: DataField,
		fieldArgs: Variables,
		cache: Cache,
		info: ResolveInfo
	) => {
		const { parentKey: entityKey, fieldName } = info;
		const allFields = cache.inspectFields(entityKey);
		const fieldInfos = allFields.filter(
			(info) =>
				info.fieldName === fieldName &&
				// ensures Query arguments are also identical
				info.arguments!.category === fieldArgs.category
		);
		const size = fieldInfos.length;
		if (size === 0) {
			return undefined;
		}
		const isInCache = cache.resolve(
			cache.resolve(
				entityKey,
				`${fieldName}(${stringifyVariables(fieldArgs)})`
			) as string,
			"hacks"
		);
		info.partial = !isInCache;

		const hacks: string[] = [];
		let hasMore: boolean = true;
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
						verifiedHacksBySearchTerm: cursorPagination(),
						verifiedHacksByCategory: cursorPaginationByArguments(),
						userLikedHacks: cursorPaginationByArguments(),
					},
				},
				updates: {
					Mutation: {
						login: (_result, _1, cache, _2) => {
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
							invalidateCacheByFieldName("verifiedHacksBySearchTerm", cache);
							invalidateCacheByFieldName("userHacks", cache);
							invalidateCacheByFieldName("verifiedHacksByCategory", cache);
						},
						register: (_result, _1, cache, _2) => {
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
							invalidateCacheByFieldName("verifiedHacksBySearchTerm", cache);
							invalidateCacheByFieldName("userHacks", cache);
							invalidateCacheByFieldName("verifiedHacksByCategory", cache);
						},
						logout: (_result, _1, cache, _2) => {
							typedUpdateQuery<LogoutMutation, CurrentUserQuery>(
								cache,
								{ query: CurrentUserDocument },
								_result,
								() => ({ currentUser: null })
							);
							invalidateCacheByFieldName("verifiedHacksBySearchTerm", cache);
							invalidateCacheByFieldName("userHacks", cache);
							invalidateCacheByFieldName("verifiedHacksByCategory", cache);
						},
						changePassword: (_result, _1, cache, _2) => {
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
						createHack: (_result, _1, cache, _2) => {
							invalidateCacheByFieldName("userHacks", cache);
							invalidateCacheByFieldName("allHacks", cache);
						},
						deleteHack: (_result, _1, cache, _2) => {
							invalidateCacheByFieldName("userHacks", cache);
							invalidateCacheByFieldName("allHacks", cache);
						},
						verifyHack: (_result, _1, cache, _2) => {
							invalidateCacheByFieldName("verifiedHacksBySearchTerm", cache);
							invalidateCacheByFieldName("userHacks", cache);
							invalidateCacheByFieldName("allHacks", cache);
							invalidateCacheByFieldName("verifiedHacksByCategory", cache);
						},
						vote: (_result, args, cache, _1) => {
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
								console.log(data);
								const newPoints = data.points + (value === 1 ? value : -1);
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
							invalidateCacheByFieldName("userLikedHacks", cache);
							invalidateCacheByFieldName("mostLikedHacks", cache);
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
