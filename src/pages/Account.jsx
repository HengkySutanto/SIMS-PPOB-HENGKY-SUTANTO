import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';
import { logout, setUser } from '../store/slices/authSlice';
import Swal from 'sweetalert2';
import { HiPencil } from "react-icons/hi2";

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || 'user@email.com',
    first_name: user?.first_name || 'User First Name',
    last_name: user?.last_name || 'User Last Name'
  });
  const [profileImage, setProfileImage] = useState()
  const [profileImageUrl, setProfileImageUrl] = useState()
  const [isLoadingUploadFile, setIsLoadingUploadFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/profile/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 0) {
        dispatch(setUser(data.data));
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
          timer: 1500,
          showConfirmButton: false
        });
        setIsEditing(false);
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

  const cancelEditing = () => {
    setIsEditing(false)
    setFormData({
      email: user?.email || 'user@email.com',
      first_name: user?.first_name || 'User First Name',
      last_name: user?.last_name || 'User Last Name'
    })
  }

  const logoutUser = () => {
    dispatch(logout());
  }

  const changeProfileImage = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files[0].size > 1 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File image terlalu besar!",
      });
    } else {
      setIsLoadingUploadFile(true)
      const randomNumber = Math.floor((Math.random() * 99999) + 10000)
      let fileName = files[0].name
      let fileExt = fileName.split('.').slice(-1)[0]
      let fileIsImage = ['jpg', 'jpeg', 'png'].includes(fileExt)

      let formData = new FormData();
      if (fileIsImage) {
        formData.append("file", files[0], `${files[0].name}-${randomNumber}.${fileExt}`);

        try {
          const response = await fetch(`${API_BASE_URL}/profile/image`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
            body: formData
          });

          const data = await response.json();

          if (data.status === 0) {
            // Update balance in store
            dispatch(setProfileImage(data.data.profile_image));

            // Show success message
            await Swal.fire({
              text: `Upload image berhasil!`,
            });
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
              text: `Upload image gagal`,
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Type file tidak valid!",
        });
      }
      e.target.value = ''
      setIsLoadingUploadFile(false)
    }
  };

  return (
    <div className="container mx-auto p-5 md:p-0 md:py-5 space-y-10">
      <div className="account px-5 md:px-0">
        <div className="flex flex-col items-center mb-5">
          <div className="relative">
            <img src={user?.profile_image || "/profile-photo.png"} alt={user?.first_name} className="w-32 h-32 rounded-full mb-5" />
            <label htmlFor="profile_image" className={`absolute bottom-6 right-0 p-2 bg-white border border-gray-300  text-gray-300 rounded-full shadow-lg ${isLoadingUploadFile && "hover:text-gray-600"}`}>
              <HiPencil className="w-4 h-4" />
            </label>
            <input type="file"
              name="profile_image"
              id="profile_image"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={changeProfileImage}
              disabled={isLoadingUploadFile}
            />
          </div>
          <h2 className="text-lg xl:text-2xl font-bold">{user?.first_name + user?.last_name || 'User Name'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg mx-auto">
          <div className='relative'>
            <label className="absolute left-3 top-[1.35rem] -translate-y-1/2 text-gray-400">@</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-gray-200 w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded`}
              placeholder='masukan email anda'
              disabled={true}
              required
            />
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
              className={`${!isEditing && "bg-gray-200"} w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded`}
              placeholder='nama depan'
              disabled={!isEditing}
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
              className={`${!isEditing && "bg-gray-200"} w-full p-2 pl-10 border border-gray-300 placeholder-gray-400 rounded`}
              placeholder='nama belakang'
              disabled={!isEditing}
              required
            />
          </div>

          {isEditing ? (
            <>
              <button
                type="submit"
                className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Simpan
              </button>

              <div
                onClick={cancelEditing}
                className="w-full bg-gray-400 text-white text-center p-2 rounded hover:bg-gray-500"
              >
                Batalkan
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-red-500 text-white text-center p-2 rounded hover:bg-red-600"
              >
                Edit Profile
              </div>
              <div
                className="w-full bg-white text-red-500 border border-red-500 text-center p-2 rounded hover:bg-red-100"
                onClick={logoutUser}
              >
                Logout
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Account; 