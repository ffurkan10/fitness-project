import React from 'react'
import { useDispatch } from 'react-redux';
import { showModal } from '../../../features/modal/ModalSlice';

const AddUserButton = () => {

  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(showModal("addNewUser"))} className='border border-light flex items-center bg-cardBg backdrop-blur-[20px] px-4 py-2 rounded-md hover:bg-light transition duration-300'>
        <span className='text-md font-semibold'>
            Üye Ekle  
        </span>
    </button>
  )
}

export default AddUserButton