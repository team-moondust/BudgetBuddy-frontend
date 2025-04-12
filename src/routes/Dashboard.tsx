import { useNavigate } from "@tanstack/react-router";
import { ChatInput } from "../components/ChatInput";
import { ChatMessages } from "../components/ChatMessages";
import { Hero } from "../components/Hero";
import { useAuthStore, useChatStore } from "../store";
import classNames from "classnames";

export function Dashboard() {
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const navigate = useNavigate();

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
        <div className={classNames(chatStore.messages.length > 0 && "box lifted")} style={{ overflowY: "auto" }}>
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
