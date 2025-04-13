import styled from "styled-components";
import { useAuthStore } from "../stores/auth";
import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

function getTimeGreeting(name: string) {
  // const now = new Date();
  // const hour = now.getHours();

  // if (hour >= 5 && hour < 12) {
  //   return `Good morning, ${name}!`;
  // } else if (hour >= 12 && hour < 17) {
  //   return `Good afternoon, ${name}!`;
  // } else if (hour >= 17 && hour < 22) {
  //   return `Good night, ${name}!`;
  // } else {
  //   return `Up so late, ${name}?`;
  // }
  return `Hi ${name}!`
}

const NavContainer = styled.div<{ $justifyContent: string }>`
  display: flex;
  justify-content: ${(props) => props.$justifyContent};
  align-items: center;
  border-bottom: 1px solid var(--dark);

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
  const navigate = useNavigate();

  const logout = useCallback(() => {
    authStore.logout();
    navigate({ to: "/auth" });
  }, [authStore.logout, navigate]);

  return (
    <NavContainer
      $justifyContent={authStore.isLoggedIn ? "space-between" : "center"}
      className="box"
    >
      <div
        className="logo"
        style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
      >
        <img style={{ height: "20px" }} src="/logo.png" /> BudgetBuddy
      </div>
      {authStore.isLoggedIn && (
        <div className="logout">
          <>
            <span>{getTimeGreeting(authStore.user.name)}</span>
            <span onClick={logout} className="icon material-symbols-rounded">
              logout
            </span>
          </>
        </div>
      )}
    </NavContainer>
  );
}
