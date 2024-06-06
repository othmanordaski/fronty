import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


export default function ViewOrder ({ id,total, status, customerId, restaurantId,  createdAt }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const userFields = [
    [
      { label: 'User ID', value: id, type: 'text' },
    ],
    [      { label: 'total', value: total, type: 'text' },
    ],
    [
      { label: 'status', value: status, type: 'text' },
    ],
    [      { label: 'customerId', value: customerId, type: 'text' },
    ],
    [
      { label: 'restaurantId', value: restaurantId, type: 'text' },
    ],
    [
    { label: 'Created At', value: createdAt, type: 'text' },
    ],
    [
      
    ]
  ];

  return (
    <div>
      <div onClick={handleOpen} className="text-[14px] p-1 pl-2 hover:bg-gray-100 hover:rounded-sm w-full text-start cursor-pointer">
        View
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg w-[600px]">
          <div className="space-y-4">
          {userFields.map((fieldGroup, index) => (
            <div key={index} className="flex justify-between space-x-4">
              {fieldGroup.map((field) => (
                <div key={field.label} className="w-full">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <Input
                    type={field.type}
                    value={field.value}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-lime-600 focus:ring focus:ring-lime-600 focus:ring-opacity-50"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
