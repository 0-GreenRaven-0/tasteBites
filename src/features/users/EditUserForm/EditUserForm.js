import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from '../usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { useGetUserImageQuery } from '../../profileImage/userImgApiSlice'
import { useSendLogoutMutation } from '../../auth/authApiSlice'
import MessageBox from '../../../components/Utility/MessageBox/MessageBox'
import CropComponent from '../../profileImage/CropComponent/CropComponent'
import Theme from '../../../components/Utility/Theme/Theme'
import './EditUserForm.css'

const USER_REGEX = /^$|^[A-Za-z]{5,20}$/;

const EditUserForm = ({ user }) => {

    const navigate = useNavigate()

    // Message box states
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState()
    const [message, setMessage] = useState()
    const [callBackFunction, setCallBackFunction] = useState(() => () => {
        console.log("initial method...")
    })
    const [navigateMethod, setNavigateMethod] = useState()
    const [buttonsType, setButtonsType] = useState('confirm')

    const [username, setUsername] = useState(user.username || '')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameTouched, setUsernameTouched] = useState(false)
    const [usernameError, setUsernameError] = useState("")
    const [description, setDescription] = useState(user.description || '')

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    },[username])

    useEffect(() => {
        if(usernameTouched){
            const timer = setTimeout(() => {
                if(!validUsername){
                    setUsernameError("Username must be between 5 to 20 characters")
                }else{
                    setUsernameError("")
                }
            }, 1000)

            return () => clearTimeout(timer)
        }
    },[usernameTouched, usernameError, validUsername])

    let manageUserImg
    const {
        data,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetUserImageQuery("profilePicsList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

        const [sendLogout, {
            isSuccess: isLogoutSuccess
        }] = useSendLogoutMutation()

    if(isSuccess){
        const {ids, entities} = data

        if(ids?.length){
            const userImage = ids.map(id => entities[id]).find(image => image.user === user.id)
            
           if(userImage){
            manageUserImg = (
                <div className='profile-img-panel'>
                      <img src={userImage.url} className='my-profile-img' width={250} height={250}/>
                      <CropComponent userImage={userImage} user={user.id} purpose={"edit"} component={'edit-user'}  />
                </div>
            )
           }else{
            manageUserImg = (
                <div className='profile-img-panel'>
                   <CropComponent userImage={userImage} user={user.id} purpose={"upload"} component={'edit-user'} />
                </div>
            ) 
           }
        }
    }

    if(isError){
        console.log("something has happened while fetching data...")
    }

    const [updateUser,
         { 
        isSuccess: isUpdateSuccess, 
        isLoading: isUpdateLoading, 
        isError: isUpdateError, 
        error: updateError }] = useUpdateUserMutation()

    const [deleteUser, { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError }] = useDeleteUserMutation()

    useEffect(() => {
        if (isUpdateSuccess) {
           navigate('/')
        } else if (isUpdateError) {
            alert(updateError?.data?.message)
        }
    }, [isUpdateSuccess, isUpdateError])

    useEffect(() => {
        const handleDelete = async () => {
          if (isDeleteSuccess) {
            await sendLogout()
            sessionStorage.clear('persistLogin')
            localStorage.clear('TasteBites-autoLogin')
            navigate('/')
          } else if (isDeleteError) {
            alert(deleteError?.data?.message)
          }
        }
      
        handleDelete()
      }, [isDeleteSuccess, isDeleteError])
      

    const onEditClicked = async (e) => {
        e.preventDefault()
    
        if (!user.id) {
            alert('User ID is required!')
            return
        }
    
        const updatedUser = {
            id: user.id,
            username,
            description,
        }
    
        try {
            await updateUser(updatedUser).unwrap()
        } catch (err) {
            console.log(err)
        }
    }
    

    const onDeleteClicked = async (e) => {
        try {
            await sendLogout().unwrap()
            await deleteUser({ id: user.id }).unwrap()  
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='my-profile'>
            <MessageBox show={show} setShow={setShow} title={title} message={message} buttonsType={buttonsType} callBackFunction={callBackFunction} navigateMethod={navigateMethod}/>
            <header className='my-profile-header'>
                <button className='back-btn' onClick={() => {
                    navigate('/')
                }}>Go Back</button>
                <Theme/>
            </header>

            <div className='my-profile-content'>
               <div className='my-profile-content-top'>
                    {manageUserImg}
               </div>
              
               <div className='my-profile-content-bottom'>
               <input
                    className='username-input'
                    type="text"
                    placeholder="New Username"
                    value={username}
                    maxLength={20}
                    onChange={(e) => {
                        setUsernameTouched(true)
                        setUsername(e.target.value)}}
                />
                       <p className='error-validation-edit'>{usernameError ? usernameError : (<span className='placeholder-edit'>
                        placeholder
                    </span>)}</p>
               <textarea
                    className='description-input'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br/>
                <button className='btn' onClick={onEditClicked}>Save Changes</button>
                &nbsp;&nbsp;
                <button className='btn' onClick={() => {
                    setTitle('Delete Account?')
                    setMessage('Are you sure you want to delete your account? once you do, you cannot get it back')
                    setNavigateMethod(() => () => {
                        navigate('/')
                    })
                    setCallBackFunction(() => () => {
                        onDeleteClicked()
                    })
                    setButtonsType('yes-no')
                    setShow(true)
                }}>Delete Account</button>
               </div>
            </div>

        </div>
    )
}

export default EditUserForm
