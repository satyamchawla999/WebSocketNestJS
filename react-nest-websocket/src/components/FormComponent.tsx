import { type FC, type FormEvent, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { WebsocketContext } from '../context/WebsocketContext'

import { addUser, signIn } from '../features/users/actionCreator'

import { useAppDispatch } from '../app/hooks'

interface data {
  page?: string
}

const FormComponent: FC<data> = (props) => {
  const { page } = props
  const socket = useContext(WebsocketContext);

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()

    const name: string = nameRef.current!.value
    const email: string = emailRef.current!.value
    const password: string = passwordRef.current!.value
    const confirmPassword: string = confirmPasswordRef.current!.value

    if(password === confirmPassword) {
      void dispatch(addUser({ name, email, password })).unwrap().then((result) => {
        console.log(result)
        if (result === undefined) {
          console.log('User Already Present')
        } else {
          console.log('sign up successfull!!')
          socket.emit('newUser',result);
          navigate('/signin')
        }
      })
    } else {
      console.log('incorrect password')
    }
  }

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault()
    const email = emailRef.current!.value
    const password = passwordRef.current!.value

    void dispatch(signIn({ email, password })).unwrap().then((result) => {
      console.log(result)
      if (result === undefined) {
        console.log('Incorrect email or password')
      } else {
        console.log('sign in successfull!!')
        navigate('/')
      }
    })
  
  }

  return (
    <div className="formSection">

      <h1>{page}</h1>

      <form className="inputForm">

        {page === 'Sign up' && <input type="name" name="name" placeholder='Name' ref={nameRef} required />}
        <input type="email" name="email" placeholder='Email' ref={emailRef} required />
        <input type="password" name="password" placeholder='Password' ref={passwordRef} required />
        {page === 'Sign up' && <input type="password" name="confirmPassword" placeholder='Confirm Password' ref={confirmPasswordRef} required />}

        {/* // eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button onClick={page === 'Sign up' ? handleSignup : handleSignin}>
          {page}
        </button>

      </form>

      {page === 'Sign up' ? <>
          <p>Already have an account? <Link className="link" to="/signin" >Sign in</Link></p>
      </> : <>
          <p>New user? <Link className="link" to="/signup" >Sign up</Link></p>
      </>}

    </div>
  )
}

export default FormComponent
