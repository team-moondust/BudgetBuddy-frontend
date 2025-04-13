import { create } from "zustand";
import { api } from "../api";

interface StartupData {
  final_score: number;
  score_explanation: string;
  startup_msg: string;
  image: number;
}

interface UserDataState {
  startupData: null | StartupData;
  fetchStartupData(email: string, monthly_budget: number): Promise<boolean>;
}

export const useUserDataStore = create<UserDataState>((set) => ({
  startupData: null,
  async fetchStartupData(email, monthly_budget) {
    const res = await api<
      { success: false } | { success: true; res: StartupData },
      any
    >("POST", `/compute_score`, {
      email,
      monthly_budget
    });

    if (!res.success) {
      alert("Fetching data failed! :(");
      return false;
    }

    set((state) => ({ ...state, startupData: res.res }));
    return true;
  },
}));
