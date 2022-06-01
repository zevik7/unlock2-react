import React, { useState } from 'react'
import moment from 'moment'
import { Form, Button, Modal } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { CopyrightFooter, Input, Radio, DatePicker } from '../../components'
import { userValidate } from '../../utils/Validators'
import { useLoading, useAuth } from '../../context'
import { login as loginApi } from '../../api'

const { Content } = Layout

const Loggin = () => {
  const { isLoading, setLoading, unSetLoading } = useLoading()
  const { user, login, logout } = useAuth()

  const [form, setForm] = useState({
    email: { value: '', errorTxt: '' },
    password: { value: '', errorTxt: '' },
  })

  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    let errorTxt = userValidate(name, value)

    setForm({ ...form, [name]: { value, errorTxt } })
  }

  const onSubmit = async () => {
    let formValidation = {}
    let isError = false

    // Validate all form's field
    for (let name in form) {
      let value = form[name].value
      let errorTxt = userValidate(name, value)

      if (errorTxt) isError = true

      formValidation[name] = { value, errorTxt }
    }

    if (isError) {
      setForm(formValidation)
    } else {
      const userData = getUserData()
      setLoading()
      loginApi(userData).then((rs) => {
        console.log(rs)
        unSetLoading()
        login(rs)
      })
    }
  }

  const getUserData = () => {
    let result = {}
    for (let name in form) {
      let value = form[name].value
      result[name] = value
    }

    return result
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  }

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
    },
  }

  return (
    <Layout style={{ minHeight: '100vh' }} className="register">
      <Content className="content">
        <Form
          {...formItemLayout}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          scrollToFirstError
          size="large"
        >
          <h1>Welcome</h1>
          <Input
            label="Email"
            validateStatus={form.email.errorTxt && 'error'}
            help={form.email.errorTxt}
            placeholder="Enter your email"
            autoComplete="on"
            name="email"
            value={form.email.value}
            onChange={handleOnChange}
            disabled={isLoading}
          />
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            label="Password"
            validateStatus={form.password.errorTxt && 'error'}
            help={form.password.errorTxt}
            placeholder="Enter your password"
            autoComplete="on"
            name="password"
            value={form.password.value}
            onChange={handleOnChange}
            type="password"
            disabled={isLoading}
          />
          <Form.Item {...tailFormItemLayout} className="login-form-submit">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={onSubmit}
              loading={isLoading}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <CopyrightFooter />
    </Layout>
  )
}

export default Loggin
