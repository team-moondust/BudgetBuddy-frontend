import { create } from "zustand";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface IMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

interface ChatState {
  isPending: boolean;
  messages: IMessage[];
  sendMessage(newMessage: IMessage): void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isPending: false,
  sendMessage: async (newMessage: IMessage) => {
    set((state) => ({
      ...state,
      isPending: true,
      messages: [...state.messages, newMessage],
    }));

    await wait(1000);

    set((state) => ({ ...state, isPending: false }));
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
    return true;
  },
  async signup(name, email, password) {
    return true;
  },
}));
