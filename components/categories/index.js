import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import {useState} from 'react';
import {Button,Input,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'
import {editCategory} from '../../lib/categories'

const query = gql`
{
    categories{
    id
    name
  }
  
}
  

`

function CategoryList (props){

   
    const {loading,error,data} = useQuery(query)
    const [edit,setEdit] = useState({
        id:"",
        name:"",
        newName:"",
        error:"",
    })
    const [isloading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const [save,setSave] = useState(true)
    const [dropdownOpen,setDropdownOpen] =useState(false);
    const toggle =() =>setDropdownOpen(prevState=>!prevState)
    const [thepage,setPage] = useState(1)
    let totalpages;
    // const [page,setPage] = useState(0)
    if (error) console.log(error)
    if (error) return "error loading categories"
    if (loading) return "loading categories"
    function getdata(){
        let searchQuery = []
        if(data.categories && data.categories.length){
            const perPage = 5;
          
            const NumOfCategories = data.categories.length;
            
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
        searchQuery = data.categories.filter(category=>
            category.name.toLowerCase().includes(props.search)
        )
        if(searchQuery.length>perPage){
            searchQuery = searchQuery.slice(startindex,lastindex+1)
        }


        }
        return searchQuery;
    }
    if(data.categories && data.categories.length){
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
            
            <p>{success?"category was edited successfully":""}</p>
            <p>{save?"":"There was an error in editing category"}</p>
        <table className="table table-hover">
      <thead>
        <tr>
          <th>Categoryname</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {
              getdata().map(category=>(
             
            <tr key={category.id}>
                {
                category.id===edit.id?
                (
                    <React.Fragment>
                        
                        <td>
                      
                        
            <Input id={category.id} value={edit.newName} 
            disabled={isloading}
             className={edit.error?"is-invalid":""}
             onKeyPress={(e)=>{
    
                edit.error?setEdit({...edit,error:""}):""
            
            }}
            onFocus={(e)=>{
    
                edit.error?setEdit({...edit,error:""}):""
            
            }}
            onChange={(e)=>setEdit({...edit,newName:e.target.value})}/>
            <p>Editing "{category.name}"</p>
            <span className="error" >{edit.error && edit.error}</span>
                            </td>
                <td style={{display:"flex"}}><Button
                onClick={e=>{
                    if(edit.newName==="") 
                    {
                        setEdit({...edit,error:"category name is required"})
                    }else{
                        setLoading(true)
                        editCategory(edit.id,edit.newName)
                            .then(res=>{
                                setLoading(false)
                                setSuccess(true)
                                setSave(true)
                                setEdit(
                                    { id:"",
                                    name:"",
                                    newName:"",
                                    error:"",}
                                )
                            }).catch(error=>{
                            setSave(false)
                            setLoading(false)
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
                    <td>{category.name}</td>
            <td><Button   onClick={(e)=>setEdit({...edit,id:category.id,name:category.name})}>Edit</Button></td>
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
        return <div>No Categories Found</div>
    }

}

export default  CategoryList;