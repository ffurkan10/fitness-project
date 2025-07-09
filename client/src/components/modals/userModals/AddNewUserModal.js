import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useScrollLock } from '../../../hooks/useScrollLock';
import { showModal } from '../../../features/modal/ModalSlice';
import Button from '../../ui/buttons/Button';
import InputText from '../../ui/inputs/InputText';
import InputPhone from '../../ui/inputs/InputPhone';
import { FaChevronRight } from "react-icons/fa";
import InputSelect from '../../ui/inputs/InputSelect';
import { singlePackageTypes } from '../../../utils/packageTypes';
import MembershipInfoSection from '../../signSections/MembershipInfoSection';
import { addNewUser } from '../../../features/users/UserSlice';

const AddNewUserModal = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const { modalLocation } = useSelector((state) => state.modal);
    const { lockScroll, unlockScroll } = useScrollLock();

    const [data, setData] = useState({
        nameSurname: "",
        password: "",
        passwordConfirm: "",
        age: ""
    })
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState(null);

    const [activeMember, setActiveMember] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
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
        if(data.nameSurname && data.password && data.passwordConfirm && data.age && phoneNumber){

            const body = {
                name: data.nameSurname,
                password: data.password,
                passwordConfirm: data.passwordConfirm,
                age: data.age,
                phoneNumber: phoneNumber.slice(1),
                gender: gender.value
            }
            
            dispatch(addNewUser(body))
        }
    }

    return (
        <div onClick={() => dispatch(showModal(null))} className="fixed top-0 right-0 bottom-0 left-0 bg-modalBg flex justify-center items-center z-[9999] shadow-lg">
            <div onClick={(e) => e.stopPropagation()} className="w-[600px] h-[600px] p-5 rounded-lg flex flex-col justify-between items-center bg-white gap-5 overflow-y-auto">

                <h2 className='text-dark text-2xl font-bold mb-2'>Üye Ekle</h2>

                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col gap-2'>
                        {/* <div className='text-xl font-semibold text-dark'>Kayıt Bilgileri</div> */}
                        <InputText data={data.nameSurname} setData={(e) => handleInputChange(e)} name={"nameSurname"} width={"100%"} labelText={"Ad Soyad"} />
                        <InputPhone data={phoneNumber} setData={setPhoneNumber} name={"phoneNumber"} width={"100%"} labelText={"Telefon Numarası"} />
                        <InputText data={data.password} setData={(e) => handleInputChange(e)} name={"password"} width={"100%"} labelText={"Şifre"} />
                        <InputText data={data.passwordConfirm} setData={(e) => handleInputChange(e)} name={"passwordConfirm"} width={"100%"} labelText={"Şifre Tekrar"} />
                        <InputText data={data.age} setData={(e) => handleInputChange(e)} name={"age"} width={"100%"} labelText={"Yaş"} />
                        <InputSelect data={gender} setData={setGender} initialOptions={[{id: 1, text: "Erkek", value: "erkek"}, {id:2, text:"Kadın", value: "kadın"}]} name={"gender"} width={"100%"} labelText={"Cinsiyet"} />
                    </div>

                    {/* <div className='flex flex-col gap-3 mt-4 cursor-pointer'>
                        <div onClick={() => setActiveMember(!activeMember)} className='flex gap-2 items-center'>
                            <p className='text-xl font-semibold text-dark'>Üyelik Bilgileri</p>
                            <FaChevronRight size={16} className={`text-dark transition-transform duration-300 ${activeMember ? "rotate-90" : ""}`} />
                        </div>

                        {activeMember && (
                            <MembershipInfoSection />
                        )}
                    </div> */}
                </div>

                <div className='flex gap-4 w-full items-center justify-center mt-5'>
                    <Button width={"150px"} handleClick={handleSubmit} text={"Tamamla"} />
                    <Button width={"150px"} handleClick={() => dispatch(showModal(null))} text={"Kapat"} />
                </div>
            </div>
        </div>
    )
}

export default AddNewUserModal