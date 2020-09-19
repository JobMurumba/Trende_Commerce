import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

import {useState} from 'react'
import MultiSelect from 'react-multi-select-component';
const query = gql`
{
    categories{
        id
        name
    }
}

`

function CategoriesSelect(props){
    const {loading,error,data} = useQuery(query)
    const [isOpen,setIsOpen] =useState(false)
    const [categorySel,setCategory] =  useState([])
    const toggle =()=>setIsOpen(prevstate=>!prevstate)
    if (error) return <div>There was an error in retrieving categories</div>
    if(loading) return <div>loading</div>
    

      function loadarray(array){

        let arrayloaded =[]
        array.forEach(category => {
            let temp={label:category.name,value:category.id}
            arrayloaded.push(temp)
        });
        return arrayloaded;
      }
    if(data &&  data.categories.length){

        
        return(
            <div>
                 <MultiSelect
                    options = {loadarray(data.categories)}
                    onChange = {setCategory}
                    labelledBy={"Select a category"}
                    value={categorySel}
                
                /> 
                <button type="button" onClick={
                    (e)=>props.senddata(categorySel)
                }>value</button> 
               
            </div>
            

        )
    }
}

export default CategoriesSelect