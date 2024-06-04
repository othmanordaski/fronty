import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../components/SignUp/SignUpModal';
import SignUpClient from '../components/SignUpClient/signup-client';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import ForgetPassword from '../components/ResetPassword/ForgetPassword';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import Login from '../components/login/login-form';
import NotAuthorized from '../pages/NotAuthorized/NotAuthorized';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/register" element={<SignUpClient />} />
      <Route path="/client/verify/:id/:token" element={<VerifyEmail />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/reset-password" element={<ForgetPassword />} />
      <Route path="/unauthorized" element={<NotAuthorized />} />
    </Routes>
    
  )
}

export default PublicRoutes;
