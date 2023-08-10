import React, { type FC } from 'react'

import '../assets/styles/common.scss'

import { FormComponent } from '../components'

const Signup: FC = () => {
  return (
    <div className='signup'>
      <FormComponent page={'Sign up'} />
    </div>
  )
}

export default Signup
