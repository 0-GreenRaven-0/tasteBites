import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import EditUserForm from './EditUserForm/EditUserForm'

const EditUser = () => {

    const {id} = useParams()

    const {user} = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        })
    })

    if(user){
        return <EditUserForm user={user}/>
    }else{
        return (
            <div>
                something went wrong...
            </div>
        )
    }
}

export default EditUser
