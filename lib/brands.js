import axios from "axios";
import Cookie from 'js-cookie'
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

function arraybuilder(data){
    let array =[]
    data.forEach(category=>{
        array.push((category.value))
    })
    return array;
}
export const newBrand = (name,categorySel)=>{

//console.log(arraybuilder(categorySel))

    let errors = {}
    if(Object.entries(categorySel).length===0){
        errors={...errors,categorySel:"Please select category(s)"}
    }
    if (name ==="") {
       

        return new Promise((resolve,reject)=>{
            errors={...errors,name:{msg:"brand name is required"}}
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
            axios.post(`${API_URL}/brands`,{name:name,categories:arraybuilder(categorySel)},config)
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

export const editBrand = (id,name,categories) =>{
    
    const token = Cookie.get('token')
       
        const config = {

            headers:{
                "Content-Type":'application/json',
                Authorization:`Bearer ${token}`
            }
        }
    return new Promise((resolve,reject)=>{

        axios.put(`${API_URL}/brands/${id}`,{name:name,categories:arraybuilder(categories)},config)
        .then(res=>{
            
            resolve(res)
        })
        .catch(error=>{
            reject(error)
        })
    })
}