import React, { useState, useRef } from "react";
import axios from "../axios/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {
    const [form, setForm] = useState({
        Username: "",
        Email: "",
        Password: "",
        Role: "User"
    });

    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const fileRef = useRef();
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!form.Username || !form.Email || !form.Password) {
            alert("Please fill all fields");
            return;
        }

        const data = new FormData();
        data.append("Username", form.Username);
        data.append("Email", form.Email);
        data.append("Password", form.Password);
        data.append("Role", form.Role);

        if (photo) {
            data.append("photo", photo);
        }

        try {
            const res = await axios.post("/auth/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert(res.data.message);

            // ✅ AUTO LOGIN
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // ✅ redirect
            if (res.data.user.role === "Admin") {
                navigate("/manageproducts");
            } else {
                navigate("/products");
            }

        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">

                <h2 className="auth-title">Create Account</h2>

                {/* PROFILE */}
                <div className="profile-wrapper">
                    <div
                        className="profile-circle"
                        onClick={() => fileRef.current.click()}
                    >
                        {preview ? <img src={preview} alt="" /> : <span>+</span>}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        hidden
                        onChange={handleImage}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="auth-input"
                        placeholder="Username"
                        value={form.Username}
                        onChange={e => setForm({ ...form, Username: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="auth-input"
                        placeholder="Email"
                        value={form.Email}
                        onChange={e => setForm({ ...form, Email: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={form.Password}
                        onChange={e => setForm({ ...form, Password: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <select
                        className="auth-input"
                        value={form.Role}
                        onChange={e => setForm({ ...form, Role: e.target.value })}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <button className="auth-button" onClick={handleRegister}>
                    Register
                </button>

                <p>
                    Already have account? <Link to="/">Login</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;