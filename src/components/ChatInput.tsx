import styled from "styled-components";

const ChatInputContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: stretch;
  gap: 5px;

  input {
    flex: auto;
  }

  input, button {
    padding: 5px;
  }
`;

export function ChatInput() {
  return (
    <ChatInputContainer>
      <input type="text" placeholder="talk to me lil bro" />
      <button>dont pmo</button>
    </ChatInputContainer>
  );
}