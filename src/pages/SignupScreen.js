import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Alert, Layout, } from 'antd';
import { FormGroup, } from "reactstrap";
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({ email: "", password: "", username: "" });
    const signup = () => { };
    const handleUserChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    };
    return (
        <Layout>
            <h1>
                Sign-up
            </h1>
            <FormGroup>
                <Input
                    type='email'
                    name='username'
                    value={user.identifier}
                    onChange={handleUserChange}
                    placeholder='Enter your username'
                />
            </FormGroup>

            <FormGroup>
                <Input
                    type='email'
                    name='identifier'
                    value={user.identifier}
                    onChange={handleUserChange}
                    placeholder='Enter your email'
                />
            </FormGroup>
        </Layout>
    )
}
export default Register;