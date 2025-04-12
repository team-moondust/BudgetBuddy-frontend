import styled from "styled-components";

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  
  .logo {
    font-size: 1.125rem;
  }

  .logout {
    text-align: right;
    color: var(--burnt-sienna);
  }
`;

export function Nav() {
  return (
    <NavContainer className="box lifted">
      <div className="logo">BudgetBuddy</div>
      <span className="logout material-symbols-rounded">
        logout
      </span>
    </NavContainer>
  );
}
