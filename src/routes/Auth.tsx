import classNames from "classnames";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "../store";
import { useNavigate } from "@tanstack/react-router";

const AuthContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  height: 500px;
  gap: 20px;

  .title {
    font-weight: normal;
    text-align: center;
  }

  .selection-group {
    display: flex;
    gap: 10px;
  }

  .selection-group button {
    flex: auto;
    justify-content: center;
  }

  .selection-group button.selected {
    background-color: var(--african-violet);
  }

  .input-group {
    display: flex;
    flex-direction: column;
  }

  .submit-btn {
    color: var(--dark);
    justify-content: center;
    background-color: var(--emerald);
  }
`;

export function Auth() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    const isLoginFieldsValid = email !== "" && password !== "";
    const isSignupFieldsValid = isLoginFieldsValid && name !== "";

    // valid
    if (
      (isLogin && !isLoginFieldsValid) ||
      (!isLogin && !isSignupFieldsValid)
    ) {
      return alert("Ensure all fields are filled out!");
    }

    let success = false;

    if (isLogin) {
      success = await authStore.login(email, password);
    } else {
      success = await authStore.signup(name, email, password);
    }

    if (success) {
      navigate({ to: "/dashboard" });
    } else {
      return alert(isLogin ? "Login failed. :(" : "Signup failed. :(");
    }
  }, [email, password, name]);

  return (
    <>
      <AuthContainer className="box lifted">
        <h1 className="title logo">
          {isLogin ? "Login to continue!" : "Signup to continue!"}
        </h1>
        <hr />
        <div className="selection-group">
          <button
            onClick={() => setIsLogin(true)}
            className={classNames("logo", isLogin && "selected")}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={classNames("logo", !isLogin && "selected")}
          >
            Signup
          </button>
        </div>
        {!isLogin && (
          <div className="input-group">
            <b>Your Name</b>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
            />
          </div>
        )}

        <div className="input-group">
          <b>Your Email</b>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="input-group">
          <b>Password</b>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Shhhh..."
          />
        </div>

        <div style={{ flex: "auto" }}></div>
        <hr />

        <button onClick={handleSubmit} className="submit-btn logo">
          Let's go!
        </button>
      </AuthContainer>
    </>
  );
}
