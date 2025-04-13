import { create } from "zustand";
import { api } from "../api";

function syncLocalStorage(user: User) {
  localStorage.setItem("__user__", JSON.stringify(user));
}

function nukeLocalStorage() {
  localStorage.removeItem("__user__");
}

type User = {
  email: string;
  name: string;
  password: string;
  onboarded: boolean;
  nessie_id: string;
  pet_choice: number;
  goals: string;
  response_style: string;
  monthly_budget: number;
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
  submitOnboarding(
    pet_choice: number,
    goals: string,
    response_style: string,
    monthly_budget: number
  ): Promise<boolean>;
};

let initialUser = null;

try {
  initialUser = JSON.parse(localStorage.getItem("__user__") ?? "M<<MM<#$<M#$M");
} catch (err) {
  initialUser = null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: initialUser !== null,
  user: initialUser,
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

    syncLocalStorage(res.user);

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

    syncLocalStorage(res.user);

    return true;
  },
  logout() {
    set(() => ({ isLoggedIn: false, user: null }));
    nukeLocalStorage();
  },
  async submitOnboarding(pet_choice, goals, response_style, monthly_budget) {
    const state = get();

    if (!state.isLoggedIn) return false;

    const res = await api<{ success: boolean }, any>("POST", "/onboarding", {
      email: state.user.email,
      pet_choice,
      goals,
      response_style,
      monthly_budget,
    });

    if (res.success) {
      set((state) =>
        !state.isLoggedIn
          ? state
          : {
              ...state,
              user: {
                ...state.user,
                pet_choice,
                goals,
                response_style,
                monthly_budget,
                onboarded: true,
              },
            }
      );
    }

    return res.success;
  },
}));
