import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMenu } from '@services/adminService';
import { EllipsisVertical, View } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {AlertDialogDemo} from './AlertDialogMenu'
import ViewMenu from './viewMenu';

const FoodCard = ({ _id, name, image, oldPrice, price, description }) => {
  const defaultImageUrl = 'https://img.freepik.com/premium-photo/plate-there-is-spaghetti-bolognese-with-cheese-basil_872147-12665.jpg?w=740';
  return (
    <div className='bg-white rounded-3xl shadow-xl overflow-hidden mb-4'>
      <div 
        className='h-[250px]' 
        style={{ 
          backgroundImage: `url(${image || defaultImageUrl})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      ></div>      
      <div className='p-3 sm:p-4'>
        <p className='font-bold text-gray-700 text-[18px] leading-6 mb-1'>{name}</p>
        <div className='flex flex-row'>
          <p className='text-[#3C3C4399] text-[15px] mr-2 line-through'>{oldPrice || ''}</p>
          <div className='flex flex-1 justify-between items-start'>
            <p className='text-[15px] font-bold text-[#0FB478]'>{price} Dh</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical className='text-gray-400 text-end'/>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <ViewMenu _id={_id} name={name} image={image} oldPrice={oldPrice} price={price} description={description} />
                <AlertDialogDemo title={'Delete'} id={_id} />
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className='text-[#7C7C80] text-[14px] mt-4'>{description}</p>
      </div>
    </div>
  );
};

FoodCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  oldPrice: PropTypes.string,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const SkeletonFoodCard = () => (
  <div className='bg-white rounded-3xl shadow-xl overflow-hidden mb-4'>
    <Skeleton className='h-[250px] w-full' />
    <div className='p-3 sm:p-4'>
      <Skeleton className='h-4 w-3/4 mb-2' />
      <Skeleton className='h-4 w-1/2 mb-2' />
      <div className='flex flex-row items-center'>
        <Skeleton className='h-4 w-1/4 mr-2' />
        <div className='flex flex-1 justify-between items-center'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-4 w-8' />
        </div>
      </div>
      <Skeleton className='h-4 w-full mt-4' />
    </div>
  </div>
);

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     fetchMenu()
      .then(response => {
        console.log(response.data);
        setMenuItems(response.data);
        setTimeout(() => setLoading(false), 400);
      })
      .catch(error => {
        setError('Error fetching menu data');
        setTimeout(() => setLoading(false), 400);
      });
  }, []);

  const renderSkeletons = () => {
    const skeletonCount = 6; 
    return Array.from({ length: skeletonCount }).map((_, index) => <SkeletonFoodCard key={index} />);
  };

  return (
    <div className='min-h-screen p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          renderSkeletons()
        ) : error ? (
          <div className='col-span-full text-center text-red-500'>{error}</div>
        ) : (
          menuItems.map(item => <FoodCard key={item._id} {...item} />)
        )}
      </div>
    </div>
  );
};

export default Menu;
