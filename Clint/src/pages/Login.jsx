import React, { useState } from "react";
import axios from "../axios/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!Username || !Password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post("/auth/login", {
                Username,
                Password
            });

            // ✅ store token
            localStorage.setItem("token", res.data.token);

            // ✅ store full user data (role + photo + email etc.)
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // ✅ role based redirect
            if (res.data.user.role === "Admin") {
                navigate("/manageproducts");
            } else {
                navigate("/products");
            }

        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">

                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to your account</p>

                <div className="input-group">
                    <input
                        className="auth-input"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button className="auth-button" onClick={handleLogin}>
                    Login
                </button>

                <p className="auth-footer">
                    Don’t have an account?{" "}
                    <Link className="auth-link" to="/register">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;