import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const InputPassword = ({data, setData, name, width, labelText, showPassword, type, isShow}) => {
  return (
    <div className="flex flex-col gap-2 relative" style={{width: width || '100%'}}>
        <label htmlFor={name} className="text-dark text-sm font-semibold mr-2">{labelText}</label>
        <input
            type={type}
            name={name}
            value={data}
            onChange={setData}
            className="w-full relative border border-dark rounded-lg p-2 w-1/3 focus:outline-none focus:ring-1 focus:ring-dark transition duration-300"
        />
        {isShow ?
                <FaEyeSlash className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer" onClick={showPassword} />
            :
                <FaEye className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer" onClick={showPassword} />
        }
    </div>
  )
}

export default InputPassword