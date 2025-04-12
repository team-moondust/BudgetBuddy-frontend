import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { useChatStore } from "../store";

const ContentContainer = styled.div<{ $messageCount: number }>`
  display: flex;
  justify-content: center;
  padding: 50px;
  margin: 0 auto;
  width: ${(props) => (props.$messageCount === 0 ? "100%" : "50%")};
  transition: width 0.5s;

  img {
    height: ${(props) => (props.$messageCount === 0 ? "70%" : "60%")};
  }
`;

export function Hero() {
  const chatStore = useChatStore();

  return (
    <div>
      <ContentContainer $messageCount={chatStore.messages.length}>
        <CircularProgressbarWithChildren value={60} maxValue={100}>
          <img src="/test.png" alt="tomygothi" />
          <b>60%</b>
        </CircularProgressbarWithChildren>
      </ContentContainer>
      <div style={{ textAlign: "center" }}>
        js hand me the friggin packet yo
      </div>
    </div>
  );
}
