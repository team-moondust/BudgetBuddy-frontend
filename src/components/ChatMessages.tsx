import styled from "styled-components";
import { useChatStore } from "../store";
import { useEffect, useRef } from "react";

const ChatMessagesContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
`;

export function ChatMessages() {
  const chatStore = useChatStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.lastElementChild?.scrollIntoView();
  }, [chatStore.messages.length]);

  return (
    <ChatMessagesContainer ref={containerRef}>
      {chatStore.messages.map((message) => (
        <div key={Math.random()}>
          <b>{message.role}</b>
          <p>{message.content}</p>
        </div>
      ))}
    </ChatMessagesContainer>
  );
}
