import styled from "styled-components";
import { useChatStore } from "../stores/chat";
import { ChangeEvent, useCallback, useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useUserDataStore } from "../stores/userData";

const ChatInputContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: stretch;
  gap: 5px;

  input {
    flex: auto;
  }
`;

export function ChatInput() {
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const userDataStore = useUserDataStore();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentMessage(e.target.value);
    },
    [setCurrentMessage]
  );

  const handleSendMessage = useCallback(() => {
    if (
      currentMessage === "" ||
      !authStore.isLoggedIn ||
      userDataStore.startupData == null
    ) {
      return;
    }

    chatStore.sendMessage(
      authStore.user.email,
      currentMessage,
      authStore.user.response_style,
      authStore.user.monthly_budget,
      authStore.user.goals,
      userDataStore.startupData.final_score,
      userDataStore.startupData.score_explanation
    );
    setCurrentMessage("");
  }, [currentMessage]);

  return (
    <ChatInputContainer>
      <input
        value={currentMessage}
        onChange={handleMessageChange}
        type="text"
        placeholder="Ask me anything!"
      />
      <button disabled={chatStore.isPending} onClick={handleSendMessage}>
        <span className="material-symbols-rounded">send</span>
      </button>
    </ChatInputContainer>
  );
}
