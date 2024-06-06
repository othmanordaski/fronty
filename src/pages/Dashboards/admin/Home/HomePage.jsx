import React from 'react';
import { Users, ShoppingCart, ClipboardList } from 'lucide-react';
import { DataTableDemo } from './UserTable';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className='h-screen p-3 bg-white grid grid-cols-3 gap-3'>
      <div className='col-span-2 grid grid-rows-[auto,1fr] gap-3 bg-white'>
        <div className='grid grid-cols-3 gap-3'>
          <div className='bg-gray-100 p-6 flex flex-col justify-between rounded-lg'>
            <div className='flex justify-between items-center'>
              <p className='text-gray-600 text-lg'>Total Users</p>
              <div className='bg-white rounded-xl w-12 h-12 flex items-center justify-center'>
                <Users className='text-lime-600' />
              </div>
            </div>
            <p className='text-2xl font-semibold text-gray-700 mt-4'>18</p>
          </div>
          <div className='bg-gray-100 p-6 flex flex-col justify-between rounded-lg'>
            <div className='flex justify-between items-center'>
              <p className='text-gray-600 text-lg'>Total Orders</p>
              <div className='bg-white rounded-xl w-12 h-12 flex items-center justify-center'>
                <ShoppingCart className='text-lime-600' />
              </div>
            </div>
            <p className='text-2xl font-semibold text-gray-700 mt-4'>2</p>
          </div>
          <div className='bg-gray-100 p-6 flex flex-col justify-between rounded-lg'>
            <div className='flex justify-between items-center'>
              <p className='text-gray-600 text-lg'>Total Menus</p>
              <div className='bg-white rounded-xl w-12 h-12 flex items-center justify-center'>
                <ClipboardList className='text-lime-600' />
              </div>
            </div>
            <p className='text-2xl font-semibold text-gray-700 mt-4'>9</p>
          </div>
        </div>
        <div className='bg-gray-100 p-6 flex flex-col gap-3 rounded-lg'>
          <div className='flex justify-between items-center'>
            <p className='font-bold text-lg text-gray-700'>Users</p>
            <Link to='/admin/dashboard/users' className='text-sm text-lime-600 cursor-pointer hover:underline'>View all</Link>
          </div>
          <DataTableDemo />
        </div>
      </div>
      <div className='col-span-1 bg-gray-100 p-6 rounded-lg'>
      </div>
    </div>
  );
}

export default Home;