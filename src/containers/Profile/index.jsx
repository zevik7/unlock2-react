import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'

const Setting = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div
      style={{
        padding: '40px',
        fontSize: '40px',
      }}
    >
      <h1>This is profile page</h1>
      <Button
        type="primary"
        htmlType="submit"
        className="auth-form-button"
        onClick={() => navigate('/dashboard')}
      >
        Dashboard
      </Button>
      <Button
        type="secondary"
        htmlType="submit"
        className="auth-form-button"
        onClick={() => navigate('/')}
      >
        Home
      </Button>
      <Button
        type="secondary"
        htmlType="submit"
        className="auth-form-button"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  )
}

export default Setting
