import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { PulseLoader } from "react-spinners";

const PersistLogin = () => {
     
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const persistLogin = sessionStorage.getItem('persistLogin') || null
    const storedData = JSON.parse(localStorage.getItem('TasteBites-autoLogin'))
    const autoLogin = storedData ? storedData.autoLogin : false

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if(effectRan.current === true){
            
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try{
                    await refresh()
                    setTrueSuccess(true)
                }catch(err){
                    console.error(err)
                }
            }

            if((!token && persistLogin) || autoLogin){
                verifyRefreshToken()
                console.log('took effect')
            } 
        }

        return () => effectRan.current = true

    }, [])

    let content

  if(!token){
   content = <Outlet/>
  }else if(isLoading){
        content = <PulseLoader/>
    }else if(isError){
        console.log('error')
        content = (
            <p>
                your session has expired :(
                    <br/>
                <Link to={'/login'}>Please log in again...</Link>
            </p>
        )
    }else if(isSuccess && trueSuccess){
        content = <Outlet/>
    }else if(token && isUninitialized){
        console.log('session is still valid no need for refresh')
        content = <Outlet/>
    }

    return content
}

export default PersistLogin