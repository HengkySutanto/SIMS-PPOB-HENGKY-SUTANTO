import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from "../components/home/UserProfile"
import { TbNumber100Small } from "react-icons/tb";
import Swal from "sweetalert2";
import { API_BASE_URL } from '../config/api';
import { setBalance } from '../store/slices/authSlice';
import { useNavigate } from "react-router-dom";

const topUpValue = [
  10000,
  20000,
  50000,
  100000,
  250000,
  500000
]
const TopUp = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    topup_amount: '',
  });
  let navigate = useNavigate();

  const set_FormData = (value) => {
    const newValue = value ? Number(value.split('.').join('')) : '';
    if (Number(newValue) > 1000000) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Max amount of Top Up is Rp. 1.000.000'
      });
      return;
    }
    setFormData(prev => ({
      ...prev,
      topup_amount: newValue
    }));
  };

  const confirmTopUp = (e) => {
    e.preventDefault()
    Swal.fire({
      title: "<img src='/logo.png' class='mx-auto w-12' />",
      icon: "<img src='/logo.png' alt='SIMS PPOB logo' />",
      html: `
        Anda yakin untuk Top Up sebesar<br />
        Rp. ${formData.topup_amount.toLocaleString('id')} ?
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <strong class="text-red-500 text-sm">Ya, lanjutkan Top Up</strong>
      `,
      cancelButtonText: `
        <strong class="text-gray-300">Batalkan</strong>
      `,
      confirmButtonColor: 'white',
      cancelButtonColor: 'white',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleSubmit()
      }
    });
  }

  const handleSubmit = async () => {
    // Validate amount
    if (!formData.topup_amount || formData.topup_amount <= 0) {
      Swal.fire({
        title: "<img src='/logo.png' class='mx-auto w-12' />",
        text: 'Top up amount must be greater than 0'
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/topup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          top_up_amount: parseInt(formData.topup_amount)
        })
      });

      const data = await response.json();

      if (data.status === 0) {
        // Update balance in store
        dispatch(setBalance(data.data.balance));
        
        // Show success message
        await Swal.fire({
          title: "<img src='/logo.png' class='mx-auto w-12' />",
          text: `Top up Sebesar <br />
          ${data.data.balance}<br />
          Berhasil!`,
          confirmButtonColor: 'white',
          confirmButtonText: 'Kembali ke Beranda'
        }).then(() => {
          return navigate('/')
        });

        // Reset form
        setFormData({ topup_amount: '' });
      } else if (data.status === 108) {
        // Token invalid/expired
        Swal.fire({
          title: "<img src='/logo.png' class='mx-auto w-12' />",
          text: `Unauthorized User`,
        });
      } else {
        // Other errors
        console.error('Top up failed:', data.message);
        Swal.fire({
          title: "<img src='/logo.png' class='mx-auto w-12' />",
          text: `Top up Sebesar <br />
          ${data.data.balance}<br />
          Gagal`,
          confirmButtonColor: 'white',
          confirmButtonText: 'Kembali ke Beranda'
        }).then(() => {
          return navigate('/')
        });
      }
    } catch (error) {
      console.error('Error during top up:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan pada server'
      });
    }
  };

  return (
    <div className="topup px-5 md:px-0">
      <div className="text-md">Silahkan masukan</div>
      <div className="text-lg xl:text-2xl font-bold">
        Nominal Top Up
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <form onSubmit={confirmTopUp} className="w-full">
          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400 apply-center border border-gray-400 rounded">
              <TbNumber100Small />
            </label>
            <input
              type="text"
              name="topup_amount"
              value={formData.topup_amount.toLocaleString('id')}
              onChange={(e) => set_FormData(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded"
              placeholder='masukan nominal Top Up'
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white p-2 rounded ${formData.topup_amount ? "bg-red-500 hover:bg-red-600 cursor-pointer" : "bg-gray-300"}  mt-5`}
            disabled={!formData.topup_amount}
          >
            Top up
          </button>
        </form>
        <div className="grid grid-cols-3 gap-x-2 gap-y-5 flex-shrink-0">
          {topUpValue?.map((amount) => (
            <div 
              key={amount}
              className="w-full md:w-28 h-10 text-sm md:text-base p-1 md:p-2 apply-center border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => set_FormData(amount.toString())}
            >
              Rp. {amount.toLocaleString('id')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUp; 