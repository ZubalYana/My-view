import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
export default function RegistrationForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="loginForm bg-white w-[500px] min-h-[540px] h-fit shadow-2xl rounded-[20px] p-[50px] text-[var(--custom-black)]">
      <h1 className="text-3xl font-bold">Sign up</h1>
      <p className="mt-[15px] text-base font-light mb-[20px]">
        Don’t have an account yet? Let’s get you into <span className="text-[var(--custom-purple)] font-medium"> My View </span>. You’re now going to open so many opportunities!
      </p>
      <TextField id="outlined-basic" label="Your name" variant="outlined" className="w-full" />
      <TextField id="outlined-basic" label="Your email" variant="outlined" className="w-full" style={{ marginTop: "15px" }} />
      <TextField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        className="w-full"
        style={{ marginTop: "15px" }}
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
  <PersonAddAltIcon />
  <span>Sign up</span>

      </Button>

      <p className="text-base font-normal mt-[30px] cursor-pointer">
        Already have an account?{" "}
        <span className="text-[var(--custom-purple)]" onClick={onSwitch}>
          Log in
        </span>
      </p>
    </div>
  );
}
