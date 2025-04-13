import { useNavigate } from "@tanstack/react-router";
import { ChatInput } from "../components/ChatInput";
import { ChatMessages } from "../components/ChatMessages";
import { Hero } from "../components/Hero";
import { useAuthStore } from "../stores/auth";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { installAppAndSetupNotifications } from "../appPushConfig";
import { useChatStore } from "../stores/chat";
import { useUserDataStore } from "../stores/userData";
import styled from "styled-components";
import { TransactionCard } from "../components/TransactionCard";

const TabsContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: var(--dark);

  .tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .tab * {
    color: var(--light);
    font-size: 1.5rem;
  }
`;

export function Dashboard() {
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const userDataStore = useUserDataStore();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"dashboard" | "transactions" | "settings">(
    "dashboard"
  );

  // settings
  const [localBudget, setLocalBudget] = useState(0);
  const [localResponseStyle, setLocalResponseStyle] = useState("");
  const [localGoals, setLocalGoals] = useState("");

  const refreshContent = (budget: number | null = null) => {
    if (authStore.user == null) return;

    installAppAndSetupNotifications(authStore.user.email);
    userDataStore.fetchStartupData(
      authStore.user.email,
      budget ?? authStore.user.monthly_budget
    );
    userDataStore.fetchTransactions(authStore.user.email);
  };

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      navigate({ to: "/auth" });
    } else if (!authStore.user.onboarded) {
      navigate({ to: "/onboarding" });
    } else {
      refreshContent();
    }
  }, []);

  useEffect(() => {
    if (authStore.isLoggedIn) {
      setLocalBudget(authStore.user.monthly_budget);
      setLocalResponseStyle(authStore.user.response_style);
      setLocalGoals(authStore.user.goals);
    }
  }, [authStore.user]);

  const handleSubmitSettings = async () => {
    if (!authStore.isLoggedIn) return;
    await authStore.submitOnboarding(
      authStore.user.pet_choice,
      localGoals,
      localResponseStyle,
      localBudget
    );
    setTab("dashboard");
    userDataStore.clearAllData();
    refreshContent(localBudget);
  };

  const pageContent = useMemo(() => {
    if (tab === "dashboard") {
      return (
        <>
          <Hero />
          <div
            className="box"
            style={{
              flex: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              className={classNames(chatStore.messages.length > 0 && "box")}
              style={{ overflowY: "auto" }}
            >
              <div style={{ textAlign: "center", fontSize: "1.25rem" }}>
                {userDataStore.startupData?.startup_msg ?? "Loading..."}
              </div>
              <ChatMessages />
            </div>
            <div style={{ flex: "auto" }}></div>
            <ChatInput />
          </div>
        </>
      );
    } else if (tab === "transactions") {
      return (
        <div
          style={{
            flex: "auto",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
          }}
        >
          {userDataStore.transactions.map((t) => (
            <TransactionCard transaction={t} key={t._id} />
          ))}
        </div>
      );
    } else {
      return (
        <div
          style={{
            flex: "auto",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "10px",
            padding: "10px",
          }}
        >
          <div>
            <h1 className="logo">Settings</h1>
            <p>
              Personalize your BudgetBuddy experience here!
              <br />
              (Scroll to the bottom to save changes.)
            </p>
          </div>
          <hr />
          <div className="input-group">
            <b>Monthly Budget</b>
            <input
              type="number"
              value={localBudget}
              onChange={(e) => setLocalBudget(parseFloat(e.target.value))}
            />
          </div>
          <div className="input-group">
            <b>Your Financial Goals</b>
            <textarea
              value={localGoals}
              onChange={(e) => setLocalGoals(e.target.value)}
              style={{ resize: "none" }}
              rows={8}
            ></textarea>
          </div>
          <div className="input-group">
            <b>Buddy Response Style</b>
            <textarea
              value={localResponseStyle}
              onChange={(e) => setLocalResponseStyle(e.target.value)}
              style={{ resize: "none" }}
              rows={8}
            ></textarea>
          </div>

          <hr />
          <button onClick={handleSubmitSettings} className="submit-btn">
            Update settings!
          </button>
        </div>
      );
    }
  }, [
    chatStore.messages.length,
    userDataStore.startupData,
    userDataStore.transactions,
    tab,
    localBudget,
    localGoals,
    localResponseStyle,
  ]);

  if (!authStore.isLoggedIn) return null;

  return (
    <>
      {pageContent}
      <TabsContainer>
        <button className="tab" onClick={() => setTab("dashboard")}>
          <span className="material-symbols-rounded">home</span>
        </button>
        <button className="tab" onClick={() => setTab("transactions")}>
          <span className="material-symbols-rounded">payments</span>
        </button>
        <button className="tab" onClick={() => setTab("settings")}>
          <span className="material-symbols-rounded">settings_heart</span>
        </button>
      </TabsContainer>
    </>
  );
}
