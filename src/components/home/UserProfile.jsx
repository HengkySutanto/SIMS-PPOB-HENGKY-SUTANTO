import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dots from '../generals/Dots'
import { IoEyeOutline } from 'react-icons/io5';
import { API_BASE_URL } from '../../config/api';
import { setUser, setBalance } from '../../store/slices/authSlice';

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.auth.balance);
  const [seeBalance, setSeeBalance] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profileResponse, balanceResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          }),
          fetch(`${API_BASE_URL}/balance`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
        ]);

        const [profileData, balanceData] = await Promise.all([
          profileResponse.json(),
          balanceResponse.json()
        ]);

        if (profileData.status === 0) {
          dispatch(setUser(profileData.data));
        } else {
          console.error('Failed to fetch profile:', profileData.message);
        }

        if (balanceData.status === 0) {
          dispatch(setBalance(balanceData.data.balance));
        } else {
          console.error('Failed to fetch balance:', balanceData.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [dispatch, token]);

  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="user-profile px-5 md:px-0">
        <img src={user?.profile_image || "/profile-photo.png"} alt={user?.first_name} className='w-16 h-16 border border-gray-200 rounded-full overflow-hidden mb-3' />
        <div className="text-md">Selamat datang,</div>
        <div className="text-lg xl:text-2xl font-bold">{`${user?.first_name ?? 'User'} ${user?.last_name ?? 'Name'}`}</div>
      </div>

      <div className="balance flex flex-col justify-center space-y-3 text-white bg-red-500 p-5 rounded-xl" style={{ 
        backgroundImage: 'url(/background-saldo.png)',
        backgroundSize: 'cover',
       }}>
        <div className="text-sm">
          Saldo anda
        </div>
        <div className="saldo flex items-center gap-x-1 text-2xl md:text-3xl font-semibold">
          Rp. <div className="account-amount">{seeBalance ? balance.toLocaleString('id') : <Dots />}</div>
        </div>
        <div className="balance-toggle flex items-center gap-x-2 text-sm cursor-pointer" onClick={() => setSeeBalance(prev => !prev)}>
          Lihat Saldo <IoEyeOutline />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;