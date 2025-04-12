import { ChatInput } from "../components/ChatInput";
import { ChatMessages } from "../components/ChatMessages";
import { Hero } from "../components/Hero";

export function Dashboard() {
  return (
    <>
      <Hero />
      <div
        className="box"
        style={{ flex: "auto", display: "flex", flexDirection: "column" }}
      >
        <div style={{ textAlign: "center", fontSize: "1.25rem" }}>
          Marvin! You're doing great!
        </div>
        <ChatMessages />
        <div style={{ flex: "auto" }}></div>
        <ChatInput />
      </div>
    </>
  );
}
