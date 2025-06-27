import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return { token: data.token, userId: data.userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  username: '',
  email: '',
  password: '',
  token: localStorage.getItem('token') || null,
  userId: null,
  loading: false,
  error: null,
  success: false
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUsername: (state, action) => { state.username = action.payload; },
    setEmail: (state, action) => { state.email = action.payload; },
    setPassword: (state, action) => { state.password = action.payload; },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setUsername, setEmail, setPassword } = registrationSlice.actions;
export default registrationSlice.reducer;
