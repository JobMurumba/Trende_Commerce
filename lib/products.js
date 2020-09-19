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

function htmltotext(data){
    let ses=data.toString();
    return ses.replace(/<[^>]*(>|$)|&nbsp;&zwnj;|&raquo;|@laquo;|&gt;/g,'')
  }
export const newProduct = async (product,categorySel,selecteds={sub:{id:"",name:""},brand:{id:"",name:""}})=>{

//console.log(arraybuilder(categorySel))
let errors = {}
if(categorySel===""){
    errors={...errors,categorySel:"Please select category"}
}

if (product.name ==="" || htmltotext(product.description).trim()==""
 || categorySel=="" || product.price==="") {
   
    if (htmltotext(product.description)===""){
        errors={...errors,description:"product description is required"}
    }
    if(product.price ===""){
        errors={...errors,price:"product price is required"}
    }
    return new Promise((resolve,reject)=>{
      if (product.name==="")  errors={...errors,name:{msg:"product name is required"}}
        const response={
            fronterrors:errors
            
        }
        reject(response)
    })
    
}

if (Object.entries(errors).length===0){
   
    const token = Cookie.get('token')
   
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        },
        'Content-Type':"multipart/form-data"
    }
 
    let formdata;
  formdata = await formData(
        product,categorySel,selecteds
    )
    
        
        // const body= {
        //     name:product.name,
        //     price:product.price,
        //     description:product.description,
        //     category:categorySel,
        //     brand:selecteds.brand.id?selecteds.brand.id:"",
        //     subcategory:selecteds.sub.id?selecteds.sub.id:""
        // }
        return new Promise((resolve,reject) =>{
            axios.post(`${API_URL}/products`,formdata,config)
            .then(res=>{
                const response = {fronterrors:{},res:res}
                resolve(response)
            })
            .catch(error=>{
                const response = {fronterrors:{},error}
               
                reject(response)
                
            })
        })

   }

          
            
        
    

}
async function formData(product,categorySel,selecteds={sub:{id:"",name:""},brand:{id:"",name:""}}){
//console.log(product)

   if (typeof window === "undefined") {
    return;
  }
    const formdata = new FormData()
    //console.log(formData)

    const data ={}
    
    data['name'] = product.name
    data['price'] =product.price
    data['description'] = product.description
    data['category'] = categorySel

    data['brand'] =selecteds. brand.id?selecteds.brand.id:""
    data['subcategory'] = selecteds.sub.id?selecteds.sub.id:""

    //console.log(data)
    // formdata.append('name',product.name)
    
    // formdata.append('price',product.price)
    // formdata.append('description',product.description)
    
    // formdata.append('category',categorySel)
    
    // formdata.append('brand',selecteds. brand.id?selecteds.brand.id:"")
    
    // formdata.append('subcategory',selecteds.sub.id?selecteds.sub.id:"")
    let images = product.images
    //console.log(images)
    if(images.length){
        for(let i=0;i<images.length;i++){
            //console.log(images[i])
         //formdata.append(`files.${images[i].name}`,images[i],images[i].name)
         formdata.append('files.images',images[i])
        }
        // images.forEach(image=>{
        //     formdata.append('images[]',image)
        // })
    }
   formdata.append('data',JSON.stringify(data))
    for (var key of formdata.entries()){
        //console.log(key[0],key[1])
    }
    return formdata
}
export const editProduct = async (product,categorySel,selecteds={sub:{id:"",name:""},brand:{id:"",name:""}}) =>{
    // console.log(product.images)
    let errors = {}
    if(categorySel===""){
        errors={...errors,categorySel:"Please select category"}
    }
    
    if (product.name ==="" || htmltotext(product.description).trim()==""
     || categorySel=="" || product.price==="") {
       
        if (htmltotext(product.description)===""){
            errors={...errors,description:"product description is required"}
        }
        if(product.price ===""){
            errors={...errors,price:"product price is required"}
        }
        return new Promise((resolve,reject)=>{
          if (product.name==="")  errors={...errors,name:{msg:"product name is required"}}
            const response={
                fronterrors:errors
                
            }
            reject(response)
        })
        
    }

    if (Object.entries(errors).length===0){
       
        const token = Cookie.get('token')
       
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            },
            'Content-Type':"multipart/form-data"
        }
     
        let formdata;
      formdata = await formData(
            product,categorySel,selecteds
        )
        
 for (var key of formdata.entries()){
     
        //console.log(key[0],key[1])
    }

       
        // const body= {
        //     name:product.name,
        //     price:product.price,
        //     description:product.description,
        //     category:categorySel,
        //     brand:selecteds.brand.id?selecteds.brand.id:"",
        //     subcategory:selecteds.sub.id?selecteds.sub.id:""
        // }

    return new Promise((resolve,reject)=>{

        axios.put(`${API_URL}/products/${product.id}`,formdata,config)
        .then(res=>{
            console.log(res)
            resolve(res)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
}