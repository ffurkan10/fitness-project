import React from 'react'
import { NumericFormat } from 'react-number-format';

const InputNumber = ({data, setData, name, width, labelText}) => {
  return (
    <div className="flex flex-col gap-2" style={{width: width || '100%'}}>
      <label htmlFor={name} className="text-dark text-sm font-semibold mr-2">{labelText}</label>
      <NumericFormat
        name={name}
        value={data}
        onChange={setData}
        className="w-full border border-dark rounded-lg p-2 w-1/3 focus:outline-none focus:ring-1 focus:ring-dark transition duration-300"
      />
    </div>
  )
}

export default InputNumber