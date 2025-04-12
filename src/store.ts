import { create } from "zustand";

interface IMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

interface ChatState {
  messages: IMessage[];
  sendMessage(newMessage: IMessage): void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  sendMessage: (newMessage: IMessage) =>
    set((state) => ({
      ...state,
      messages: [...state.messages, newMessage],
    })),
}));
