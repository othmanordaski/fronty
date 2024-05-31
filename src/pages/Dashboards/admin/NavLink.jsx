import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ Icon, to, text }) => (
    <RouterNavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center justify-start mt-3 w-full h-12 p-2 rounded-xl relative ${
                isActive ? ' text-white' : 'hover:bg-lime-500 hover:text-white text-gray-400'
            }`
        }
    >
        {({ isActive }) => (
            <div className="flex pl-2 items-center relative">
                {isActive && (
                    <div className="absolute left-0 w-1 h-full bg-lime-500 pr-[5px] rounded-tr-md rounded-br-md"></div>
                )}
                <Icon className={`w-[19px] ${isActive ? 'text-lime-500 ml-3' : 'hover:text-white'}`} />
                <span className={`ml-2 ${isActive ? 'text-lime-500' : 'hover:text-white'}`}>{text}</span>
            </div>
        )}
    </RouterNavLink>
);

export default NavLink;
