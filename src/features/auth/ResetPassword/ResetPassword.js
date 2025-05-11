import { useState, useEffect } from 'react';
import { useUpdatePasswordMutation } from '../../users/usersApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageBox from '../../../components/Utility/MessageBox/MessageBox';
import './ResetPassword.css';

const PWD_REGEX = /^[A-z0-9]{4,20}$/;

const ResetPassword = () => {
  let content;

  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const navigate = useNavigate();

  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmTouched, setIsConfirmTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState('');
  const [isConfirmPwdError, setIsConfirmPwdError] = useState('');

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [updatePassword, { isSuccess, isLoading, isError, error }] = useUpdatePasswordMutation();

  const handleUpdate = async () => {
    try {
      await updatePassword({ token, newPassword: password });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setPasswordMatch(password === confirmPass);
  }, [password, confirmPass]);

  // Validate Password
  useEffect(() => {
    if (isPasswordTouched) {
      const timer = setTimeout(() => {
        if (!validPassword) {
          setIsPasswordError('Password must be at least 4 to 20 characters');
        } else {
          setIsPasswordError('');
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [password, isPasswordTouched, validPassword]);

  // Validate Confirm Password
  useEffect(() => {
    if (isConfirmTouched) {
      const timer = setTimeout(() => {
        if (!passwordMatch) {
          setIsConfirmPwdError('The two passwords do not match');
        } else {
          setIsConfirmPwdError('');
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [confirmPass, isConfirmTouched, passwordMatch]);

  useEffect(() => {
    if (isSuccess) {
      setShow(true);
      setTitle('Success');
      setMessage('Your password was successfully updated. Make sure you remember it this time!');
    } else if (isError) {
      setShow(true);
      setTitle('Failed');
      setMessage('An error occurred or you were too slow');
    }
  }, [isSuccess, isError]);

  if (!token) {
    content = (
      <h1>Unauthorized Access! Please go back.</h1>
    );
  } else {
    content = (
      <div className='reset-password-page'>
        <MessageBox
          show={show}
          setShow={setShow}
          title={title}
          message={message}
          buttonsType={'confirm'}
          callBackFunction={() =>{
            navigate('/login')
          }}
        />
        <div className='reset-password-form'>
          <h2>Enter a new password and make sure you don't forget it this time!</h2>
          <br />
          <input
            className='input-box'
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => {
              setIsPasswordTouched(true);
              setPassword(e.target.value);
            }}
          />
          <p className='error-validation'>{isPasswordError || <span className='placeholder'>placeholder</span>}</p>
          <br />
          <input
            className='input-box'
            type='password'
            placeholder='Confirm Password'
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              setIsConfirmTouched(true);
            }}
          />
          <p className='error-validation'>{isConfirmPwdError || <span className='placeholder'>placeholder</span>}</p>
          <br />
          <button
            className={`submit-btn ${!(validPassword && passwordMatch) ? 'disabled' : ''}`}
            onClick={handleUpdate}
            disabled={!(validPassword && passwordMatch) || isLoading}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return content;
};

export default ResetPassword;
