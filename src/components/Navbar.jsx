import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { IoIosLogOut } from 'react-icons/io';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="bg-white text-gray-800 p-4 border-b-2 border-gray-200">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
        <Link to="/" className="text-xl font-semibold flex items-center gap-x-3 text-nowrap">
          <img src="/logo.png" alt="SIMS PPOB" className='w-6 h-6 object-contain' />
          SIMS PPOB
        </Link>
        <div className="flex items-center space-x-8 font-semibold text-nowrap ml-auto">
          {isAuthenticated ? (
            <>
              <Link to="/top-up" className='hover:text-gray-500'>Top Up</Link>
              <Link to="/transaction" className='hover:text-gray-500'>Transaction</Link>
              <Link to="/account" className='hover:text-gray-500'>Akun</Link>
              <button onClick={() => dispatch(logout())} className='over:text-gray-500 cursor-pointer'>
                <IoIosLogOut />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className='hover:text-gray-500'>Login</Link>
              <Link to="/register" className='hover:text-gray-500'>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 