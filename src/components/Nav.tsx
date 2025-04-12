import styled from "styled-components";

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export function Nav() {
  return (
    <NavContainer className="box lifted">
      <span className="material-symbols-rounded">menu</span>
      <div className="logo" style={{ textAlign: "center" }}>
        BudgetBuddy
      </div>
      <span
        style={{ textAlign: "right" }}
        className="material-symbols-rounded"
      >
        logout
      </span>
    </NavContainer>
  );
}
