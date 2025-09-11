import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useScrollLock } from '../../../hooks/useScrollLock';
import { showModal } from '../../../features/modal/ModalSlice';
import TabMenu from '../../ui/TabMenu';
import NewLessonSide from '../../lesson/NewLessonSide';
import ScheduledLessonSide from '../../lesson/ScheduledLessonSide';

const menuList = [
  { id: 1, name: 'Ders Ekle' },
  { id: 2, name: 'Kayıtlı Dersler' },
]

const LessonScheduleModal = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const { modalLocation } = useSelector((state) => state.modal);
    const { lockScroll, unlockScroll } = useScrollLock();
    const [activeMenu, setActiveMenu] = useState(1)
    

    useEffect(() => {
        lockScroll();

        return () => {
        unlockScroll();
        };
    }, [lockScroll, unlockScroll]);

    //! bu başka bir sayfaya geçildiğinde modal ı kapatmak için
    useEffect(() => {
        if (location.pathname !== modalLocation) {
        dispatch(showModal(null));
        }
    }, [dispatch, location.pathname, modalLocation]);


    return (
        <div onClick={() => dispatch(showModal(null))} className="fixed top-0 right-0 bottom-0 left-0 bg-modalBg flex justify-center items-center z-[9999] shadow-lg">
            <div onClick={(e) => e.stopPropagation()} className="w-[800px] h-[600px] p-5 rounded-lg flex flex-col justify-between items-center bg-white gap-5 overflow-y-auto">
                <div className='w-full flex flex-col gap-5 items-center h-full'>
                    <TabMenu menuList={menuList} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

                    {activeMenu === 1 && (
                        <NewLessonSide />
                    )}

                    {activeMenu === 2 && (
                        <ScheduledLessonSide />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LessonScheduleModal