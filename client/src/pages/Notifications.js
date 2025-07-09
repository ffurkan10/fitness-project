import React, { useEffect, useState } from 'react'
import TabMenu from '../components/ui/TabMenu'
import GlobalNotificationForm from '../components/forms/GlobalNotificationForm'
import SpecialNotificationForm from '../components/forms/SpecialNotificationForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../features/users/UserSlice'
import { getAllNotifications } from '../features/notification/NotificationSlice'
import NotificationCard from '../components/ui/cards/NotificationCard'

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
      <TabMenu menuList={menuList} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === 1 && <GlobalNotificationForm />}
      {activeMenu === 2 && <SpecialNotificationForm /> }

      <div className='flex flex-col items-center w-full max-w-2xl mt-10'>
        <div className='text-2xl font-bold text-dark mb-4'>Geçmiş Bildirimler</div>

        <div className='w-full'>
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
  )
}

export default Notifications