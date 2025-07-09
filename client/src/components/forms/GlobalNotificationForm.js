import React, { useState } from 'react'
import InputText from '../ui/inputs/InputText'
import InputTextarea from '../ui/inputs/InputTextarea'
import Button from '../ui/buttons/Button'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../../features/notification/NotificationSlice'

const GlobalNotificationForm = () => {

    const dispatch = useDispatch()

    const [data, setData] = useState({
        title: '',
        content: ''
    })

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
            isGlobal: true,
            userId: null
        }

        dispatch(sendNotification(notificationData))
    }

  return (
    <div className='flex flex-col gap-4 w-full max-w-2xl mt-10'>
        <InputText data={data.title} setData={(e) => handleInputChange(e)} name={"title"} labelText={"Bildirim Başlığı"} width={"100%"} />
        <InputTextarea data={data.content} setData={(e) => handleInputChange(e)} name={"content"} labelText={"Bildirim İçeriği"} width={"100%"} />
        <Button text={"Gönder"} width={"200px"} handleClick={handleSubmit} />
    </div>
  )
}

export default GlobalNotificationForm