import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/users/UserSlice';
import AddUserButton from '../components/ui/buttons/AddUserButton';
import InputText from '../components/ui/inputs/InputText';
import UserCard from '../components/ui/cards/UserCard';
import QuickAccess from '../components/dashboard/QuickAccess';

const titles = ["Ad Soyad", "Telefon Numarası", "Üyelik Tarihi", "Üyelik Bitiş Tarihi", "Üyelik Durumu", "İşlemler"];

const Members = () => {

  const dispatch = useDispatch();
  const {allUsers} = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllUsers({name: searchTerm}))
  }, [searchTerm])

  return (
    <div className='flex flex-col items-center h-screen'>

      <QuickAccess isMemberPage={true} />

      {/* <div className='flex items-center justify-between w-full'>
        <InputText width={"200px"} labelText={"İsme Göre Ara"} name={"searchTerm"} setData={(e) => setSearchTerm(e.target.value)} data={searchTerm} />
        <AddUserButton />
      </div> */}

      <div className='flex flex-col items-center w-full h-full mt-10'>
        {allUsers && allUsers.length > 0 ? (
            <div className='w-full' >
              <div className='grid grid-cols-6 align-center justify-center gap-2 p-4 bg-light rounded-t-[20px]'>
                {titles.map((title, index) => (
                  <div key={index} className='text-dark text-sm font-semibold text-center'>
                    {title}
                  </div>
                ))}
              </div>

              <div className='flex flex-col'>
                {allUsers.map((item, index) => (
                  <UserCard data={item} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center w-full h-full'>
              Henüz üye bulunmamaktadır.
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Members