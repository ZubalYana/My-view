import React from 'react'
import WhiteLogo from '../WhiteLogo/WhiteLogo'
import CircledBackground from '../CircledBackground/CircledBackground'
import LoginForm from './LoginForm'
export default function AuthLayout() {
  return (
    <div className='w-full h-screen relative overflow-hidden'>
        <div className='w-full h-screen absolute z-50 px-[60px] py-[40px]'>
          <WhiteLogo />
          <div className='w-full flex justify-end'>
          <LoginForm />
          </div>
        </div>
        <CircledBackground />
    </div>
  )
}
