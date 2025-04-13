import { useNavigate } from "@tanstack/react-router";
import { ChatInput } from "../components/ChatInput";
import { ChatMessages } from "../components/ChatMessages";
import { Hero } from "../components/Hero";
import { useAuthStore } from "../stores/auth";
import classNames from "classnames";
import { useEffect } from "react";
import { installAppAndSetupNotifications } from "../appPushConfig";
import { useChatStore } from "../stores/chat";
import { Tabs } from "../components/Tabs";
import { useUserDataStore } from "../stores/userData";

export function Dashboard() {
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const userDataStore = useUserDataStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      navigate({ to: "/auth" });
    } else if (!authStore.user.onboarded) {
      navigate({ to: "/onboarding" });
    } else if (authStore.isLoggedIn) {
      installAppAndSetupNotifications(authStore.user.name);
      userDataStore.fetchStartupData(authStore.user.email, authStore.user.monthly_budget);
    }
  }, []);

  if (!authStore.isLoggedIn) return null;

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
      <Tabs />
    </>
  );
}
