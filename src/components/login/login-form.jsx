import React from "react";
import registerimage from "../../assets/registerpage.png";
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import "../../style/style.css";
import { CssBaseline } from '@mui/material';
import { useAuth } from '@contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';


const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
});

export default function Login() {
  console.log("login page")
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate=useNavigate()
  const [isloading, setIsLoading] = React.useState(false);
  const { login , isLoginModalOpen ,setIsLoginModalOpen} = useAuth();

  const handleClose = () => {
    setIsLoginModalOpen(false);
  }

  const onSubmit = async (data) => {

    const { email, password } = data;
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      console.log(error);
    }finally {
      
      setTimeout(() => setIsLoading(false), 300);
    }
  };

const style = {
  position: 'absolute',
  height : "85vh",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: '30px',
  pl : 2 ,
  outline: 'none',

};
  return (
    <div>
      <CssBaseline/>
      < Modal
      open={isLoginModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
      <Box sx={style} >
        <div className="flex space-x-1">
          <div className="grid pb-1">
            <div className="flex flex-row justify-between items-center  ">
              <h1
                className="font-mono text-4xl font-black text-lime-600 pt-8 pl-2"
                style={{ fontFamily: "Orelega One, cursive" }}
              >
                Foody
              </h1>
              <h6 className=" text-sm hover:text-lime-600 pt-10 pr-2" onClick={ () => {navigate('/register') } }>
                Don't have an account?
              </h6>
            </div>
            <div className="mt-5 flex flex-col space-y-2">
              <p className="ml-2 pl-2 font-sans text-sm text-gray-600/50">
                Welcome! Sign up to your account to access the best services
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="ml-3 mr-10 mt-3 mb-3">
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
                
                <div className="flex pt-2 ml-5 mt-6">
                  <button
                    className="rounded-full bg-lime-600 hover:bg-lime-800 w-32 h-12 text-white"
                    type="submit"
                  >{isloading ? <div><CircularProgress size={24} style={{color : 'white'}}/></div> : "Sign In"}
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
              height: "85vh",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          />
        </div>
      </Box>
      </Modal>
    </div>
  );
}
