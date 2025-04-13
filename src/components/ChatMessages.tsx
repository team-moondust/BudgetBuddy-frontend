import styled from "styled-components";
import { useAuthStore } from "../stores/auth";
import { useChatStore } from "../stores/chat";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessagesContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  gap: 20px;

  .message > b {
    font-size: 1.125rem;
  }
`;

export function ChatMessages() {
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.lastElementChild?.scrollIntoView();
  }, [chatStore.messages.length]);

  return authStore.isLoggedIn ? (
    <ChatMessagesContainer ref={containerRef}>
      {chatStore.messages.map((message) => (
        <div className="message" key={Math.random()}>
          <b>{message.role === "user" ? authStore.user.name : "Buddy"}</b>
          <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
        </div>
      ))}
    </ChatMessagesContainer>
  ) : null;
}
