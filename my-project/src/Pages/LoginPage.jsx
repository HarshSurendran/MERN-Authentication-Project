import React from 'react'
import WelcomeBrand from '../components/WelcomeBrand'
import LoginForm from '../components/LoginForm'


const LoginPage = () => {
  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url(https://images.pexels.com/photos/6991347/pexels-photo-6991347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}>
      <WelcomeBrand />
      <LoginForm />
    </div>
  )
}

export default LoginPage
