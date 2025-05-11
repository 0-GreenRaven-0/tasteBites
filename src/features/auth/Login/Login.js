import {useState, useEffect, useRef} from 'react'
import {useLoginMutation} from '../authApiSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setCredentials } from '../authSlice'
import { useForgotPasswordMutation } from '../../users/usersApiSlice'
import logo from './tasteBites.png'
import MessageBox from '../../../components/Utility/MessageBox/MessageBox'
import './Login.css'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userRef = useRef()
  const errorRef = useRef()

  const [login, {
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError
  }] = useLoginMutation()

  const [forgotPassword, {
    isSuccess,
    isError,
    error
  }]  = useForgotPasswordMutation()

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [autoLogin, setAutoLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [show, setShow] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const toggleAutoLogin = () => {
    const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000
    localStorage.setItem('TasteBites-autoLogin', JSON.stringify({autoLogin, expirationTime}))
  }


  const handleLogin = async(e) => {
    e.preventDefault()
    try{
        const {accessToken} = await login({username, email, password}).unwrap()
        dispatch(setCredentials({accessToken}))
        navigate('/')
       
        if(autoLogin){
          toggleAutoLogin()
        }
    }catch(err){
      console.log(err)
    }
  }

  const requestPassReset = async(e) => {
    e.preventDefault()
    if(!email){
      setTitle("Email is required")
      setMessage("Provide email for your password recovery")
      setShow(true)
      return
    } 
    try{
      await forgotPassword(email).unwrap()
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    if(isLoginSuccess){
      sessionStorage.setItem('persistLogin', true)
      setUsername('')
      setEmail('')
      setPassword('')
    }else if(isLoginError){
      setErrorMessage(loginError?.data?.message)
    }

    if(isSuccess){
      setTitle("Password Recovery")
      setMessage("An email was sent to your address, please check your inbox")
      setShow(true)
    }else if(isError){
      setTitle("Something went wrong...")
      setMessage("An unknown error has occured, please try again later")
      setShow(true)
    }

  },[isSuccess, isError, isLoginError, isLoginError, isLoginSuccess])

  return (
    <div className='login-page'>
      <MessageBox show={show} setShow={setShow} title={title} message={message} buttonsType={'confirm'}/>
      <div className='left-side'>
        <div className='login-container'>
          <img className='logo-in-mobile' src={logo} width={230} height={230}/>
        <h1 className='login-label'>Log in</h1>
      <form>
         <input 
         className='login-input'
         type='text'
         placeholder='Username'
         onChange={e => setUsername(e.target.value)}
         />
         <br/>
         <input
          className='login-input'
         type='email'
         placeholder='Email'
         onChange={e => setEmail(e.target.value)} 
         />
         <br/>
         <div className='pass-area'>
         <input
          className='login-input pass-input'
         type='password'
         placeholder='Password'
         onChange={e => setPassword(e.target.value)}
         />
        <button className='forgot-pass'
         onClick={requestPassReset}>Forgot Password?</button>
         </div>
         <br/>
        <label   className='login-button remember-me'>Remember me
        <input
         type='checkbox'
         checked={autoLogin}
         onChange={() => setAutoLogin(prev => !prev)}
         />
        </label>
         <br/>
        <button
        className='login-button'
        onClick={handleLogin}>Submit</button>
        <br/>
        <Link   className='login-button' to={'/signUp'}>Don't have an account?</Link>
        <br/>
        <p className='login-error'>{errorMessage}</p>
      </form>
        </div>
      </div>
      <div className='right-side'>
        <img src={logo} width={300} height={300}/>
      </div>
    </div>
  )
}

export default Login
