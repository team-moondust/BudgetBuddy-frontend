import styled from "styled-components";

export const SingleCardContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  height: 600px;
  gap: 20px;

  .title {
    font-weight: normal;
    text-align: center;
  }

  .selection-group {
    display: flex;
    gap: 10px;
  }

  .selection-group button {
    flex: auto;
    justify-content: center;
  }

  .selection-group button.selected {
    background-color: var(--african-violet);
  }

  .input-group h3 {
    text-align: center;
  }
`;
