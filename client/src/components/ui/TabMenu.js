import React from 'react'

const TabMenu = ({menuList, activeMenu, setActiveMenu}) => {
  return (
    <div className='flex w-full text-lightText font-semibold bg-white border border-light rounded-lg'>
        {menuList.map((item, index) => (
        <div
            key={index}
            className={`cursor-pointer flex-1 p-2 text-center rounded-lg ${
            activeMenu === item.id && 'text-black border border-light'
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