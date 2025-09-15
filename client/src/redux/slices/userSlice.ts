import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ---- Decode JWT safely ----
const decodeToken = <T = unknown>(token: string): T | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload) as T;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

// ---- Types ----
export interface DecodedUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  exp?: number; // expiration timestamp
  iat?: number; // issued at timestamp
}

export interface UserState {
  token: string | null;
  user: DecodedUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  token: null,
  user: null,
  status: 'idle',
};

interface AuthResponse {
  token: string;
}

// ---- Async thunks ----
export const loginUser = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  'user/loginUser',
  async (credentials) => {
    const response = await axios.post<AuthResponse>('http://localhost:5000/users/login', credentials);
    return response.data;
  }
);

export const registerUser = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string }
>('user/registerUser', async (credentials) => {
  const response = await axios.post<AuthResponse>('http://localhost:5000/users/register', credentials);
  return response.data;
});

// ---- Slice ----
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = decodeToken<DecodedUser>(action.payload.token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = decodeToken<DecodedUser>(action.payload.token);
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// ---- Actions ----
export const { logout } = userSlice.actions;

// ---- Selectors ----
export const selectCurrentUser = (state: { user: UserState }) => state.user.user;
export const selectAuthToken = (state: { user: UserState }) => state.user.token;
export const selectAuthStatus = (state: { user: UserState }) => state.user.status;

export default userSlice.reducer;
