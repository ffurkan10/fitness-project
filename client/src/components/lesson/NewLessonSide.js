import React, { useEffect, useState } from 'react'
import InputDate from '../ui/inputs/InputDate'
import { getAvailableTimeSlots } from '../../utils/timeSlots';
import { useDispatch, useSelector } from 'react-redux';
import { createUserLesson, getOccupiedSlots } from '../../features/lesson/lessonSlice';
import { showModal } from '../../features/modal/ModalSlice';
import Button from '../ui/buttons/Button';

const NewLessonSide = () => {
    const dispatch = useDispatch();
    const { occupiedSlots } = useSelector((state) => state.lesson);
    const {selectedUser} = useSelector((state) => state.users);
    
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const availableTimeSlots = getAvailableTimeSlots(occupiedSlots);

    useEffect(() => {
        if(selectedDate) {
            dispatch(getOccupiedSlots(selectedDate))
        }
    }, [selectedDate])

    const selectTimeSlot = (slot) => {
        setSelectedTimeSlot(slot);
        
    }
    
    const createLesson = () => {
        if (!selectedDate || !selectedTimeSlot) return;

        const lessonData = {
            userId: selectedUser._id,
            date: selectedDate,
            time: selectedTimeSlot
        };

        dispatch(createUserLesson(lessonData));
    }

  return (
    <div className='flex flex-col gap-4 w-full h-full '>
        <div className='flex flex-col gap-2 w-full h-full'>
            <InputDate data={selectedDate} setData={(e) => setSelectedDate(e.target.value)} labelText={"Ders Tarihi"} width={"300px"} name={"lessonDate"} />
        
            {selectedDate && (
                <div className='flex flex-col gap-2'>
                    <label className='text-dark text-sm font-semibold'>Uygun Saatler</label>
                    <div className='grid grid-cols-4 gap-2'>
                        {availableTimeSlots.map((slot, index) => (
                            <div key={index} onClick={() => selectTimeSlot(slot)} className={`p-2 text-md font-semibold text-center border rounded-md cursor-pointer ${selectedTimeSlot === slot ? 'bg-dark text-white' : 'bg-black text-white'}`}>
                                {slot}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

         <div className='flex gap-4 w-full items-center justify-center'>
            <Button width={"150px"} handleClick={createLesson} text={"Ekle"} />
            <Button width={"150px"} handleClick={() => dispatch(showModal(null))} text={"Kapat"} />
        </div>
    </div>
  )
}

export default NewLessonSide