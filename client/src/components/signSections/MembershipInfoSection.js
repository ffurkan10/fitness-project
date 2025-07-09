import React, { useState } from 'react'
import InputSelect from '../ui/inputs/InputSelect'
import InputText from '../ui/inputs/InputText'

const MembershipInfoSection = () => {


  return (
    <div className='flex flex-col gap-2'>
      <InputSelect />
      <InputSelect />
      <InputText />
      <InputSelect />
    </div>
  )
}

export default MembershipInfoSection