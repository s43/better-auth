import { useStore } from "@nanostores/react";
export const useAuthStore = useStore;

import type { BetterFetchOption } from "@better-fetch/fetch";
import { createAuthClient as createVanillaClient } from "./base";

export const createAuthClient = (options?: BetterFetchOption) => {
	const client = createVanillaClient(options);
	function useSession() {
		return useStore(client.$atoms.$session);
	}
	function useActiveOrganization() {
		return useStore(client.$atoms.$activeOrganization);
	}
	function useListOrganization() {
		return useStore(client.$atoms.$listOrganizations);
	}
	const useInvitation = () => {
		return (
			useAuthStore(client.$atoms.$invitation) || {
				error: null,
				data: null,
			}
		);
	};
	return Object.assign(client, {
		useSession,
		useActiveOrganization,
		useListOrganization,
		useInvitation,
	});
};
