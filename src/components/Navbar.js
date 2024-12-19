import React from "react";
import './Navbar.css';
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeFilled } from '@ant-design/icons';

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
        key: 'Sign Out',
        label: (
            <Link Link to={"/login"}>
                Sign out
            </Link>
        ),
    },
];

function Navbar() {
    return (
        <Menu mode="horizontal" items={items} />
    );
}

export default Navbar;