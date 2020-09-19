import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import {useState} from 'react';
import {Button,Input,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'
import { editSub} from '../../lib/subs'
import MultiSelect from 'react-multi-select-component';
const query = gql`
{
    subcategories{
    id
    name
    category{
        id
        name
    }
  }
  
}
  

`

function BrandList (props){
    function loadarray(array){

        let arrayloaded =[]
        array.forEach(category => {
            let temp={label:category.name,value:category.id}
            arrayloaded.push(temp)
        });
        return arrayloaded;
      }
      async function checkerrors(field,msg){
        const updateItem = (errors[field] = msg);
    
        //await setErrors({...errors,updateItem})
       await setEdit({...edit,errors:{...errors,updateItem}})
        return errors;
    
    
    }
    const  getcategories=()=>{
        const queryS= gql`
{
    categories{
        id
        name
    }
}

`
const {loading,error,data} = useQuery(queryS)
if (error) return <div>There was an error in retrieving categories</div>
if(loading) return <div>loading</div>
if (data.categories && data.categories.length){
    return data.categories
}else{
    return []
}

    }
   
    const {loading,error,data} = useQuery(query)
    const [edit,setEdit] = useState({
        id:"",
        name:"",
        newName:"",
        error:{name:"",categorySel:""},
    })
    const [isloading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const [save,setSave] = useState(true)
    const [dropdownOpen,setDropdownOpen] =useState(false);
    const toggle =() =>setDropdownOpen(prevState=>!prevState)
    const [dropdownOpen2,setDropdownOpen2] =useState(false);
    const toggle2 =() =>setDropdownOpen2(prevState=>!prevState)
    const [thepage,setPage] = useState(1)
    const [categorySel,setCategory] =  useState([])
    const [thedata,settheData] = useState(getcategories())
    const [errors,setErrors] =useState({
        name:"",
        categorySel:""
    })
    let totalpages;
    // const [page,setPage] = useState(0)
    if (error) console.log(error)
    if (error) return "error loading categories"
    if (loading) return "loading categories"
    function getdata(){
        let searchQuery = []
        if(data.subcategories && data.subcategories.length){
            const perPage = 5;
          
            const NumOfCategories = data.subcategories.length;
            
        if(NumOfCategories<(perPage)){
            totalpages = 1
        }else{
            totalpages = Math.ceil(NumOfCategories/perPage)
            // let tpage = NumOfCategories/perPage
            // console.log(tpage)
        }
       
        let startindex = (thepage-1)*perPage;
        let lastindex;
        if((startindex+(perPage-1))<NumOfCategories){

        
         lastindex = startindex + perPage;
        }else{
            lastindex=NumOfCategories-1
        }
        searchQuery = data.subcategories.filter(subcategory=>
            subcategory.name.toLowerCase().includes(props.search)
        )
        if(searchQuery.length>perPage){
            searchQuery = searchQuery.slice(startindex,lastindex)
        }


        }
       
        return searchQuery;
    }
    if(data.subcategories && data.subcategories.length){
    //     const perPage = 10;
    //    // const {page}  = props;
    //    const NumOfCategories = data.categories.length;
       
    //     let totalpages;
    //     if(NumOfCategories<11){
    //         totalpages = 1
    //     }else{
    //         totalpages = Math.round(NumOfCategories/perPage)
    //     }
       
    //     let startindex = props.page?(props.page-1)*10:0
    //     let lastindex = startindex + 9;
        
    //    // let searchQuery = data.categories
    //     let searchQuery = data.categories.filter(category=>
    //         category.name.toLowerCase().includes(props.search)
    //     )
        
    //     if(searchQuery.length>9){
    //         searchQuery = searchQuery.slice(startindex,lastindex)
    //     }
        
        function builder(){
            let array = []
            for(let i=1;i<=totalpages;i++){
               // if(thepage!==i)
               
                    array.push(i)
            }
            
            return array;
        }

        if(getdata().length>0){
    
            return (
            <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Page {thepage}
                </DropdownToggle>
                
                <DropdownMenu>
                   
                    {builder().length==1?
                    <DropdownItem >No other pages</DropdownItem>
                    :(
                        builder().map(num=>(
                            <DropdownItem key={num} hidden={thepage===num}
                             onClick={(e)=>{       
                            setPage(num)
                             }
                                }
                             >Page {num}</DropdownItem>
                                
                                
                            ))
                            
        
                            
                    )
                    }
                     
                </DropdownMenu>
            </Dropdown>
            
            <p>{success?"Sub category was edited successfully":""}</p>
            <p>{save?"":"There was an error in editing sub category"}</p>
        <table className="table table-hover">
      <thead>
        <tr>
          <th>Brand</th>
          <th>Category(s)</th>
          
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {
              getdata().map(brand=>(
             
            <tr key={brand.id}>
                {
                brand.id===edit.id?
                (
                    <React.Fragment>
                        
                        <td>
                      
                        
            <Input id={brand.id} value={edit.newName} 
            disabled={isloading}
             className={errors.name?"is-invalid":""}
             onKeyPress={(e)=>{
    
                errors.name?setErrors({...errors,name:""}):""
            
            }}
            onFocus={(e)=>{
    
                errors.name?setErrors({...errors,name:""}):""
            
            }}
            onChange={(e)=>setEdit({...edit,newName:e.target.value})}/>
            <p>Editing "{brand.name}"</p>
            <span className="error" >{errors.name && errors.name}</span>
                            </td>

                  
                            <td>
                            {
                                    (data &&  data.subcategories.length)?
                                    (
                                        <React.Fragment>


<Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                <DropdownToggle caret>
                    {categorySel.name?categorySel.name:"Select category"}
                </DropdownToggle>
                
                <DropdownMenu>
                   
                  
                       { data.subcategories.map(category=>(
                            <DropdownItem key={category.id} 
                             onClick={(e)=>{       
                            setCategory({id:category.id,name:category.name})
                             }
                            }
                                
                             >{category.name}</DropdownItem>
                                
                                
                            ))
                            
                            }
                   
                </DropdownMenu>
            </Dropdown>



                                                {/* <MultiSelect
                                        options = {loadarray(data.categories)}
                                        onChange = {setCategory}
                                        labelledBy={"Select a sub-category"}
                                        value={categorySel}
                                    
                                    /> */}
                                    <span className="error">{errors.categorySel && errors.categorySel} </span> 
                                        </React.Fragment>
                                        
                                    ):
                                    (<div>No available sub categories</div>)
                                }
                            </td>          
                <td style={{display:"flex"}}><Button
                onClick={e=>{
                    if(edit.newName==="" || Object.entries(categorySel).length===0) 
                    {
                        checkerrors("name","sub category name is required")
                            .then(checkerrors("categorySel","Please select Category(s)"))
                        //setEdit({...edit,error:"brand name is required"})
                    }else{
                        setLoading(true)
                        editSub(edit.id,edit.newName,categorySel)
                            .then(res=>{
                                setLoading(false)
                                setSuccess(true)
                                setSave(true)
                            }).catch(error=>{
                                setEdit({
                                    id:"",
                                    name:"",
                                    newName:"",
                                    error:{name:"",categorySel:""},
                                })
                                setLoading(false)
                            setSave(false)
                            })

                    }
                }}
                disabled={isloading}
                >{loading?"L":"S"}
                </Button>
                
                <Button 
                disabled={isloading}
                style={{marginLeft:"5px"}} onClick={e=>setEdit({id:"",name:"",newName:""})}>X</Button>
                </td>
                
                    </React.Fragment>
                    
                ):(
                    <React.Fragment>
                    <td>{brand.name}</td>
                     
                    <td>
                        {brand.name}
                                {/* <ul className="list-group">
                                {
                                    brand.categories.map(category=>(
                                        <li key={category.id}>{category.name}</li>
                                    ))
                                }
                                </ul> */}
                                
                            </td>
            <td><Button   onClick={(e)=>
                {
                setEdit({...edit,id:brand.id,name:brand.name})
                setErrors({...errors,name:"",categorySel:""})
            }
                }>Edit</Button></td>
                </React.Fragment>
                )
                }
                
            </tr>
              ))
          }
         
    </tbody>
    </table>
            </div>
            )
        }

    }else{
        return <div>No Sub-category Found</div>
    }

}

export default  BrandList;