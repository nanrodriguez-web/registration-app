import type { USER_STATE_I, USER_T } from "@/types/user";
import { create } from "zustand";

const useUser = create<USER_STATE_I>((set) => ({
	user: null,
	setUser: (user: USER_T) => set({ user }),
	resetUser: () => set({ user: null }),
}));

export default useUser;
