import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";

import LoginIcon from '@mui/icons-material/Login';
export default function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="loginForm bg-white w-[500px] h-[540px] shadow-2xl rounded-[20px] p-[50px] text-[var(--custom-black)]">
      <h1 className="text-3xl font-bold">Log in</h1>
      <p className="mt-[15px] text-base font-light mb-[30px]">
        Welcome back, we’ve been waiting for you! Log into your
        <span className="text-[var(--custom-purple)] font-medium"> My View </span>
        account to continue setting and achieving.
      </p>
      <TextField id="outlined-basic" label="Your email" variant="outlined" className="w-full" />
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
>
  <LoginIcon />
  <span>Log in</span>

      </Button>

      <p className="text-base font-normal mt-[40px] cursor-pointer">
        New User?{" "}
        <span className="text-[var(--custom-purple)]" onClick={onSwitch}>
          Sign up
        </span>
      </p>
    </div>
  );
}
