import { useNavigate } from "@tanstack/react-router";
import { ChatInput } from "../components/ChatInput";
import { ChatMessages } from "../components/ChatMessages";
import { Hero } from "../components/Hero";
import { useAuthStore } from "../stores/auth";
import classNames from "classnames";
import { useEffect } from "react";
import { installAppAndSetupNotifications } from "../appPushConfig";
import { useChatStore } from "../stores/chat";

export function Dashboard() {
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isLoggedIn) {
      installAppAndSetupNotifications(authStore.name);
    }
  }, []);

  if (!authStore.isLoggedIn) {
    return navigate({ to: "/auth" });
  }

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
          className={classNames(chatStore.messages.length > 0 && "box lifted")}
          style={{ overflowY: "auto" }}
        >
          <div style={{ textAlign: "center", fontSize: "1.25rem" }}>
            {authStore.name}! You're doing great!
          </div>
          <ChatMessages />
        </div>
        <div style={{ flex: "auto" }}></div>
        <ChatInput />
      </div>
    </>
  );
}
