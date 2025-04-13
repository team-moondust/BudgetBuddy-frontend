import { create } from "zustand";


type AuthState = (
  | { isLoggedIn: true; email: string; name: string; password: string }
  | { isLoggedIn: false; email: null; name: null; password: null }
) & {
  login(email: string, password: string): Promise<boolean>;
  signup(name: string, email: string, password: string): Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  name: null,
  email: null,
  password: null,
  async login(email, password) {
    set((state) => ({
      ...state,
      isLoggedIn: true,
      name: "Le Goat",
      email,
      password,
    }));
    return true;
  },
  async signup(name, email, password) {
    set((state) => ({
      ...state,
      isLoggedIn: true,
      name,
      email,
      password,
    }));
    return true;
  },
}));