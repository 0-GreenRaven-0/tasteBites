import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'


const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if(token){
        const decoded = jwtDecode(token)
        const {id, username, email, profilePicture, description, darkMode} = decoded.UserInfo
        return {id, username, email, darkMode}
    }

    return {id: undefined, username: '', email: '', profilePicture: '', description: '', darkMode: false }
}

export default useAuth
