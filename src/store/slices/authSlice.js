import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: !!Cookies.get('token'),
  user: null,
  token: Cookies.get('token') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      // Set token in cookie (expires in 7 days)
      Cookies.set('token', action.payload.token, { expires: 7 });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      // Remove token from cookie
      Cookies.remove('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 