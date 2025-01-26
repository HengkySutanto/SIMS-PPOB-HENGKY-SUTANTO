import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_BASE_URL } from '../config/api';
import { MdLockOutline } from 'react-icons/md';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { login } from '../store/slices/authSlice';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [seePassword, setSeePassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatch(login({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbmdreXN1dGFudG84MTFAZ21haWwuY29tIiwibWVtYmVyQ29kZSI6Ik02RDlLQjlUIiwiaWF0IjoxNzM3ODc5NjIzLCJleHAiOjE3Mzc5MjI4MjN9.3XA_KeitpDFv7n8g3pr6XaNwkGFYwSHhADOMt5se3cQ" }));
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.status === 0) {
        // Update redux state (which will also set the cookie)
        dispatch(login({ token: data.data.token }));
        
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
          timer: 1500,
          showConfirmButton: false
        });
        
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan pada server'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className="min-h-[calc(100vh-62px)] login-form p-4 flex flex-col items-center justify-center gap-y-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-x-3 mb-5">
            <img src="/logo-1.png" alt="SIMS PPOB logo" />
            <div className='text-lg font-semibold'>SIMS PPOB</div>
          </div>
          <div className="text-2xl font-semibold text-center">
            Masuk atau buat akun<br />untuk memulai
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg mx-auto">
          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400">@</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded"
              placeholder='masukan email anda'
              required
            />
          </div>

          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400">
              <MdLockOutline />
            </label>
            <input
              type={seePassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded"
              placeholder='masukan password anda'
              required
            />
            <div 
              className="absolute right-3 top-[1.35rem] -translate-y-1/2 cursor-pointer text-gray-400" 
              onClick={() => setSeePassword(prev => !prev)}
            >
              {seePassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-5"
          >
            Masuk
          </button>
        </form>
        <div className="">
          belum punya akun? registrasi <a href='/register' className='text-red-500 font-bold'>di sini</a>
        </div>
      </div>
      <div className="hidden md:block w-full h-full">
        <img src={'/ilustrasi-login.png'} alt="Login" className='w-full h-[calc(100vh-62px)] object-cover object-right' />
      </div>
    </div>
  );
};

export default Login; 