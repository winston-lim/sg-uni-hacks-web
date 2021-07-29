import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "../generated/graphql";

export const useIsAuth = () => {
	const router = useRouter();
	const [{ data, fetching }] = useCurrentUserQuery();
	useEffect(() => {
		if (!data?.currentUser && !fetching) {
			router.replace("/login?next=" + router.pathname);
		}
	}, [data, router, fetching]);
	if (data?.currentUser && !fetching) {
		return data.currentUser;
	}
};
