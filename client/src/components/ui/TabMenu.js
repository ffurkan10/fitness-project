import React from 'react'

const TabMenu = ({menuList, activeMenu, setActiveMenu}) => {
  return (
    <div className='flex w-full text-dark font-semibold bg-white shadow-card rounded-[50px]'>
        {menuList.map((item, index) => (
        <div
            key={index}
            className={`cursor-pointer flex-1 p-4 text-center rounded-[50px] ${
            activeMenu === item.id && 'bg-softYellow text-dark '
            }`}
            onClick={() => setActiveMenu(item.id)}
        >
            {item.name}
        </div>
        ))}
    </div>
  )
}

export default TabMenu