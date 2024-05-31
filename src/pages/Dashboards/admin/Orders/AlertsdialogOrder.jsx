import { useState } from 'react';
import { ToastDestructive,ToastWithTitle,ToastSimple } from "../ToastMessageHandler"
import {deleteOrder} from '@services/adminService'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  


  export function AlertDialogDemo({title, id }) {
    const [toastType, setToastType] = useState(null);
    const handleDeleteOrder = async (id) => {
      try {
        const responseStatus=404;
        console.log(`order with id ${id} has been deleted.`);
        switch (responseStatus) {
            case 200:
                setToastType('done');
                break;
            case 400:
                setToastType('error');
                break;
            case 404:
                setToastType('not found');
                break;
            default:
                console.log('Unexpected status code');
        }
      } catch (error) {
        console.log('Error deleting user:', error);
        setToastType('error');
      }
    }
    return (
      <>
      <AlertDialog>
        <AlertDialogTrigger className="text-[14px] p-1 pl-2 hover:bg-gray-100 hover:rounded-sm w-full text-start">
          <div>{title}</div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete 
              the user account and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-[#ce190d] text-white' onClick={() => handleDeleteOrder(id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {toastType === 'done' && <ToastSimple />}
      {toastType === 'error' && <ToastWithTitle />}  
      {toastType === 'not found' && <ToastDestructive />}
      </>
        )
  }