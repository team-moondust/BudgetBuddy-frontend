import styled from "styled-components";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { ChatInput } from "./components/ChatInput";

const Root = styled.main`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export function App() {
  return (
    <Root>
      <Nav />
      <Hero />
      <div style={{ flex: "auto" }}></div>
      <ChatInput />
    </Root>
  );
}
