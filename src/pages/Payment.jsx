import React, { useEffect, useState } from 'react'
import { TbNumber100Small } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config/api';
import { useSelector } from 'react-redux';

function Payment() {
  const token = useSelector((state) => state.auth.token);
  const [paymentData, setPaymentData] = useState()
  let { search } = useLocation()
  const params = new URLSearchParams(search);

  useEffect(() => {
    if (params) {
      setPaymentData({
        service_code: params.get('code'),
        service_name: params.get('service_name'),
        tarif: parseInt(params.get('tarif')),
        icon: params.get('icon'),
      })
    }
  }, [])

  const set_PaymentData = (value) => {
    console.log(value)
    const newValue = value ? parseInt(value.split('.').join('')) : '';
    setPaymentData(prev => ({
      ...prev,
      tarif: newValue
    }));
  };
  

  const confirmPayment = (e) => {
    e.preventDefault()
    Swal.fire({
      title: "<img src='/logo.png' class='mx-auto w-12' />",
      icon: "<img src='/logo.png' alt='SIMS PPOB logo' />",
      html: `
        Beli ${paymentData.service_name} senilai<br />
        Rp. ${paymentData.tarif.toLocaleString('id')} ?
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <strong class="text-red-500 text-sm">Ya, lanjutkan Bayar</strong>
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
    try {
      const response = await fetch(`${API_BASE_URL}/transaction`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_code: paymentData.service_code
        })
      });

      const data = await response.json();

      if (data.status === 0) {        
        // Show success message
        await Swal.fire({
          title: "<img src='/logo.png' class='mx-auto w-12' />",
          icon: "<img src='/logo.png' alt='SIMS PPOB logo' />",
          text: `Pembayaran ${paymentData.service_name} Sebesar <br />
          ${paymentData.tarif}<br />
          Berhasil!`,
          confirmButtonColor: 'white',
          confirmButtonText: 'Kembali ke Beranda'
        }).then(() => {
          return navigate('/')
        });

        // Reset form
        setPaymentData();
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
  
  if (!paymentData) return null;
  return (
    <div className="payment px-5 md:px-0">
      <div className="text-md mb-2">Pembayaran</div>
      <div className="xl:text-xl font-bold mb-3 flex items-center gap-3">
        <img src={paymentData.icon} alt="" className='w-8 md:w-10' />
        {paymentData.service_name}
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <form onSubmit={confirmPayment} className="w-full">
          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400 apply-center border border-gray-400 rounded">
              <TbNumber100Small />
            </label>
            <input
              type="text"
              name="tarif"
              value={paymentData.tarif?.toLocaleString('id')}
              onChange={(e) => set_PaymentData(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded"
              placeholder='masukan nominal pembayaran'
              required
              disabled
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white p-2 rounded ${paymentData.tarif ? "bg-red-500 hover:bg-red-600 cursor-pointer" : "bg-gray-300"}  mt-5`}
            disabled={!paymentData.tarif}
          >
            Top up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Payment