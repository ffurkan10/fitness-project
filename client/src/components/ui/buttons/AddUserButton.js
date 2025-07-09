import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { showModal } from '../../../features/modal/ModalSlice';

const AddUserButton = () => {

  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(showModal("addNewUser"))} className='flex items-center bg-dark text-white px-4 py-2 rounded-md hover:bg-light transition duration-300'>
        <FaPlus className='inline mr-2' size={20} />
        <span className='text-md font-semibold'>
            Üye Ekle
        </span>
    </button>
  )
}

export default AddUserButton