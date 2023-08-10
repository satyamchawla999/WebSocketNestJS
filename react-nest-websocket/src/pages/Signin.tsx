import React, { type FC } from 'react'

import { FormComponent } from '../components'

import '../assets/styles/common.scss'

const Signin: FC = () => {
  return (
    <div className='signin'>
        <FormComponent page={'Sign in'}/>
    </div>
  )
}

export default Signin