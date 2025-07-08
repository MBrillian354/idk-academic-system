import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';
export const login = createAsyncThunk('auth/login', async creds => {
  const res = await API.post('/auth/login', creds);
  return res.data;
});
const authSlice = createSlice({
  name: 'auth', initialState: { token: null, role: null, status: null },
  reducers: { logout: state => { state.token = null; state.role = null; localStorage.clear(); }},
  extraReducers: builder => builder
    .addCase(login.fulfilled, (state,{payload})=>{
      state.token=payload.token; state.role=payload.role;
      localStorage.setItem('token',payload.token);
    })
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;