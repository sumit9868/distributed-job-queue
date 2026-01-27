import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const register = async () => {
    try {
      const res = await axios.post("http://localhost:8080/auth/register", {
        username,
        email,
        password,
      });
      console.log("Registration successful! Please log in.",res);
      window.location.href = "/login";
    } catch (err) {
      setError("Registration failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default RegisterPage;