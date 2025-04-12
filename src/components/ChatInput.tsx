import styled from "styled-components";
import { useChatStore } from "../store";
import { ChangeEvent, useCallback, useState } from "react";

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
  const chatStore = useChatStore();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentMessage(e.target.value);
    },
    [setCurrentMessage]
  );

  const handleSendMessage = useCallback(() => {
    chatStore.sendMessage({
      role: "user",
      content: currentMessage,
    });
    setCurrentMessage("");
  }, [currentMessage]);

  return (
    <ChatInputContainer>
      <input
        value={currentMessage}
        onChange={handleMessageChange}
        type="text"
        placeholder="talk to me lil bro"
      />
      <button disabled={chatStore.isPending} onClick={handleSendMessage}>
        <span className="material-symbols-rounded">send</span>
      </button>
    </ChatInputContainer>
  );
}
