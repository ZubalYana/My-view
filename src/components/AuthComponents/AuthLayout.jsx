import React, { useState } from 'react'
import { motion } from "framer-motion";
import WhiteLogo from '../WhiteLogo/WhiteLogo'
import CircledBackground from '../CircledBackground/CircledBackground'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <div className='w-full h-screen relative overflow-hidden'>
        <div className='w-full h-screen absolute z-50 px-[60px] py-[40px]'>
          <WhiteLogo />
          <div className='w-full flex justify-end'>
          <motion.div
        key={isLogin ? "login" : "register"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex justify-end"
      >
        {isLogin ? (
          <LoginForm onSwitch={handleSwitch} />
        ) : (
          <RegistrationForm onSwitch={handleSwitch} />
        )}
      </motion.div>
          </div>
        </div>
        <CircledBackground />
    </div>
  )
}
