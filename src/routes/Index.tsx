import { useNavigate } from "@tanstack/react-router";
import { SingleCardContainer } from "../components/SingleCardContainer";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";

export function Index() {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  useEffect(() => {
      if (authStore.isLoggedIn) {
        navigate({ to: "/dashboard" });
      }
    }, []);

  return (
    <SingleCardContainer>
      <div style={{ display: "flex", gap: "20px", margin: "0 auto" }}>
        <div style={{ textAlign: "right" }}>
          <img
            src="/logo.png"
            style={{ maxHeight: "200px", marginLeft: "auto" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h1 className="logo" style={{ fontSize: "2.5rem" }}>
            BudgetBuddy
          </h1>
          <p style={{ fontSize: "1.25rem" }}>
            Because your finances deserve a little fun.
          </p>

          <br />

          <button
            onClick={() => navigate({ to: "/auth" })}
            className="standard-btn logo"
          >
            Get started!
          </button>
        </div>
      </div>
    </SingleCardContainer>
  );
}
