import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { useChatStore } from "../store";

const ContentContainer = styled.div<{ $messageCount: number }>`
  display: flex;
  justify-content: center;

  .progress-bar-container {
    width: ${(props) => (props.$messageCount === 0 ? "350px" : "175px")};
    transition: width 0.5s;
  }

  img {
    height: 60%;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    transition: height 0.5s;
  }

  .logo {
    font-size: ${(props) => (props.$messageCount === 0 ? "1.25rem" : "1rem")};
    transition: font-size 0.5s;
  }
`;

export function Hero() {
  const chatStore = useChatStore();

  return (
    <div>
      <ContentContainer
        className="box"
        $messageCount={chatStore.messages.length}
      >
        <div className="progress-bar-container">
          <CircularProgressbarWithChildren value={60} maxValue={100}>
            <img src="/test.png" alt="tomygothi" />
            <b className="logo">60%</b>
          </CircularProgressbarWithChildren>
        </div>
      </ContentContainer>
    </div>
  );
}
