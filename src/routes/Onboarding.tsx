import { useAuthStore } from "../stores/auth";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SingleCardContainer } from "../components/SingleCardContainer";

export function Onboarding() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [onboardingPhase, setOnboardingPhase] = useState(0);

  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [goals, setGoals] = useState("");
  const [petChoice, setPetChoice] = useState(-1);
  const [responseStyle, setResponseStyle] = useState("");

  const phaseConditions = [
    true,
    goals !== "",
    petChoice > -1,
    responseStyle !== "",
  ];

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      navigate({ to: "/auth" });
    }
  }, []);

  if (!authStore.isLoggedIn) return null;

  const currentInputComponent = useMemo(() => {
    if (onboardingPhase === 0) {
      return (
        <>
          <div className="input-group">
            <h3>What's your monthly budget?</h3>
            <input
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(parseFloat(e.target.value))}
              type="number"
              placeholder="Ideally, what you're looking to meet."
            />
          </div>
          <div style={{ flex: "auto" }}></div>
        </>
      );
    } else if (onboardingPhase === 1) {
      return (
        <>
          <div
            className="input-group"
            style={{ flex: "auto", display: "flex", flexDirection: "column" }}
          >
            <h3>Any financial goals?</h3>
            <textarea
              style={{ flex: "auto", resize: "none" }}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Be as specific as you'd like; context only helps!"
            />
          </div>
        </>
      );
    } else if (onboardingPhase === 2) {
      const imgStyle = {
        border: "1px solid var(--dark)",
        transition: "border 0.25s, background 0.25s",
        cursor: "pointer",
      };

      const selectedImgStyle = {
        borderColor: "var(--emerald)",
        background: "rgba(0, 100, 50, 0.125)",
      };

      return (
        <>
          <div className="input-group">
            <h3>Now for the fun stuff! Pick your buddy below.</h3>
            <div
              style={{
                margin: "auto 0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <img
                style={{
                  ...imgStyle,
                  ...(petChoice === 0 && selectedImgStyle),
                }}
                src="/pets/pet0.webp"
                onClick={() => setPetChoice(0)}
              />
              <img
                style={{
                  ...imgStyle,
                  ...(petChoice === 1 && selectedImgStyle),
                }}
                src="/pets/pet1.webp"
                onClick={() => setPetChoice(1)}
              />
            </div>
          </div>
          <div style={{ flex: "auto" }}></div>
        </>
      );
    } else if (onboardingPhase === 3) {
      return (
        <>
          <div
            className="input-group"
            style={{ flex: "auto", display: "flex", flexDirection: "column" }}
          >
            <h3>How'd you like your buddy to communicate? (Response style)</h3>
            <textarea
              style={{ flex: "auto", resize: "none" }}
              value={responseStyle}
              onChange={(e) => setResponseStyle(e.target.value)}
              placeholder="Optimistic, motivating, sarcastic, whatever you'd prefer! You can change this later."
            />
          </div>
        </>
      );
    }
  }, [onboardingPhase, goals, monthlyBudget, petChoice, responseStyle]);

  const handleSubmit = async () => {
    const success = await authStore.submitOnboarding(
      petChoice,
      goals,
      responseStyle,
      monthlyBudget
    );
    if (!success) {
      alert("Whoops, onboarding failed!");
      authStore.logout();
      navigate({ to: "/auth" });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <SingleCardContainer className="box lifted">
      <h2 className="title logo">Let's get going, {authStore.user.name}.</h2>
      <hr />
      {currentInputComponent}
      <hr />
      {onboardingPhase < 3 ? (
        <button
          disabled={!phaseConditions[onboardingPhase]}
          onClick={() =>
            phaseConditions[onboardingPhase] &&
            setOnboardingPhase((op) => op + 1)
          }
          className="standard-btn logo"
        >
          Next
        </button>
      ) : (
        <button
          disabled={!phaseConditions[onboardingPhase]}
          onClick={phaseConditions[onboardingPhase] ? handleSubmit : undefined}
          className="submit-btn logo"
        >
          Done setting up!
        </button>
      )}
    </SingleCardContainer>
  );
}
