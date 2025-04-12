import { create } from "zustand";
import { api } from "./api";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface IMessage {
  role: "user" | "model";
  content: string;
}

interface ChatState {
  isPending: boolean;
  messages: IMessage[];
  sendMessage(newMessage: string): void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isPending: false,
  sendMessage: async (newMessage: string) => {
    const recent_spends = `Transaction id: txn_09c87c Vendor: Panera Bread Purchase date: 2025-04-11 17:28, Transaction amount: 16.67
Transaction id: txn_62463f Vendor: Panera Bread Purchase date: 2025-04-11 03:53, Transaction amount: 24.69
Transaction id: txn_7aa2fb Vendor: Uber Purchase date: 2025-04-11 01:20, Transaction amount: 29.15
Transaction id: txn_15a1be Vendor: Uber Purchase date: 2025-04-05 16:39, Transaction amount: 24.48
Transaction id: txn_b2b910 Vendor: Panera Bread Purchase date: 2025-03-25 03:01, Transaction amount: 20.85
Transaction id: txn_95b6e5 Vendor: Whole Foods Purchase date: 2025-03-23 02:11, Transaction amount: 72.44
Transaction id: txn_0918f0 Vendor: Whole Foods Purchase date: 2025-03-22 09:37, Transaction amount: 58.18
Transaction id: txn_08b314 Vendor: Uber Purchase date: 2025-03-13 01:31, Transaction amount: 24.79
Transaction id: txn_43f536 Vendor: Uber Purchase date: 2025-03-11 11:20, Transaction amount: 14.81
Transaction id: txn_dcf7e1 Vendor: Panera Bread Purchase date: 2025-03-11 08:34, Transaction amount: 20.22`;

    const big_spends = `Transaction id: txn_95b6e5 Vendor: Whole Foods Purchase date: 2025-03-23 02:11, Transaction amount: 72.44
Transaction id: txn_f52d41 Vendor: Whole Foods Purchase date: 2025-03-07 23:49, Transaction amount: 65.56`;

    const nextMessageRes = api<
      {
        text: string;
      },
      any
    >("POST", "/chat", {
      chat: newMessage,
      history: get().messages.map((m) => ({
        role: m.role,
        parts: [{ text: newMessage }],
      })),
      recent_spends,
      big_spends,
    });

    set((state) => ({
      ...state,
      isPending: true,
      messages: [...state.messages, { role: "user", content: newMessage }],
    }));

    const { text: llmMessage } = await nextMessageRes;

    set((state) => ({
      ...state,
      messages: [...state.messages, { role: "model", content: llmMessage }],
      isPending: false,
    }));
  },
}));

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
