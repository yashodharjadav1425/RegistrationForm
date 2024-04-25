import React, { useState } from "react";
import axios from "axios";
import './login.css';
// import { Navigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    axios
      .post("http://localhost:3001/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);

        if(result.data === "success"){
          setSuccessMessage("Login successful!");
          setError("");
          window.location.assign("https://laxmichitfund.streamlit.app/")
        }
        if(result.data === "password is incorrect"){
          setError("Invalid password");
          setSuccessMessage("");
        }
        if(result.data === "No record existed"){
          setError("Invalid email");
          setSuccessMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid email");
        setSuccessMessage("");
      });
  };

  return (
    <div className="main">
      <div>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          
          <div className="input-block">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
