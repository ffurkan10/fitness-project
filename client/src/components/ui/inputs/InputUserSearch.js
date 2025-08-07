import React from 'react'
import { CiSearch } from "react-icons/ci";

const InputUserSearch = ({data, setData, name, width, labelText}) => {
  return (
    <div className="flex flex-col gap-2 relative" style={{width: width || '100%'}}>
        <div className="absolute left-[7px] top-[7px] z-10">
            <CiSearch size={25} />
        </div>
        <input
            type="text"
            name={name}
            value={data}
            onChange={setData}
            placeholder='İsme Göre Ara'
            className="border border-light bg-cardBg backdrop-blur-[20px] pl-10 rounded-lg h-[40px] w-[300px] outline-none text-md font-sm placeholder:text-black placeholder:text-sm placeholder:font-sm"
        />
    </div>
  )
}

export default InputUserSearch