import { create } from "zustand";

interface IMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

interface ChatState {
  isPending: boolean;
  messages: IMessage[];
  sendMessage(newMessage: IMessage): void;
}

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
