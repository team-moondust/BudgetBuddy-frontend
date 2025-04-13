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
  }

  .tab .logo {
    font-size: 0.875rem;
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

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      navigate({ to: "/auth" });
    } else if (!authStore.user.onboarded) {
      navigate({ to: "/onboarding" });
    } else if (authStore.isLoggedIn) {
      installAppAndSetupNotifications(authStore.user.email);
      userDataStore.fetchStartupData(
        authStore.user.email,
        authStore.user.monthly_budget
      );
      userDataStore.fetchTransactions(authStore.user.email);
    }
  }, []);

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
    }
  }, [
    chatStore.messages.length,
    userDataStore.startupData,
    userDataStore.transactions,
    tab,
  ]);

  if (!authStore.isLoggedIn) return null;

  return (
    <>
      {pageContent}
      <TabsContainer>
        <button className="tab" onClick={() => setTab("dashboard")}>
          <span className="material-symbols-rounded">home</span>
          <span className="logo">Dashboard</span>
        </button>
        <button className="tab" onClick={() => setTab("transactions")}>
          <span className="material-symbols-rounded">payments</span>
          <span className="logo">Transactions</span>
        </button>
        <button className="tab" onClick={() => setTab("settings")}>
          <span className="material-symbols-rounded">settings_heart</span>
          <span className="logo">Settings</span>
        </button>
      </TabsContainer>
    </>
  );
}
