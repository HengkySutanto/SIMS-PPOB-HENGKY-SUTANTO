import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: !!Cookies.get('token'),
  user: null,
  token: Cookies.get('token') || null,
  balance: 0,
  profile_image: ''
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
      state.balance = 0;
      // Remove token from cookie
      Cookies.remove('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profile_image = action.payload;
    },
  },
});

export const { login, logout, setUser, setBalance, setProfileImage } = authSlice.actions;
export default authSlice.reducer; 