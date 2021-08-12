import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "../generated/graphql";

export const useIsAuth = () => {
	const router = useRouter();
	const [{ data, fetching }] = useCurrentUserQuery();
	useEffect(() => {
		//if user is not authenticated redirect to login page with ?next= current path
		//in the login page, onSubmit checks if ?next= exists, and if so routes user to where he was trying to reach
		if (!data?.currentUser && !fetching) {
			router.replace("/login?next=" + router.pathname);
		}
	}, [data, router, fetching]);
	if (data?.currentUser && !fetching) {
		return data.currentUser;
	}
	return;
};
