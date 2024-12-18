import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import LoginScreen from "../pages/LoginScreen";

function Navbar() {
    return (
        <div className="navigation-menu">
            <ol>
                <li><Link to={LoginScreen}>Login</Link></li>
            </ol>
        </div>
    )
}
export default Navbar;