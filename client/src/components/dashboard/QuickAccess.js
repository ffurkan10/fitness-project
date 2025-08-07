import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStats } from '../../features/stats/StatSlice'
import { IoPeople } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import StatCard from '../ui/cards/StatCard';
import { FaClock } from "react-icons/fa";
import fastBg from '../../assets/png/fast-bg.png'
import InputText from '../ui/inputs/InputText';
import { getAllUsers } from '../../features/users/UserSlice';
import AddUserButton from '../ui/buttons/AddUserButton';
import InputUserSearch from '../ui/inputs/InputUserSearch';

const QuickAccess = ({isMemberPage}) => {
  const dispatch = useDispatch()
  const {lastMonthStats} = useSelector((state) => state.stats)

  const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      dispatch(getAllUsers({name: searchTerm}))
    }, [searchTerm])

  useEffect(() => {
    dispatch(fetchStats())
  },[])


  return (
    <section className='w-full flex items-center flex-col justify-between p-4 rounded-[20px] min-h-[250px] h-[250px]' style={{backgroundImage: `url(${fastBg})`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
      {isMemberPage ? 
        <div className='w-full flex items-end gap-3'>
          <InputUserSearch width={"200px"} labelText={"İsme Göre Ara"} name={"searchTerm"} setData={(e) => setSearchTerm(e.target.value)} data={searchTerm} />
        </div>
      :
        <div className='w-full flex items-end gap-3'>
          <h2 className='text-2xl font-bold text-black'>Hızlı Erişim</h2>
          <p className='text-sm font-medium text-black'>{lastMonthStats?.month}</p>
        </div>
      }
      <div className='w-full grid grid-cols-4 gap-5 mt-5' style={isMemberPage ? {gridTemplateColumns: 'repeat(5, 1fr)'} : {gridTemplateColumns: 'repeat(4, 1fr)'}}>
        <StatCard title={"Toplam Üye"} value={lastMonthStats?.totalUsers} iconBg={"#FF4647"} icon={<IoPeople size={20} />} />
        <StatCard title={"Toplam Gelir"} value={lastMonthStats?.totalRevenue} iconBg={"#FFB732"} icon={<GiPayMoney size={20} />} suffix={" ₺"}  />
        <StatCard title={"Aktif Üye"} value={lastMonthStats?.activeMemberships} iconBg={"#50B380"} icon={<FaCheck size={20} />} />
        <StatCard title={"Üyeliği Bitecek Kişi Sayısı"} value={lastMonthStats?.timeOutMembership} iconBg={"#655DD3"} icon={<FaClock size={20} />} />
        {isMemberPage && 
          <div className='flex items-end justify-end h-[100px]'>
            <AddUserButton />
          </div>
        }
      </div>
    </section>
  )
}

export default QuickAccess