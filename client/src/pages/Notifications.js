import React, { useEffect, useState } from 'react'
import TabMenu from '../components/ui/TabMenu'
import GlobalNotificationForm from '../components/forms/GlobalNotificationForm'
import SpecialNotificationForm from '../components/forms/SpecialNotificationForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../features/users/UserSlice'
import { getAllNotifications } from '../features/notification/NotificationSlice'
import NotificationCard from '../components/ui/cards/NotificationCard'
import QuickAccess from '../components/dashboard/QuickAccess'

const menuList = [
  { id: 1, name: 'Global Bildirim Gönder' },
  { id: 2, name: 'Kullanıcıya Bildirim Gönder' },
  
]

const Notifications = () => {

  const dispatch = useDispatch()
  const { allNotifications } = useSelector(state => state.notification)
  const [activeMenu, setActiveMenu] = useState(1)

  useEffect(() => {
    dispatch(getAllUsers({name: ''}))
    dispatch(getAllNotifications())
  }, [])

  return (
    <div className='flex flex-col items-center h-full'>

      <QuickAccess isMemberPage={false} />

      <div className='flex justify-between align-center w-full gap-10 mt-10'>
        <div className='flex flex-col items-center justify-start w-1/2'>
          <TabMenu menuList={menuList} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

          {activeMenu === 1 && <GlobalNotificationForm />}
          {activeMenu === 2 && <SpecialNotificationForm /> }
        </div>

        <div className='flex flex-col items-center w-1/2 '>
          <div className='text-md text-center font-bold text-dark p-4 bg-light rounded-t-[20px] w-full'>Geçmiş Bildirimler</div>
          <div className='w-full overflow-y-auto h-[calc(100vh-200px)] flex flex-col'>
            {allNotifications.length > 0 ? (
              allNotifications.map((notification, index) => (
                <NotificationCard data={notification} key={index} />
              ))
            ) : (
              <div className='text-gray-500'>Henüz bildirim yok.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications