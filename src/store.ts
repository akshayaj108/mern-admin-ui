import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,

      setUser: (user) =>
        set({ user }, false, "auth/setUser"),

      logout: () =>
        set({ user: null }, false, "auth/logout"),
    }),
  )
);