import React, { useState ,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@/components/ui/button"
import { MailCheck } from 'lucide-react';
import {Card,CardContent,CardDescription,CardHeader,CardTitle,CardFooter} from "@/components/ui/card"
import { forgetPassword } from '../../../Api/userApi'
import {ToastDestructive,ToastSimple} from "@/helper/ToastHandler"
import { Description } from '@radix-ui/react-toast';

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is not valid"),
});

export default function ForgetPassword() { 
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { register, handleSubmit, formState: { errors  } ,watch } = useForm({
    resolver: yupResolver(schema),
  });

  const email = watch('email');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await forgetPassword(data.email);
      if (response.status === 200) {
        setEmailSent(true);
      } else {
        setErrorMessage("error");
      }
    } catch (error) {
      if (error.response.status === 404){
        setErrorMessage("email");
      }else {
        setErrorMessage("error");
      }
    }
    setLoading(false);
  };
  console.log(errorMessage)
  
  return (
    <div  className='min-h-screen  bg-gray-200 overflow-x-hidden   flex justify-center items-center ' >
      <Card>
    {emailSent ? (
    <>
      <CardHeader className='p-7 px-9'>
      <div className="flex justify-center items-center p-3 ">
        <div className='flex flex-col p-3 rounded-lg text-white bg-lime-600 justify-center items-center'>
          <MailCheck size={25} />
        </div>
      </div>
        <CardTitle className="font-semibold  text-2xl text-lime-600 text-center">Reset email sent</CardTitle>
        <CardDescription className="text-gray-600 text-center">We have just sent you an email with a password  <br/> reset link to {email} </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
      <Button  className='w-40 py-2 rounded-lg text-white bg-lime-600' type="button" onClick={() => navigate('/')}>Got it</Button>
      </CardContent>
    </>
    ) : ( 
      <>
        <CardHeader>
          <CardTitle className="font-semibold text-2xl text-lime-600 text-center px-[90px] pt-3"> Forget  your password ?</CardTitle>
          <CardDescription className="text-gray-600 text-center pt-3">Your password will be reset by email </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-6 ">
              <div className="flex flex-col space-y-1.5 w-full">
                <label className='ml-1 text-lime-600 mb-1'>Email</label>
                <input id="email" type="email" className="bg-gray-100 rounded-lg focus-visible:outline-none focus:ring-2 focus:ring-lime-600 w-full p-3" {...register("email")} placeholder="Enter your email" />
                {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
              </div>
                <button className='flex justify-center  rounded-lg w-full bg-lime-600 text-white py-[10px]' type="submit" disabled={!email || loading } >
                {loading ? <div className="flex justify-center items-center w-full "><CircularProgress size={24} style={{ color: '#ffffff' }} /></div> : 'Send'}
                </button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center items-center'>
          <a  className="text-lime-600 text-sm text-center" onClick={() => { navigate('/login')}}>Back to Login</a>
        </CardFooter>
        </>
        )}
        </Card>
        {errorMessage === 'email' && <ToastDestructive title={'error'} description={'Email not found'} />}
        {errorMessage === 'error' && <ToastDestructive title={'error'} description={'An error occurred while sending the reset email.'}/>}  
    </div>
  )
}