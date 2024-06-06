import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Input } from "@/components/ui/input";

export default function ViewMenu({ _id, name, image, price, description }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const menuFields = [
    { label: 'Menu ID', value: _id, type: 'text' },
    { label: 'Name', value: name, type: 'text' },
    { label: 'Price', value: price, type: 'text' },
    { label: 'Description', value: description, type: 'text' },
  ];

  return (
    <div>
      <div onClick={handleOpen} className="text-[14px] p-1 pl-2 hover:bg-gray-100 hover:rounded-sm w-full text-start cursor-pointer">
      View</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg w-[800px]"> {/* Increased the width of the modal */}
          <div className="flex justify-between items-start mb-4">
            <img src={image || "https://github.com/shadcn.png"} alt={name} className="w-[600px] h-[400px] rounded-lg object-cover" /> {/* Increased the size of the image */}
            <div className="flex-grow pl-4">
              <h2 id="modal-modal-title" className="text-3xl font-semibold text-gray-900 mb-2">{name}</h2>
              <p id="modal-modal-description" className="text-lg text-gray-700 mb-4">{description}</p>
              <div className="space-y-2">
                {menuFields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-base font-semibold text-gray-800">{field.label}</label>
                    <p className="text-base text-gray-700">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
