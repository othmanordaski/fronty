import React, { useState } from "react";
import registerimage from "../../assets/registerpage.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import "../../style/style.css";
import { registerUser } from "../../../Api/userApi";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate()
  const [errorMessage,setErrorMessage]=useState('')

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log(response.data);
      if ( response.status == 200){
        console.log('client registered successfully');

      }else {
        console.log(response.error.message)
      }
    } catch (error) {
      console.log('test',error.response.data);
      setErrorMessage(errorMessage)
    }
  }

  const style = {
    position: "absolute",
    height: "95vh",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    border: "px solid #000",
    boxShadow: 14,
    pl: 2,
    borderRadius: "20px",
  };

  return (
    <div>
      <Box sx={style}>
        <div className="flex space-x-1">
          <div className="grid pb-1">
            <div className="flex flex-row justify-between items-center">
              <h1
                className="font-mono text-4xl font-black text-lime-600 pt-8 pl-2"
                style={{ fontFamily: "Orelega One, cursive" }}
              >
                Foody
              </h1>
              <h6 className="bg-white text-sm hover:text-lime-600 pt-10 pr-2" onClick={() => {navigate('/login')}}>
                already have an account
              </h6>
            </div>
            <div className="mt-5 flex flex-col space-y-2">
              <p className="ml-2 pl-2 font-sans text-sm text-gray-600/50">
                Welcome! Sign up to your account to access the best services
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="ml-3 mr-10">
                  <label className="text-sm font-normal" style={{ fontFamily: 'Roboto, sans-serif' }}>Username</label>
                  <TextField
                    {...register('username')}
                    className="ml-3 pl-3 rounded-xl w-full h-15"
                    placeholder="Enter your username"
                    error={!!errors.username}
                  />
                  <FormHelperText error>{errors.username?.message}</FormHelperText>
                </div>
                <div className="ml-3 mr-10">
                  <label className="text-sm font-normal" style={{ fontFamily: 'Roboto, sans-serif' }}>Email</label>
                  <TextField
                    {...register('email')}
                    className="ml-3 pl-3 rounded-xl w-full h-15"
                    placeholder="Enter your email"
                    error={!!errors.email}
                  />
                  <FormHelperText error>{errors.email?.message}</FormHelperText>
                </div>
                <div className="ml-3 mr-10">
                  <label className="text-sm font-normal" style={{ fontFamily: 'Roboto, sans-serif' }}>Password</label>
                  <TextField
                    {...register('password')}
                    type="password"
                    className="ml-5 pl-3 rounded-xl w-full h-15"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    error={!!errors.password}
                  />
                  <FormHelperText error>{errors.password?.message}</FormHelperText>
                </div>
                <div className="ml-3 mr-10">
                  <label className="text-sm font-normal" style={{ fontFamily: 'Roboto, sans-serif' }}>Confirm Password</label>
                  <TextField
                    {...register('confirmPassword')}
                    type="password"
                    className="ml-5 pl-3 rounded-xl w-full h-15"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    error={!!errors.confirmPassword}
                  />
                  <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>
                </div>
                <div className="flex pt-2 ml-5 gap-3">
                  <button
                    className="rounded-full bg-lime-600 hover:bg-lime-800 w-32 h-12 text-white"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
          <img
            src={registerimage}
            alt="Description of image"
            style={{
              width: "50%",
              height: "95vh",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          />
        </div>
      </Box>
    </div>
  );
}
