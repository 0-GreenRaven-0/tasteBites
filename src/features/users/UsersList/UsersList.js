import { useGetUsersQuery} from '../usersApiSlice'
import {BarLoader} from 'react-spinners'
import SearchBar from '../../../components/Utility/SearchBar/SearchBar'
import User from '../User/User'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import Theme from '../../../components/Utility/Theme/Theme'
import './UsersList.css'

const UsersList = () => {

    const navigate = useNavigate()

    const {id: userId} = useAuth()

    let content
    
    const [search, setSearch] = useState('')

    const {
      data: users,
      isSuccess,
      isLoading,
      isError,
      error
    } = useGetUsersQuery('usersList',{
       pollingInterval: 60000,
       refetchOnMountOrArgChange: true,
       refetchOnFocus: true
    })

    if(isLoading){
        return <BarLoader/>
    }

    if(isError){
        content = (
            <>
             <p>an error has occured...</p>
             <p>{error?.data?.message}</p>
             </>
        )
    }

    if (isSuccess) {
      content = (
        <div className='user-explore-page'>
          <div className='explore-page-header'>
            <button className='back-btn' onClick={() => {
              navigate('/')
            }}>Go Back</button>
            <Theme/>
          </div>
          <div className='explore-page-content'>
          <SearchBar search={search} setSearch={setSearch}/>

           <div className='users-list-container'>
             <ul className='users-list'>
                {Object.values(users.entities).filter((user) => {
                    return search.toLocaleLowerCase() === '' ? user : user.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                }).filter(user => user.id !== userId)
                .map((user) => (
                    <li key={user.id}>
                       <User user={user}/>
                    </li>
                ))}
            </ul>
           </div>
         
          </div>
        </div>
      )
    }

  return content
}

export default UsersList
