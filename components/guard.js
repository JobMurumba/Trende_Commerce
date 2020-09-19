import appContext from '../context/AppContext'
import {useContext,useEffect} from 'react'
import { useRouter } from 'next/router'

export function Protectoute(Component){
    return ()=>{
        const {user,isAuthenticated,loading} =useContext(appContext)

        const router = useRouter()

        useEffect(()=>{
            if(!isAuthenticated && !loading) router.push('/login') 
        },[loading,isAuthenticated])

        return (<Component {...arguments}/>)
    }
        
    
}