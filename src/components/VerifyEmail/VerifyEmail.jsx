import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../../Api/userApi';
import { CircleX } from 'lucide-react';

function VerifyEmail() {
  const {id,token} = useParams();
  const [message, setMessage] = useState('We are currently verifying your email address. Please wait a moment.');
  const [isVerified, setIsVerified] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {    
    verifyEmail(id, token)
      .then(res => {
        if (res.status === 200) {
          setMessage('Verified! You will be redirected to the home page soon.');
          setIsVerified(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else if (res.status === 400) {
          setMessage('You are not verified.');
        } else {
          setMessage('Verification failed.');
        }
      })
      .catch(err => {
        console.log(err);
        setMessage('Verification failed.');
      });
  }, [id, token]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-xl p-6">
        <h1 className="text-center text-xl font-bold">Email Verification</h1>
        <p className="text-center">
          {message}
        {isVerified && <CircleX />}</p>
        <div className='flex justify-center items-center mt-6'>
          <CircularProgress />
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail