import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Sidebar from './Sidebar';
import Header from './Header';
import HomePage from './Home/HomePage';
import UsersPage from './Users/UsersPage';
import MenusPage from './Menus/MenusPage';
import OrdersPage from './Orders/OrdersPage';

const Dashboard = () => {  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-white p-2 ">
        <Toaster />
          <Routes>
            <Route path="home" element={<HomePage />} /> 
            <Route path="users" element={<UsersPage />} />
            <Route path="menus" element={<MenusPage />} />
            <Route path="orders" element={<OrdersPage />} /> 
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;