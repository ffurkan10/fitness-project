import React from 'react'

const StatCard = ({value, title, icon, suffix, iconBg}) => {
  return (
    <div className='bg-white shadow-card rounded-lg p-4 flex flex-col items-center justify-center gap-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
        <div className='flex items-center justify-center gap-2 mb-2'>
            <div className='w-8 h-8 rounded-[50%] flex items-center justify-center' style={{backgroundColor: iconBg}}>
                {icon}
            </div>
            <p className='text-md font-medium text-dark'>{title}</p>
        </div>
        <h3 className='text-2xl font-bold text-dark'>{value} {suffix}</h3>
    </div>
  )
}

export default StatCard