import React from 'react'

const InputDate = ({data, setData, name, width, labelText}) => {
  return (
    <div className="flex flex-col gap-2" style={{width: width || '100%'}}>
      <label htmlFor={name} className="text-dark text-sm font-semibold mr-2">{labelText}</label>
      <input
        type="date"
        name={name}
        value={data}
        onChange={setData}
        className="w-full border border-light rounded-lg p-2 w-1/3 focus:outline-none"
      />
    </div>
  )
}

export default InputDate