import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";


function NotFound() {
    return (
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Page Not Found 😢</h2>
            <p>The page you are looking for does not exist.</p>

            <Link to="/" className="home-btn">
                Go to Login
            </Link>
        </div>
    );
}

export default NotFound;