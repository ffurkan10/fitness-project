import React from 'react'

const StatCard = ({value, title, icon, suffix, iconBg}) => {
  return (
    <div className='border border-light bg-cardBg backdrop-blur-[20px] shadow-card rounded-lg p-4 flex flex-col justify-center gap-4 w-full'>
        <p className='text-sm font-semibold text-black'>{title}</p>
        <h3 className='text-3xl font-semibold text-black'>{value} {suffix}</h3>
    </div>
  )
}

export default StatCard