import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
export default () => {
  const [form,setForm]=useState({email:'',password:''});
  const dispatch=useDispatch();
  return (
    <form onSubmit={e=>{e.preventDefault();dispatch(login(form));}}>
      <input type="email" onChange={e=>setForm({...form,email:e.target.value})} />
      <input type="password" onChange={e=>setForm({...form,password:e.target.value})} />
      <button>Login</button>
    </form>
  );
};