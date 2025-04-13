import classNames from "classnames";
import { useCallback, useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useNavigate } from "@tanstack/react-router";
import { SingleCardContainer } from "../components/SingleCardContainer";

export function Auth() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nessieId, setNessieId] = useState("");

  const handleSubmit = useCallback(async () => {
    const isLoginFieldsValid = email !== "" && password !== "";
    const isSignupFieldsValid =
      isLoginFieldsValid && name !== "" && nessieId !== "";

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
      success = await authStore.signup(name, email, password, nessieId);
    }

    if (success) {
      navigate({ to: "/dashboard" });
    } else {
      return alert(isLogin ? "Login failed. :(" : "Signup failed. :(");
    }
  }, [email, password, name, nessieId]);

  return (
    <SingleCardContainer className="box lifted">
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
          <b>First Name</b>
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

      {!isLogin && (
        <div className="input-group">
          <b>Nessie Customer ID</b>
          <input
            value={nessieId}
            onChange={(e) => setNessieId(e.target.value)}
            type="text"
            placeholder="absdfjge3ur48hrer39456tij"
          />
        </div>
      )}

      <div style={{ flex: "auto" }}></div>
      <hr />

      <button onClick={handleSubmit} className="submit-btn logo">
        Let's go!
      </button>
    </SingleCardContainer>
  );
}
