import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { FaRegUser } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 0) {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
          timer: 1500,
          showConfirmButton: false
        });
        navigate('/login');
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
      <div className="min-h-[calc(100vh-62px)] register-form p-4 flex flex-col items-center justify-center gap-y-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-x-3 mb-5">
            <img src="/logo.png" alt="SIMS PPOB logo" />
            <div className='text-lg font-semibold'>SIMS PPOB</div>
          </div>
          <div className="text-2xl font-semibold text-center">
            Lengkapi data untuk<br />membuat akun
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400">
              <FaRegUser />
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded"
              placeholder='nama depan'
              required
            />
          </div>

          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400">
              <FaRegUser />
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded"
              placeholder='nama belakang'
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
              placeholder='password'
              required
            />
            <div className="absolute right-3 top-[1.35rem] -translate-y-1/2 cursor-pointer text-gray-400" onClick={() => setSeePassword(prev => !prev)}>
              {seePassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400">
              <MdLockOutline />
            </label>
            <input
              type={seeConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded"
              placeholder='confirm password'
              required
            />
            <div className="absolute right-3 top-[1.35rem] -translate-y-1/2 cursor-pointer text-gray-400" onClick={() => setSeeConfirmPassword(prev => !prev)}>
              {seeConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-5"
          >
            Registrasi
          </button>
        </form>
        <div className="">
          sudah punya akun? login <a href='/login' className='text-red-500 font-bold'>di sini</a>
        </div>
      </div>
      <div className="hidden md:block w-full h-full">
        <img src={'/ilustrasi-login.png'} alt="Register" className='w-full h-[calc(100vh-62px)] object-cover object-right' />
      </div>
    </div>
  );
};

export default Register; 