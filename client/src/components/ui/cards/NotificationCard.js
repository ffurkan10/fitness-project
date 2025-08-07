import moment from 'moment';
import 'moment/locale/tr';
moment.locale('tr');

const NotificationCard = ({data}) => {
  return (
    <div className='bg-white flex flex-col gap-2 p-4 w-full border border-light relative'>
        {data?.user && <p className='absolute right-2 top-2 text-xs text-red'>Özel Mesaj ({data?.user?.name})</p>}
        <p className='text-md font-semibold'>{data.title}</p>
        <p className='text-sm font-medium'>{data.message}</p>
        <span className='text-sm text-lightText'>{moment(data.createdAt).format("DD.MM.YYYY HH:mm")}</span>
    </div>
  )
}

export default NotificationCard