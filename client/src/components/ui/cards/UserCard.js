import React from 'react'
import Button from '../buttons/Button'
import { useDispatch } from 'react-redux';
import { showModal } from '../../../features/modal/ModalSlice';
import { setSelectedUser } from '../../../features/users/UserSlice';
import moment from 'moment';
import 'moment/locale/tr';
moment.locale('tr');

const UserCard = ({data}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedUser(data));
    dispatch(showModal("userOption"))
  }

  const endDate = moment(data?.membership?.endDate);
  const today = moment();
  const daysLeft = endDate.diff(today, 'days');

  return (
    <div className='grid grid-cols-6 items-center gap-2 border border-light p-4 hover:bg-light transition duration-300'>
        <div className='text-dark text-sm font-semibold text-center'>{data.name}</div>
        <div className='text-dark text-sm font-semibold text-center'>{data.phoneNumber}</div>
        <div className='text-dark text-sm font-semibold text-center'>{data?.membership ? moment(data?.membership?.startDate).format("DD.MM.YYYY") : ""}</div>
        <div className='text-center relative'>
          <p className='text-dark text-sm font-semibold '>{data?.membership ? moment(data?.membership?.endDate).format("DD.MM.YYYY") : ""}</p>
          {data?.membership && daysLeft < 3 && <span className='absolute text-xs font-medium text-red right-9 top-5'>Üyelik tarihi bitiyor!</span> }
        </div>
        <div className='text-sm font-semibold text-center'>{data?.membership ? data?.membership?.isActive ? <span className='text-yellow'>Aktif</span> : <span className='text-red'>Pasif</span> : ""}</div>
        <div className='flex items-center justify-center'>
          <Button text={"Detay"} handleClick={handleClick} />
        </div>
    </div>
  )
}

export default UserCard