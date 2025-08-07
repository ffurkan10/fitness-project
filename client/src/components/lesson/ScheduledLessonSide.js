import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/buttons/Button';
import { showModal } from '../../features/modal/ModalSlice';
import moment from 'moment';
import { getOccupiedSlots, getUserLessons, setSelectedLesson, updateUserLesson } from '../../features/lesson/lessonSlice';
import { FaChevronRight } from 'react-icons/fa';
import InputDate from '../ui/inputs/InputDate';
import { getAvailableTimeSlots } from '../../utils/timeSlots';

const ScheduledLessonSide = () => {
    const dispatch = useDispatch();
    const { userLessons, occupiedSlots, selectedLesson } = useSelector((state) => state.lesson);
    const {selectedUser} = useSelector((state) => state.users);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [selectedResult, setSelectedResult] = useState("");

    const availableTimeSlots = getAvailableTimeSlots(occupiedSlots);

    useEffect(() => {
        if(selectedDate) {
            dispatch(getOccupiedSlots(selectedDate))
        }
    }, [selectedDate])
    

    const handleActiveSelect = (lesson) => {
        if(selectedLesson?._id === lesson._id) {
            dispatch(setSelectedLesson(""));
        } else if(selectedLesson?._id !== lesson._id && (lesson.status === "scheduled" || lesson.status === "postponed")) {
            dispatch(setSelectedLesson(lesson));
        } else{
            dispatch(setSelectedLesson(""));
            setSelectedResult("");
        }
    }

    useEffect(() => {
        dispatch(getUserLessons(selectedUser._id))
    }, [dispatch, selectedUser._id])

    const completeLesson = () => {
        dispatch(updateUserLesson({ id: selectedLesson._id, lessonData: { status: "completed" }}));
        dispatch(setSelectedLesson(""));
        setSelectedResult("");
    }

    const postponedLesson = () => {
        dispatch(updateUserLesson({ id: selectedLesson._id, lessonData: { status: "postponed", date: selectedDate, time: selectedTimeSlot }}));
        dispatch(setSelectedLesson(""));
        setSelectedResult("");
    }

    const canceledLesson = () => {
        dispatch(updateUserLesson({ id: selectedLesson._id, lessonData: { status: "canceled" }}));
        dispatch(setSelectedLesson(""));
        setSelectedResult("");
    }

  return (
    <div className='w-full h-full flex flex-col justify-between gap-4 overflow-y-auto'>
        <div className='flex flex-col gap-2 w-full '>
            {userLessons.length > 0 ? (userLessons.map((lesson, index) => (
                <div key={index} onClick={() => handleActiveSelect(lesson)} className='cursor-pointer p-4 border-2 border-light rounded-lg'>
                    <div className={`flex justify-between items-center ${selectedLesson?._id === lesson._id ? "border-b border-light pb-2" : ""}`}>
                        <div className='flex items-center gap-2'>
                            <p className='text-dark text-lg font-semibold'>{moment(lesson.date).format('L')}</p>
                            <p className='text-dark text-lg font-semibold'>{lesson.time}</p>
                            {lesson.status === "scheduled" && <p className='text-blue text-md font-semibold'>Planlanmış</p>}
                            {lesson.status === "completed" && <p className='text-green text-md font-semibold'>Tamamlanmış</p>}
                            {lesson.status === "postponed" && <p className='text-yellow text-md font-semibold'>Ertelenmiş</p>}
                            {lesson.status === "missed" && <p className='text-red text-md font-semibold'>Kaçırılmış</p>}
                        </div>
                        <FaChevronRight className={`text-dark transition-transform duration-300 ${selectedLesson?._id === lesson._id ? "rotate-90" : ""}`} />
                    </div>

                    {
                        selectedLesson?._id === lesson._id && (
                            <div onClick={(e) => e.stopPropagation()} className="flex align-center justify-between mt-4 gap-4">
                                <p onClick={completeLesson} className={`text-white text-sm text-center font-medium p-3 bg-black rounded-lg w-full`}>Tamamla</p>
                                <p onClick={() => {dispatch(setSelectedLesson(lesson)); setSelectedResult("postponed")}} className={`text-white text-sm text-center font-medium p-3 bg-black rounded-lg w-full ${selectedResult === "postponed" ? "bg-dark !important" : ""}`}>Ertele</p>
                                <p onClick={canceledLesson} className={`text-white text-sm text-center font-medium p-3 bg-black rounded-lg w-full`}>İptal Et</p>
                            </div>
                        )
                    }

                    {selectedResult === "postponed" && selectedLesson?._id === lesson._id && (
                        <div onClick={(e) => {e.stopPropagation(); }} className='flex flex-col gap-2 mt-4'>
                            <InputDate data={selectedDate} setData={(e) => setSelectedDate(e.target.value)} labelText={"Ders Tarihi"} width={"300px"} name={"lessonDate"} />
                            {selectedDate && (
                                <div className='flex flex-col gap-2'>
                                    <label className='text-dark text-sm font-semibold'>Uygun Saatler</label>
                                    <div className='grid grid-cols-4 gap-2'>
                                        {availableTimeSlots.map((slot, index) => (
                                            <div key={index} onClick={() => setSelectedTimeSlot(slot)} className={`p-2 text-md font-semibold text-center border rounded-md cursor-pointer ${selectedTimeSlot === slot ? 'bg-dark text-white' : 'bg-black text-white'}`}>
                                                {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))) : (
                <p className='text-dark text-sm'>Kayıtlı ders bulunmamaktadır.</p>
            )}
        </div>
        <div className='flex gap-4 w-full items-center justify-center h-16'>
            <Button width={"150px"} handleClick={postponedLesson} text={"Güncelle"} />
            <Button width={"150px"} handleClick={() => dispatch(showModal(null))} text={"Kapat"} />
        </div>
    </div>
  )
}

export default ScheduledLessonSide