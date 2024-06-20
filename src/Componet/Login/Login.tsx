import { useState } from "react";
import "./login.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 style={{ fontFamily: "cursive" }}>Login here</h2>
        <input
          className="text-form"
          type="text"
          id="name"
          placeholder="Enter Email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-form"
          type="password"
          id="pass"
          placeholder="Enter password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="login-button" type="submit" value="Login" />
        <hr />
      </form>
    </div>
  );
}

export default LoginForm;
