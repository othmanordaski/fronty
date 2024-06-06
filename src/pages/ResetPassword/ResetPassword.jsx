import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { resetPassword } from '../../../Api/userApi';
import image from '../../assets/pexels-vardarious-3887985.jpg'

const schema = yup.object().shape({
  newPassword: yup.string().required("New password is required").min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  updatedPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required("Please confirm your new password"),
});

function ResetPassword() {
  const {token} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }  , watch} = useForm({
    resolver: yupResolver(schema),
  });
  const watchedValues = watch();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log('data', data);
      const response = await resetPassword(token, data);
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Error resetting password:', response);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }
  }

  return (
    <>
      <div className="min-h-screen h-screen bg-gray-100 overflow-x-hidden   flex justify-center items-center ">
        <div className="flex h-[500px] z-10">
          <div className="bg-cover  w-[350px] shadow-2xl h-[500px]  relative">
            <img src={image} alt="" className="w-full h-full rounded-l-[20px]" />
          </div>
          <form  className='flex flex-col justify-center items-center bg-white rounded-r-[20px] shadow-lg w-[400px]  p-4' onSubmit={handleSubmit(onSubmit)}>
          < h1 className="font-semibold pb-5 text-2xl text-lime-600">Password Reset</h1>
          <div className="text-gray-600 text-center pb-5">Please enter your new password</div>
          <div className=' flex  flex-col w-[350px] gap-2 mt-6'>
          <TextField 
            {...register('newPassword')}
            margin="normal" 
            required 
            fullWidth
            id="password" 
            label="New Password" 
            autoFocus
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
          <TextField 
            {...register('updatedPassword')}
            margin="normal" 
            required  
            id="updatedPassword" 
            label="Confirm New Password" 
            autoFocus
            error={!!errors.updatedPassword}
            helperText={errors.updatedPassword?.message}
          />
          < div className='flex justify-center mt-[30px]'>
          <button className='flex justify-center  bg-lime-600 p-[10px] rounded-3xl w-[130px] text-white' type="submit" disabled={!watchedValues.newPassword || !watchedValues.updatedPassword} >
          {loading ? <div className="flex justify-center items-center w-full "><CircularProgress size={24} style={{ color: '#ffffff' }} /></div> : 'Update'}
          </button>
          </div>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;