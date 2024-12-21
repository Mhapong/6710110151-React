import React from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Layout, } from 'antd';
import { Toast, } from "reactstrap";
import axios from 'axios'
import { storeUser } from '../helpers';
import { getOverflowOptions } from 'antd/es/_util/placements';

function Register(props) {
    const initialUser = { identifier: "", password: "" };
    const [errMsg, setErrMsg] = useState(null)
    const [user, setUser] = useState(initialUser)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const signup = async (formData) => {
        try {
            setIsLoading(true)
            const url = "http://localhost:1337/api/auth/local/register";
            if (formData) {
                const data = await axios.post(url, {
                    ...formData
                });
                console.log(data)
                if (data.jwt) {
                    storeUser(data)
                    Toast.success('Logged in successfully!!', {
                        hideProgressBar: true
                    });
                    setUser(initialUser);
                    props.SignupSuccess();
                }
                navigate('/login')
                console.log(data);
            }
        } catch (error) {
            console.log({ error })
            setErrMsg(error.message)
                ;
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Layout className='profileCardcontainer'>
            <h1>
                Sign-up
            </h1>
            <Form
                onFinish={signup}
                autoComplete="off"
                style={getOverflowOptions()}>

                <Form.Item
                    type='text'
                    label='Username'
                    name="username"
                    value={user.username}
                    rules={[{ required: true, }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    type='text'
                    label='Email'
                    name="email"
                    rules={[{ required: true, }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    type='text'
                    label='password'
                    name='password'
                    rules={[{ required: true, }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        shape='round'
                        size='large'>
                        Sign up
                    </Button>
                </Form.Item>
                <Link Link to={"/login"} >
                    Already have an account? Sign in
                </Link>
            </Form>

        </Layout>
    )
}
export default Register;