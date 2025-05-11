import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

// the basic query for accessing our backend server
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://tastebites-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token

        if(token){
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
   
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 403){
        console.log('sending the refersh token')

        const refeshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refeshResult?.data){
            api.dispatch(setCredentials({...refeshResult.data}))

            result = await baseQuery('auth/refresh', api, extraOptions)
        }else{
            if(refeshResult?.error?.status === 403){
                refeshResult.error.data.message = "your login session has expired"
            }

            return refeshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User','Recipe','Review', 'UserImg'],
    endpoints: builder => ({})
})

