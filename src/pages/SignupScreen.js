import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Alert, Layout, } from 'antd';
import { FormGroup, Toast, } from "reactstrap";
import axios from 'axios'
import { storeUser } from '../helpers';

function Register() {
    const initialUser = { identifier: "", password: "" };
    const navigate = useNavigate();
    const [user, setUser] = useState(initialUser)

    const signup = async () => {
        try {
            const url = "http://localhost:1337/api/auth/local/register";
            if (user.username && user.email && user.password) {
                const data = await axios.post(url, user);
                if (data.jwt) {
                    storeUser(data)
                    Toast.success('Logged in successfully!!', {
                        hideProgressBar: true
                    });
                    setUser(initialUser);
                    navigate("/")
                }
                console.log(data);
            }
        } catch (error) {
            console.log({ error })
            Toast.error(error.message, {
                hideProgressBar: true,
            });
        }
    };
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
                    type='text'
                    name='identifier'
                    value={user.identifier}
                    onChange={handleUserChange}
                    placeholder='Enter your username'
                />
            </FormGroup>

            <FormGroup>
                <Input
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={handleUserChange}
                    placeholder='Enter your email'
                />
            </FormGroup>

            <FormGroup>
                <Input
                    type='text'
                    name='password'
                    value={user.password}
                    onChange={handleUserChange}
                    placeholder='Enter your password'
                />
            </FormGroup>
            <Button
                type='primary'
                onClick={signup}>Sign up</Button>
        </Layout>
    )
}
export default Register;