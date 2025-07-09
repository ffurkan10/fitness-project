import React, { useEffect, useState } from 'react'
import { showModal } from '../../../features/modal/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { useLocation } from 'react-router-dom';
import Button from '../../ui/buttons/Button';
import InputNumber from '../../ui/inputs/InputNumber';
import { createBodyFeatures } from '../../../features/body/BodyFeatureSlice';

const BodyFeatureAddModal = () => {

   const dispatch = useDispatch();
    const location = useLocation();
    const { modalLocation } = useSelector((state) => state.modal);
    const { lockScroll, unlockScroll } = useScrollLock();
    const {selectedUser} = useSelector((state) => state.users);

    const [data, setData] = useState({
        weight: 0,
        height: 0,
        chest: 0,
        waist: 0,
        hips: 0,
        shoulders: 0,
        arms: 0,
        legs: 0,
        fatPercentage: 0,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

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

    const handleSubmit = () => {
      const submitData = {
        userId: selectedUser?._id,
        ...data
      }
      dispatch(createBodyFeatures(submitData));
    }

  return (
    <div onClick={() => dispatch(showModal(null))} className="fixed top-0 right-0 bottom-0 left-0 bg-modalBg flex justify-center items-center z-[9999] shadow-lg">
        <div onClick={(e) => e.stopPropagation()} className="w-[600px] h-[600px] p-5 rounded-lg flex flex-col justify-between items-center bg-white gap-5 overflow-y-auto">

            <h2 className='text-dark text-xl font-bold mb-5'>Vücut Ölçüleri Ekle</h2>

            <div className='flex flex-col gap-4 w-full'>
                <InputNumber data={data?.weight} setData={(e) => handleInputChange(e)} name={"weight"} width={"100%"} labelText={"Kilo (kg)"} />
                <InputNumber data={data?.height} setData={(e) => handleInputChange(e)} name={"height"} width={"100%"} labelText={"Boy (cm)"} />
                <InputNumber data={data?.chest} setData={(e) => handleInputChange(e)} name={"chest"} width={"100%"} labelText={"Göğüs Ölçüsü"} />
                <InputNumber data={data?.shoulders} setData={(e) => handleInputChange(e)} name={"shoulders"} width={"100%"} labelText={"Omuz Ölçüsü"} />
                <InputNumber data={data?.arms} setData={(e) => handleInputChange(e)} name={"arms"} width={"100%"} labelText={"Kol Ölçüsü"} />
                <InputNumber data={data?.waist} setData={(e) => handleInputChange(e)} name={"waist"} width={"100%"} labelText={"Bel Ölçüsü"} />
                <InputNumber data={data?.hips} setData={(e) => handleInputChange(e)} name={"hips"} width={"100%"} labelText={"Kalça Ölçüsü"} />
                <InputNumber data={data?.legs} setData={(e) => handleInputChange(e)} name={"legs"} width={"100%"} labelText={"Bacak Ölçüsü"} />
                <InputNumber data={data?.fatPercentage} setData={(e) => handleInputChange(e)} name={"fatPercentage"} width={"100%"} labelText={"Yağ Oranı (%)"} />
            </div>

            <div className='flex gap-4 w-full items-center justify-center'>
                <Button width={"150px"} handleClick={handleSubmit} text={"Ekle"} />
                <Button width={"150px"} handleClick={() => dispatch(showModal(null))} text={"Kapat"} />
            </div>
        </div>
    </div>
  )
}

export default BodyFeatureAddModal