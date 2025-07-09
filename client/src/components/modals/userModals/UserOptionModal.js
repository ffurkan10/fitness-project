import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useScrollLock } from '../../../hooks/useScrollLock';
import { showModal } from '../../../features/modal/ModalSlice';
import Button from '../../ui/buttons/Button';
import { deleteUser } from '../../../features/users/UserSlice';

const UserOptionModal = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const { modalLocation } = useSelector((state) => state.modal);
    const { lockScroll, unlockScroll } = useScrollLock();

    const {selectedUser} = useSelector((state) => state.users);

    useEffect(() => {
        lockScroll();

        return () => {
        unlockScroll();
        };
    }, [lockScroll, unlockScroll]);

    //! bu başka bir sayfaya geçildiğinde modal ı kapatmak için
    useEffect(() => {
        if (location.pathname !== modalLocation) {
        dispatch(showModal(null));
        }
    }, [dispatch, location.pathname, modalLocation]);

    console.log("selectedUser",selectedUser);
    

  return (
    <div onClick={() => dispatch(showModal(null))} className="fixed top-0 right-0 bottom-0 left-0 bg-modalBg flex justify-center items-center z-[9999] shadow-lg">
        <div onClick={(e) => e.stopPropagation()} className="w-[600px] h-auto p-5 rounded-lg flex flex-col justify-center items-center bg-white gap-5">

            <h2 className='text-dark text-xl font-bold mb-5'>Kullanıcı İşlemleri</h2>

            <div className='flex flex-col gap-4 w-full'>
                <Button handleClick={() => {
                    selectedUser?.membership ?
                        dispatch(showModal("updateMembership"))
                    :
                        dispatch(showModal("addMembership"))
                    }} text={"Üyelik Bilgileri"} 
                />
                <Button handleClick={() => {
                    selectedUser?.bodyFeatures ?
                        dispatch(showModal("updateBodyFeature"))
                    :
                        dispatch(showModal("addBodyFeature"))
                }} text={"Vücut Ölçüleri"} />
                <Button text={"Antrenman Programı"} />
                <Button handleClick={() => {
                    selectedUser?.nutrition ?
                        dispatch(showModal("updateNutrition"))
                    :
                        dispatch(showModal("addNutrition"))
                    }} text={"Beslenme Programı"} 
                />
                <Button handleClick={() => dispatch(deleteUser(selectedUser?._id))} text={"Üyeyi Sil"} />
                <Button handleClick={() => dispatch(showModal(null))} text={"Kapat"} />
            </div>
        </div>
    </div>
  )
}

export default UserOptionModal