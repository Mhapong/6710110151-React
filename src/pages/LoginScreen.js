import React from 'react';
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Button, Form, Input, Alert, Checkbox } from 'antd';
import axios from 'axios';
import { getOverflowOptions } from 'antd/es/_util/placements';


const URL_AUTH = "/api/auth/local"


export default function LoginScreen(props) {

  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true)
      setErrMsg(null)
      const response = await axios.post(URL_AUTH, { ...formData })
      const token = response.data.jwt
      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
      props.onLoginSuccess();
    } catch (err) {
      console.log(err)
      setErrMsg(err.message)
    } finally { setIsLoading(false) }
  }

  return (

    <div className='login-container'>
      <div className='login'>
        <header>

          <Form
            onFinish={handleLogin}
            autoComplete="off"
            style={getOverflowOptions()}>

            <Form.Item
              label="Username"
              name="identifier"
              rules={[{ required: true, }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true },]}>
              <Input.Password />
            </Form.Item>
            <div className='login-button'>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  shape='round'
                  size='large'>
                  Log in
                </Button>
              </Form.Item>
            </div>

            <Checkbox value={rememberMe} className='center-rememberme'>Remember me</Checkbox>

            <div className='signuplink'>
              <Link Link to={"/sign-up"} >
                Don't have an account? Sign up
              </Link>
            </div>

          </Form>
          <div className='errormsg'>
            {errMsg &&
              <Alert message={errMsg} type="error" />
            }
          </div>
        </header>
      </div>
    </div>
  )
}
