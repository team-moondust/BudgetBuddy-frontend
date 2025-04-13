import { create } from "zustand";
import { api } from "../api";

interface IMessage {
  role: "user" | "model";
  content: string;
}

interface ChatState {
  isPending: boolean;
  messages: IMessage[];
  sendMessage(
    email: string,
    newMessage: string,
    response_style: string,
    budget: number,
    goals: string
  ): void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isPending: false,
  sendMessage: async (
    email: string,
    newMessage: string,
    response_style: string,
    budget: number,
    goals: string
  ) => {
    const nextMessageRes = api<
      {
        text: string;
      },
      any
    >("POST", "/chat", {
      chat: newMessage,
      email,
      history: get().messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
      response_style,
      budget,
      goals,
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
