import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setUsername, setEmail, setPassword, registerUser } from '../../redux/slices/registrationSlice';

export default function RegistrationForm({ onSwitch, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const { username, email, password, loading, error } = useSelector((state) => state.registration);

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "At least 8 characters required";
    if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter";
    if (!/[0-9]/.test(password)) return "Must contain a number";
    if (!/[!@#$%^&*]/.test(password)) return "Must contain a special symbol (!@#$%^&*)";
    return "";
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'username') dispatch(setUsername(value));
    if (field === 'email') dispatch(setEmail(value));
    if (field === 'password') {
      dispatch(setPassword(value));
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
  
    dispatch(registerUser({ username, email, password })).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        localStorage.setItem('token', result.payload.token);
        onSuccess(); 
      }
    });
  };



  

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="loginForm bg-white w-full h-fit mt-[20px] shadow-2xl rounded-[20px] p-[25px] text-[var(--custom-black)]
    lg:w-[500px] lg:min-h-[540px] lg:h-fit lg:m-0 lg:p-[50px]
    ">
      <h1 className="text-2xl font-bold lg:text-3xl">Sign up</h1>
      <p className="mt-[15px] text-sm font-light mb-[20px] lg:text-base lg:mb-[30px]">
        Don’t have an account yet? Let’s get you into <span className="text-[var(--custom-purple)] font-medium">My View</span>. 
        You’re now going to open so many opportunities!
      </p>

      <TextField 
        label="Your name" 
        variant="outlined" 
        className="w-full" 
        value={username}
        onChange={handleChange('username')}
      />
      <TextField 
        label="Your email" 
        variant="outlined" 
        className="w-full" 
        style={{ marginTop: "15px" }}
        value={email}
        onChange={handleChange('email')}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        className="w-full"
        style={{ marginTop: "15px" }}
        value={password}
        onChange={handleChange('password')}
        error={passwordError !== ""}
        helperText={passwordError} 
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

      {error && <p className="text-red-500 mt-[10px]">{error}</p>}

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
          marginTop: "30px",
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
        onClick={handleSubmit}
        disabled={loading}
      >
        <PersonAddAltIcon />
        <span>{loading ? "Signing up..." : "Sign up"}</span>
      </Button>

      <p className="text-sm font-normal mt-[20px] cursor-pointer lg:mt-[40px] lg:text-base">
        Already have an account? <span className="text-[var(--custom-purple)]" onClick={onSwitch}>Log in</span>
      </p>
    </div>
  );
}
