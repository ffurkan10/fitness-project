import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import { useDispatch } from 'react-redux'
import { setActiveSelect } from '../features/layout/LayoutSlice'

const MainLayout = () => {

  const dispatch = useDispatch()

  return (
    <>
      <main className='min-h-screen flex bg-background'>
        <Sidebar />

        <div 
          onClick={() => {
            dispatch(setActiveSelect(""))
          }} 
          className='flex-1 ml-80 p-5'
        >
          <div className='w-full h-full'>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default MainLayout