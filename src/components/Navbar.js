import React, { useState } from "react";
import './Navbar.css';
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HomeFilled } from '@ant-design/icons';




function Navbar({ onLogout }) {

    const navigate = useNavigate();
    const logout = (e) => {
        if (e.key === "logout") {
            console.log("Logging out")
            onLogout();
            navigate('/login');
        }
    };

    const items = [
        {
            key: 'home',
            icon: <HomeFilled />,
            label: (
                <Link Link to={"/"}>
                    Home
                </Link>
            ),
        },
        {
            key: 'Profile',
            label: (
                <Link Link to={"/profile-page"}>
                    Profile
                </Link>
            ),
        },
        {
            key: 'Finance',
            label: (
                <Link Link to={"/FinanceScreen"}>
                    Finance Table
                </Link>
            )
        },
        {
            key: 'logout',
            label: (
                <Link Link to="/login">
                    Sign out
                </Link>
            ),
        },
    ];


    return (
        <Menu mode="horizontal" items={items} onClick={logout} />
    );
}

export default Navbar;