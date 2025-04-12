import styled from "styled-components";
import { useAuthStore } from "../store";

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  .logo {
    font-size: 1.125rem;
  }

  .logout {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }

  .logout .icon {
    color: var(--burnt-sienna);
  }
`;

export function Nav() {
  const authStore = useAuthStore();

  return (
    <NavContainer className="box lifted">
      <div className="logo">BudgetBuddy</div>
      <div className="logout">
        {authStore.isLoggedIn && (
          <>
            <span>Hey, {authStore.name}!</span>
            <span className="icon material-symbols-rounded">logout</span>
          </>
        )}
      </div>
    </NavContainer>
  );
}
