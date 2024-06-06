import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from '@contexts/AuthContext';
import SignUp from '../components/SignUp/SignUpModal';
import SignUpClient from '../components/SignUpClient/signup-client';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import ForgetPassword from '../pages/ResetPassword/ForgetPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Login from '../components/login/login-form';
import NotAuthorized from '../pages/NotAuthorized/NotAuthorized';
import Dashboard from '../pages/Dashboards/admin/dashbord';
import ProtectedRoute from './ProtectedRoute';
import { Toaster } from "@/components/ui/toaster"


const AppRouter = () => {
  console.log('AppRouter');
  return (
    <Router>
        <UserProvider>
        <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUpClient />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/client/verify/:id/:token" element={<VerifyEmail />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ForgetPassword />} />
                <Route path="/unauthorized" element={<NotAuthorized />} />
                <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                <Route path="/admin/dashboard/*" element={<Dashboard />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['Client']} />}>
                <Route path="/client/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </UserProvider>
    </Router>
  );
};


export default AppRouter;