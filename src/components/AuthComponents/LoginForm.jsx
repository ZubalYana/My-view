import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <div className="loginForm bg-white w-[500px] h-[550px] shadow-2xl rounded-[20px] p-[50px] text-([var(--custom-black)])">
    <h1 className='text-3xl font-bold'>Log in</h1>
    <p className='mt-[15px] text-base font-light mb-[20px]'>Welcome back, we’ve been waiting for you! Log into your <span className='text-[var(--custom-purple)] font-medium'>My View</span> account to continue setting and achieving.</p>
    <TextField 
      id="outlined-basic" 
      label="Your email" 
      variant="outlined" 
      className='w-full' 
    />
    <TextField
id="password"
label="Password"
type={showPassword ? "text" : "password"}
variant="outlined"
className='w-full mt-[20px]'
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

<p className='text-sm font-normal'>Forgot password?</p>


</div>
  )
}
