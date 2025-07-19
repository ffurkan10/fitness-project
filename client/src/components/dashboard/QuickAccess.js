import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStats } from '../../features/stats/StatSlice'
import { IoPeople } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import StatCard from '../ui/cards/StatCard';
import { FaClock } from "react-icons/fa";

const QuickAccess = () => {
  const dispatch = useDispatch()
  const {lastMonthStats} = useSelector((state) => state.stats)

  useEffect(() => {
    dispatch(fetchStats())
  },[])


  return (
    <section className='w-full flex items-center flex-col justify-between '>
      <div className='w-full flex items-end gap-3'>
        <h2 className='text-2xl font-bold text-dark'>Hızlı Erişim</h2>
        <p className='text-sm font-medium text-dark'>{lastMonthStats?.month}</p>
      </div>
      <div className='w-full flex flex-col sm:flex-row gap-5 mt-5'>
        <StatCard title={"Toplam Üye"} value={lastMonthStats?.totalUsers} iconBg={"#FF4647"} icon={<IoPeople size={20} />} />
        <StatCard title={"Toplam Gelir"} value={lastMonthStats?.totalRevenue} iconBg={"#FFB732"} icon={<GiPayMoney size={20} />} suffix={" ₺"}  />
        <StatCard title={"Aktif Üye"} value={lastMonthStats?.activeMemberships} iconBg={"#50B380"} icon={<FaCheck size={20} />} />
        <StatCard title={"Üyeliği Bitecek Kişi Sayısı"} value={lastMonthStats?.timeOutMembership} iconBg={"#655DD3"} icon={<FaClock size={20} />} />
      </div>
    </section>
  )
}

export default QuickAccess