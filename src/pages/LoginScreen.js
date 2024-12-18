import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Alert } from 'antd';
import axios from 'axios'

const URL_AUTH = "/api/auth/local"


export default function LoginScreen(props) {

  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null)

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
    <div>
      <header>
        <Form
          onFinish={handleLogin}
          autoComplete="off">
          {errMsg &&
            <Form.Item>
              <Alert message={errMsg} type="error" />
            </Form.Item>
          }

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
          <div className='login-button'>
            <Link to={"/sign-up"}>
              Don't have an account? Sign up
            </Link>
          </div>
        </Form>
      </header>
    </div>
  )
}
