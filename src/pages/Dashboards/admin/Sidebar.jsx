import React from "react";
import { Users ,LayoutGrid ,ClipboardList,ShoppingCart,UtensilsCrossed} from 'lucide-react';
import NavLink from './NavLink';

const Sidebar = () => (
  <div className="hidden md:flex flex-col w-[180px] bg-gray-800 border-r border-gray-200 ">
      <nav className="flex flex-col flex-1 overflow-y-auto bg-white justify-start  px-[10px] py-1 gap-1">
        <h1 className=" text-2xl font-bold p-4 text-lime-500">Foody</h1>
        <div>
        <NavLink Icon={LayoutGrid} to='home' text={'Home'}/>
          <NavLink Icon={Users} to='users' text={'Users'} />
          <NavLink Icon={ClipboardList} to='menus' text={'Menus'} />
          <NavLink Icon={ShoppingCart} to='orders' text={'Orders'}/>
          <NavLink Icon={UtensilsCrossed} to='Restaurants' text={'Restaurants'}/>
        </div>
      </nav>
  </div>
);

export default Sidebar;