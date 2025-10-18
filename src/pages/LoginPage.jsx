import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Stores/AuthContext.jsx";
import { FAKE_USER } from "../utils/functions.js";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState(FAKE_USER.email);
  const [password, setPassword] = useState(FAKE_USER.password);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
    // console.log(email, password);
  } 
  //

  //
  return (
    <form className="login" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button link" onClick={() => navigate("/app")}>
        LogIn
      </button>
    </form>
  );
}
