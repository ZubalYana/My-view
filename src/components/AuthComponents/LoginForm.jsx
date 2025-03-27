import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    setError(''); 
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="loginForm bg-white w-full h-fit mt-[20px] shadow-2xl rounded-[20px] p-[25px] text-[var(--custom-black)]
    lg:w-[500px] lg:h-[540px] lg:m-0 lg:p-[50px]
    ">
      <h1 className="text-2xl font-bold lg:text-3xl">Log in</h1>
      <p className="mt-[15px] text-sm font-light mb-[20px] lg:text-base lg:mb-[30px]">
        Welcome back, we’ve been waiting for you! Log into your
        <span className="text-[var(--custom-purple)] font-medium"> My View </span>
        account to continue setting and achieving.
      </p>
      <TextField 
        id="outlined-basic" 
        label="Your email" 
        variant="outlined" 
        className="w-full" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <TextField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        className="w-full"
        style={{ marginTop: "20px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="text-sm font-normal w-full flex justify-end mt-[10px] cursor-pointer mb-[30px]">Forgot password?</p>
      <Button
  variant="contained"
  fullWidth
  sx={{
    backgroundColor: "var(--custom-purple)",
    color: "var(--custom-white)",
    fontSize: "18px",
    fontWeight: 500,
    textTransform: "uppercase",
    height: "50px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    },
  }}
  onClick={handleLogin}
>
  <LoginIcon />
  <span>Log in</span>

      </Button>

      <p className="text-sm font-normal mt-[20px] cursor-pointer lg:mt-[40px] lg:text-base">
        New User?{" "}
        <span className="text-[var(--custom-purple)]" onClick={onSwitch}>
          Sign up
        </span>
      </p>
    </div>
  );
}
