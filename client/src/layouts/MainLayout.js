import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import { useDispatch } from 'react-redux'
import { setActiveSelect } from '../features/layout/LayoutSlice'

const MainLayout = () => {

  const dispatch = useDispatch()

  return (
    <>
      <main className='min-h-screen flex bg-background p-4'>
        <Sidebar />

        <div onClick={() => {dispatch(setActiveSelect(""))}} className='w-[calc(100%-300px)] ml-[300px] '>
          <div className='w-full h-full'>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default MainLayout