import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { showModal } from '../../features/modal/ModalSlice';
import Button from '../ui/buttons/Button';


const ResultModal = () => {
  const { resultModalData } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(showModal(null));
      if(resultModalData.link){
        window.location.href = resultModalData.link;
      }
    }, 3000);

    return () => clearTimeout(timer); 
  }, [dispatch, resultModalData.link]);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/60 flex justify-center items-center z-[9999] shadow-lg">
      <div className="w-[600px] h-auto p-5 rounded-lg flex flex-col justify-center items-center bg-white gap-5">
        {resultModalData.resultType === "success" ? (
          <div className="w-16 h-16 bg-green rounded-full flex justify-center items-center">
            <FaCheck className="" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-red rounded-full flex justify-center items-center">
            <IoMdClose className="" />
          </div>
        )}
        <p>{resultModalData.message}</p>
        <Button text={"Kapat"} />
      </div>
    </div>
  )
}

export default ResultModal