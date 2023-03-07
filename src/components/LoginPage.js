import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  function handleLogin() {
    if (username.length >= 4 && username.length <= 16) {
      localStorage.setItem("user", username);
      setUsernameError(false);
      onLogin();
      navigate("/booklist");
    } else {
      setUsernameError(true);
    }
  }

  return (
    <div className="login-container ">
      <img
        src="https://www.graphicsprings.com/filestorage/stencils/68ea7d075a2064907de0c873ea1d81f3.png?width=500&height=500"
        alt="Book"
      />
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && (
          <span style={{ color: "red" }}>
            Username must be between 4 and 16 characters.
          </span>
        )}
      </label>
      <button
        disabled={username.length < 4 || username.length > 16}
        onClick={handleLogin}
      >
        Sign-in
      </button>
    </div>
  );
}

export default LoginPage;
