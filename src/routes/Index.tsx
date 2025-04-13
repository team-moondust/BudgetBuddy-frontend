import { useNavigate } from "@tanstack/react-router";
import { SingleCardContainer } from "../components/SingleCardContainer";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";
import "./Index.css";

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
      <div className="landing-root">
        <div style={{ textAlign: "right" }}>
          <img
            src="/logo.png"
            style={{ maxHeight: "200px", marginLeft: "auto" }}
          />
        </div>
        <div className="text-section" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h1 className="logo">
            BudgetBuddy
          </h1>
          <p>
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
