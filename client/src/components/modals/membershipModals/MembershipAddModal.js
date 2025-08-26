import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useScrollLock } from '../../../hooks/useScrollLock';
import { showModal } from '../../../features/modal/ModalSlice';
import Button from '../../ui/buttons/Button';
import InputText from '../../ui/inputs/InputText';
import InputSelect from '../../ui/inputs/InputSelect';
import { courseTypes } from '../../../utils/courseTypes';
import { groupPackageTypes, singlePackageTypes } from '../../../utils/packageTypes';
import InputDate from '../../ui/inputs/InputDate';
import { createMembership } from '../../../features/membership/MembershipSlice';

const paidTypes = [
    { id: 1, text: "Ödendi", type: true },
    { id: 2, text: "Ödenmedi", type: false },
]

const MembershipAddModal = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const { modalLocation } = useSelector((state) => state.modal);
    const { lockScroll, unlockScroll } = useScrollLock();
    const {selectedUser} = useSelector((state) => state.users);

    const [data, setData] = useState({
        remainingCourses: "",
        price: "",
        startDate: "",
        endDate: "",
    })

    const [courseType, setCourseType] = useState(null);
    const [packageType, setPackageType] = useState(null);
    const [paidType, setPaidType] = useState(null);

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

    useEffect(() => {
        setPackageType(null);
    }, [courseType])

    const handleSubmit = () => {
        const membershipData = {
            userId: selectedUser?._id,
            packageType: packageType.id,
            courseType: courseType.id,
            remainingCourse: data.remainingCourses,
            price: data.price,
            isActive: true,
            startDate: data.startDate,
            endDate: data.endDate,
            isPaid: paidType?.type
        }
        dispatch(createMembership(membershipData));
        
    }

    return (
        <div onClick={() => dispatch(showModal(null))} className="fixed top-0 right-0 bottom-0 left-0 bg-modalBg flex justify-center items-center z-[9999] shadow-lg">
            <div onClick={(e) => e.stopPropagation()} className="w-[600px] h-[600px] p-5 rounded-lg flex flex-col justify-between items-center bg-white gap-5 overflow-y-auto">

                <h2 className='text-dark text-xl font-bold mb-5'>Üyelik Bilgileri Ekle</h2>

                <div className='flex flex-col gap-4 w-full'>
                    <InputSelect data={courseType} setData={setCourseType} name={"courseType"} initialOptions={courseTypes} width={"100%"} labelText={"Ders Tipi"} />
                    <InputSelect data={packageType} setData={setPackageType} name={"packageType"} initialOptions={courseType?.id === 1 ? singlePackageTypes : groupPackageTypes} width={"100%"} labelText={"Paket Adı"} />
                    <InputText data={data?.remainingCourses} setData={(e) => handleInputChange(e)} name={"remainingCourses"} width={"100%"} labelText={"Kalan Ders Sayısı"} />
                    <InputText data={data?.price} setData={(e) => handleInputChange(e)} name={"price"} width={"100%"} labelText={"Ücret"} />
                    <InputSelect data={paidType} setData={setPaidType} name={"paidType"} initialOptions={paidTypes} width={"100%"} labelText={"Ödeme Durumu"} />
                    <InputDate data={data?.startDate} setData={(e) => handleInputChange(e)} name={"startDate"} width={"100%"} labelText={"Başlangıç Tarihi"} />
                    <InputDate data={data?.endDate} setData={(e) => handleInputChange(e)} name={"endDate"} width={"100%"} labelText={"Bitiş Tarihi"} />
                </div>

                <div className='flex gap-4 w-full items-center justify-center'>
                    <Button handleClick={handleSubmit} text={"Ekle"} />
                    <Button handleClick={() => dispatch(showModal(null))} text={"Kapat"} />
                </div>
            </div>
        </div>
    )
}

export default MembershipAddModal