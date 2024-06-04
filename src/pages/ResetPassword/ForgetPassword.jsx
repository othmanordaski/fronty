import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@/components/ui/button"
import { MailCheck } from 'lucide-react';
import {Card,CardContent,CardDescription,CardHeader,CardTitle,CardFooter} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { forgetPassword } from '../../../Api/userApi'

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is not valid"),
});

export default function ForgetPassword() { 

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { register, handleSubmit, formState: { errors  } ,watch } = useForm({
    resolver: yupResolver(schema),
  });

  const email = watch('email');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await forgetPassword(data.email);
      if (response.status === 200) {
      setEmailSent(true);
    }else if( response.status==404) {
      setErrorMessage(true)
    }
    } catch (error) {
      setErrorMessage(true)
      
    }
    setLoading(false);
  }

  return (
    <div  className='min-h-screen h-screen bg-gray-200 overflow-x-hidden   flex justify-center items-center' >
      <Card>
    {emailSent ? (
    <>
      <CardHeader>
      <div className="flex justify-center items-center ">
        <div className='flex flex-col p-3 rounded-lg text-white bg-lime-600 justify-center items-center'>
          <MailCheck size={25} />
        </div>
      </div>
        <CardTitle className="font-semibold pb-4 text-2xl text-lime-600 text-center">Reset email sent</CardTitle>
        <CardDescription className="text-gray-600 text-center">We have just sent you an email with a password reset link to {email} </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
      <Button  className='w-40 py-2 rounded-lg text-white bg-lime-600' type="button" onClick={() => window.location.href = '/'}>Got it</Button>
      </CardContent>
    </>
    ) : ( 
    <>
        <CardHeader>
          <CardTitle className="font-semibold pb-5 text-2xl text-lime-600">Password Reset</CardTitle>
          <CardDescription className="text-gray-600">Enter your email address and we’ll send you a link to reset your password </CardDescription>
        </CardHeader>
        {errorMessage ? (<>
          <p className='text-sm ml-5 pl-3 py-1 text-red-500 '>The email you entered was not found</p>          
        </>
        ) : (
        <>
        </>)}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-4 ">
              <div className="flex flex-col space-y-1.5 w-full ">
                <Input id="email" type="email" className="bg-gray-100 rounded-lg focus-visible:outline-none focus:ring-2 focus:ring-black w-full p-3" {...register("email")} placeholder="email" />
                {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
              </div>
              < div className='flex justify-center mt-[30px]'>
                <button className={`flex justify-center   p-[10px] rounded-3xl w-[100px] ${!email ? 'bg-white border-2 border-lime-600 text-lime-600 ' : 'bg-lime-600 text-white '}`} type="submit" disabled={!email || loading } >
                {loading ? <div className="flex justify-center items-center w-full "><CircularProgress size={24} style={{ color: '#ffffff' }} /></div> : 'Send'}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center items-center'>
          <a href="/login" className="text-lime-600 text-sm text-center">Back to Login</a>
        </CardFooter>
        </>)}
        </Card>
    </div>
  )
}