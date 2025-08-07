import React, { useState } from 'react'
import InputText from '../ui/inputs/InputText'
import InputTextarea from '../ui/inputs/InputTextarea'
import { useDispatch, useSelector } from 'react-redux'
import InputSelectUser from '../ui/inputs/InputSelectUser'
import { sendNotification } from '../../features/notification/NotificationSlice'
import Button from '../ui/buttons/Button'

const SpecialNotificationForm = () => {
    const {allUsers} = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const [data, setData] = useState({
        title: '',
        content: ''
    })
    const [selectedUser, setSelectedUser] = useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData(prevData => ({
          ...prevData,
          [name]: value
      }));
    }

    const handleSubmit = () => {
      const notificationData = {
          title: data.title,
          message: data.content,
          isGlobal: false,
          userId: selectedUser?._id
      }

      dispatch(sendNotification(notificationData))
    }
    

  return (
    <div className='flex flex-col gap-4 w-full max-w-2xl mt-10'>
        <InputSelectUser data={selectedUser?.name} setData={setSelectedUser} initialOptions={allUsers} labelText={"Bildirim Gönderilecek Kişi"} name={"selectedUser"} width={"100%"} />
        <InputText data={data.title} setData={(e) => handleInputChange(e)} name={"title"} labelText={"Bildirim Başlığı"} width={"100%"} />
        <InputTextarea data={data.content} setData={(e) => handleInputChange(e)} name={"content"} labelText={"Bildirim İçeriği"} width={"100%"} />
        <div className='flex justify-end w-full'>
          <Button text={"Gönder"} width={"200px"} handleClick={handleSubmit} />
        </div>
    </div>
  )
}

export default SpecialNotificationForm