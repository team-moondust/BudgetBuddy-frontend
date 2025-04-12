import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

export function Hero() {
  return (
    <div>
      <ContentContainer>
        <CircularProgressbarWithChildren value={60} maxValue={100}>
          <img src="/test.png" alt="tomygothi" style={{ height: "70%" }} />
          <b>60%</b>
        </CircularProgressbarWithChildren>
      </ContentContainer>
      <div style={{ textAlign: "center" }}>
        js hand me the friggin packet yo
      </div>
    </div>
  );
}
