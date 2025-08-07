import React, { useEffect, useState } from 'react'
import { setActiveSelect } from '../../../features/layout/LayoutSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronRight } from 'react-icons/fa'

const InputSelect = ({data, setData, name, width, labelText, initialOptions}) => {

    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const {activeSelect} = useSelector((state) => state.layout)

    useEffect(()=>{
        setOptions(initialOptions)
    },[initialOptions])

    const handleOptionClick = (item) => {
        dispatch(setActiveSelect(""))
        setData(item)
    }

  return (
    <div className="flex flex-col gap-2 relative" style={{width: width || '100%'}}>
        <label htmlFor={name} className="text-dark text-sm font-semibold mr-2">{labelText}</label>
        <div
            className="w-full border h-[45px] border-light rounded-lg p-2 w-full flex justify-between items-center cursor-pointer"
            onClick={() => dispatch(setActiveSelect((activeSelect && activeSelect === name) ? "" : name))}
        >
            <span className="text-sm font-medium text-dark">{data ? data.text : "Seçiniz"}</span>
            <FaChevronRight className={`text-dark transition-transform duration-300 ${activeSelect === name ? "rotate-90" : ""}`} />
        </div>
        {
          activeSelect === name &&
          <div className="absolute top-full left-0 right-0 bg-white border border-light rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {
              options.map((item) => (
                <div key={item.id} className="w-full py-2 px-4 text-sm font-medium text-dark cursor-pointer hover:bg-background" onClick={() => handleOptionClick(item)}>
                    {item.text}
                </div>
              ))
            }
          </div>
        }
    </div>
  )
}

export default InputSelect