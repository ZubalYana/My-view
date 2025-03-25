import React from 'react'
import WhiteLogo from '../WhiteLogo/WhiteLogo'
import CircledBackground from '../CircledBackground/CircledBackground'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
export default function AuthLayout() {
  return (
    <div className='w-full h-screen relative overflow-hidden'>
        <div className='w-full h-screen absolute z-50 px-[60px] py-[40px]'>
          <WhiteLogo />
          <div className='w-full flex justify-end'>
          {/* <LoginForm /> */}
          <RegistrationForm />
          </div>
        </div>
        <CircledBackground />
    </div>
  )
}
