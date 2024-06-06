import React from "react";
import { Bell, MessageCircle } from 'lucide-react';
import {AdminAvatar} from './avatar-nav'

const Header = () => (
  <header className="flex justify-between items-center px-6 py-4 bg-white border-b-2 border-gray-200">
    <div>
      <span className="text-xl font-semibold text-gray-800">Dashboard</span>
    </div>
    <div className="flex items-center gap-4">
      
      <AdminAvatar />
    </div>
  </header>
);

export default Header;