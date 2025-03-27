import React, { useState } from 'react'
import { motion } from "framer-motion";
import WhiteLogo from '../WhiteLogo/WhiteLogo'
import CircledBackground from '../CircledBackground/CircledBackground'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  const handleRegistrationSuccess = () => {
    setSuccessMessage("Registration successful! You can now log in.");
    setIsLogin(true); 
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
              <RegistrationForm onSwitch={handleSwitch} onSuccess={handleRegistrationSuccess} />
            )}
          </motion.div>
        </div>
      </div>
      <CircledBackground />

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
