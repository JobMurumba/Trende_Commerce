import axios from "axios";
import Cookie from 'js-cookie'
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";


export const newCategory = ({name})=>{

    let errors = {}
    if (name ==="") {
       

        return new Promise((resolve,reject)=>{
            errors={...errors,name:{msg:"category name is required"}}
            const response={
                fronterrors:errors
                
            }
            reject(response)
        })
        // return{
        //     response:{
        //         errors
        //         }
        //     }
    }

    if (Object.entries(errors).length===0){
        const token = Cookie.get('token')
       
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        
        return new Promise((resolve,reject) =>{
            axios.post(`${API_URL}/categories`,{name},config)
            .then(res=>{
               
                const response = {fronterrors:{},res:res}
                resolve(response)
            })
            .catch(error=>{
                const response = {fronterrors:{},error}
                console.log(error)
                reject(response)
                
            })
        })

   }

          
            
        
    

}

export const editCategory = (id,name) =>{
    const token = Cookie.get('token')
       
        const config = {

            headers:{
                "Content-Type":'application/json',
                Authorization:`Bearer ${token}`
            }
        }
    return new Promise((resolve,reject)=>{

        axios.put(`${API_URL}/categories/${id}`,{name:name},config)
        .then(res=>{
            
            resolve(res)
        })
        .catch(error=>{
            reject(error)
        })
    })
}