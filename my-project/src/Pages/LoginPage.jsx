import React from 'react'
import WelcomeBrand from '../components/WelcomeBrand'
import LoginForm from '../components/LoginForm'
import Header from '../components/Header'


const LoginPage = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden " >
      <video autoPlay loop muted className="min-w-full min-h-full object-cover absolute -z-10 ">
        <source src="../../public/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Header />
      <WelcomeBrand />
      <LoginForm />
    </div>
  )
}

export default LoginPage
