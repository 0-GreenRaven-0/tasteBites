import {useState, useEffect} from 'react'
import { useAddNewUserMutation } from '../../users/usersApiSlice'
import { useLoginMutation } from '../authApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice';
import logo from './tasteBites.png'
import './SignUp.css'
import { motion } from 'framer-motion'

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9]{4,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

      const [login, {
        isSuccess: isLoginSuccess,
      }] = useLoginMutation()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isConfirmPwdTouched, setIsConfirmPwdTouched] = useState(false);

    const [isUsernameError, setIsUsernameError] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");
    const [isEmailError, setIsEmailError] = useState("");
    const [isConfirmPwdError, setIsConfirmPwdError] = useState("");

    const [canSave ,setCanSave] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    },[username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    },[password])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    },[email])

    useEffect(() => {
        if(password === confirmPassword){
            setPasswordMatch(true)
        }else{
            setPasswordMatch(false)
        }
    },[password, confirmPassword])

    // validate username
    useEffect(() => {
        if(isUsernameTouched){
            const timer = setTimeout(() => {
                if(!validUsername){
                  setIsUsernameError("Username must be between 3 to 20 characters")
                }else{
                    setIsUsernameError("")
                }
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [username, isUsernameTouched, isUsernameError])

    // validate email
    useEffect(() => {
        if(isEmailTouched){
            const timer = setTimeout(() => {
                if(!validEmail){
                  setIsEmailError("Please enter a valid email")
                }else{
                    setIsEmailError("")
                }
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [email, isEmailTouched, isEmailError])

    // validate password
    useEffect(() => {
        if(isPasswordTouched){
            const timer = setTimeout(() => {
                if(!validPassword){
                  setIsPasswordError("password must be between 3 to 20 characters")
                }else{
                    setIsPasswordError("")
                }
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [password, isPasswordTouched, isPasswordError])

      // Validate Confirm Password
  useEffect(() => {
    if (isConfirmPwdTouched) {
      const timer = setTimeout(() => {
        if (!passwordMatch) {
          setIsConfirmPwdError("Passwords do not match");
        } else {
          setIsConfirmPwdError(""); // Clear error if valid
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [confirmPassword, isConfirmPwdTouched, passwordMatch]);


    useEffect(() => {
      if([validUsername, validEmail, validPassword, passwordMatch].every(Boolean) && !isLoading){
        setCanSave(true)
      }else{
        setCanSave(false)
      }
    },[validUsername, validEmail, validPassword, passwordMatch, isLoading])

    const onSubmitClicked = async(e) => {
       e.preventDefault()
       try{
        if(canSave){
            await addNewUser({username, email, password})
        }
       }catch(err){
        console.log(err)
       }
    }
    
    useEffect(() => {
        const autoLogin = async () => {
            if (isSuccess) {
                const {accessToken} = await login({username, email, password}).unwrap()
                dispatch(setCredentials({accessToken}))
                sessionStorage.setItem('persistLogin', true)
                navigate('/'); // Then navigate
            } else if (isError) {
                alert(`something went wrong: \n ${error}`);
            }
        };
    
        autoLogin();
    }, [isSuccess, isError, error]);

const pageVariants = {
  initial: { opacity: 0, y: '100%' },  // Initial state with opacity and y
  animate: { opacity: 1, y: 0 },       // Final state with opacity and y
}
  return (
    <div className='signUp-page'>

       <img src={logo} width={250} height={250} className='logo-img-signUp'/>
           <motion.div 
      initial="initial"  // Use the variant name here
      animate="animate"  // Use the variant name here
      variants={pageVariants}
      transition={{ duration: 0.5 }} 
    >
      <form className='signUp-form'>
        <input
        type='text'
        placeholder='Username'
        onChange={(e) => {
            setUsername(e.target.value)
            setIsUsernameTouched(true)
        }}
        />
        <p className='error-validation'>{isUsernameError ? isUsernameError : (<span className='placeholder-signUp'>
            placeholder
        </span>)}</p>
        <br/>
        <input
        type='email'
        placeholder='Email'
        onChange={(e) =>{
            setEmail(e.target.value)
            setIsEmailTouched(true)
        }}
        />
        <p className='error-validation'>{isEmailError ? isEmailError : (<span className='placeholder-signUp'>
            placeholder
        </span>)}</p>
        <br/>
        <input
        type='password'
        placeholder='Password'
        onChange={(e) => {
            setPassword(e.target.value)
            setIsPasswordTouched(true)
        }}
        autoComplete='off'
        />
         <p className='error-validation'>{isPasswordError ? isPasswordError : (<span className='placeholder-signUp'>
            placeholder
        </span>)}</p>
        <br/>
        <input
        type='password'
        placeholder='Confirm Password'
        onChange={(e) =>{
            setConfirmPassword(e.target.value)
            setIsConfirmPwdTouched(true)
        }}
        autoComplete='off'
        />
         <p className='error-validation'>{isConfirmPwdError ? isConfirmPwdError : (<span className='placeholder-signUp'>
            placeholder
        </span>)}</p>
        <br/>
        <button
        type='submit'
        onClick={onSubmitClicked}
        disabled={!canSave}
        className={` ${!canSave ? 'disabled' : 'signUp-submit'}`}
        >Submit</button>
        <br/>
        <Link className='already-signUp' to={'/login'}>Already have an account?</Link>
      </form>
         </motion.div>
      </div>
  )
}

export default SignUp
