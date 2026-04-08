import { create } from "zustand";
import { User } from "@/types/payment";

interface UserState {
  user?: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  isAuthenticated: false,

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  setAuthenticated: (authenticated: boolean) => {
    set({ isAuthenticated: authenticated });
  },

  logout: () => {
    set({ user: undefined, isAuthenticated: false });
  },
}));
