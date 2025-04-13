import { create } from "zustand";
import { api } from "../api";

type User = {
  email: string;
  name: string;
  password: string;
  onboarded: boolean;
  nessie_id: string;
};

type AuthState = (
  | {
      isLoggedIn: true;
      user: User;
    }
  | { isLoggedIn: false; user: null }
) & {
  login(email: string, password: string): Promise<boolean>;
  signup(
    name: string,
    email: string,
    password: string,
    nessie_id: string
  ): Promise<boolean>;
  logout(): void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  async login(email, password) {
    const res = await api<
      { success: true; user: User } | { success: false },
      any
    >("POST", "/login", {
      email,
      password,
    });

    if (!res.success) {
      return false;
    }

    set((state) => ({
      ...state,
      isLoggedIn: true,
      user: res.user,
    }));

    return true;
  },
  async signup(name, email, password, nessie_id) {
    const res = await api<
      { success: true; user: User } | { success: false },
      any
    >("POST", "/register", {
      name,
      nessie_id,
      email,
      password,
    });

    if (!res.success) {
      return false;
    }

    set((state) => ({
      ...state,
      isLoggedIn: true,
      user: res.user,
    }));

    return true;
  },
  logout() {
    set(() => ({ isLoggedIn: false, user: null }));
  },
}));
