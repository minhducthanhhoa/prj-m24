import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Custom function to decode JWT
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
};

export interface UserState {
  token: string | null;
  user: any | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  token: null,
  user: null,
  status: 'idle',
};

interface AuthResponse {
  token: string;
}

export const loginUser:any = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  'user/loginUser',
  async (credentials) => {
    const response = await axios.post('http://localhost:5000/users/login', credentials);
    return response.data;
  }
);

export const registerUser:any = createAsyncThunk<AuthResponse, { name: string; email: string; password: string }>(
  'user/registerUser',
  async (credentials) => {
    const response = await axios.post('http://localhost:5000/users/register', credentials);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'idle';
        state.token = action.payload.token;
        // Decode the token using the custom function
        state.user = decodeToken(action.payload.token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'idle';
        state.token = action.payload.token;
        // Decode the token using the custom function
        state.user = decodeToken(action.payload.token);
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
