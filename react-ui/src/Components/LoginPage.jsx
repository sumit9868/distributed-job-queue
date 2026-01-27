import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // track error messages
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/auth/login",
                { username, password },
                { withCredentials: true }
            );

            console.log("Login successful!", res.data);
            setError(""); // clear any previous error
            onLogin();    // flip login state in App.js
            navigate("/dashboard"); // redirect to dashboard
        } catch (err) {
            // capture error message and show on screen
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* show error inline */}
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={login}>Login</button>
        </div>

    );
}

export default LoginPage;
