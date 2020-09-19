import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import {useState,useRef,createRef} from 'react';
import {Form,FormGroup,Label,Row,Col,Button,Input,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'
import { editProduct} from '../../lib/products'
import Modal from '../shared/modal'
import dynamic from 'next/dynamic'
const query = gql`
{
    products{
    id
    name
    price
    description
    category{
        id
        name
    }
    brand{
        id
        name
    }
    subcategory{
        id
        name
    }
  }
  
}
  

`

const DynamicComp= dynamic(
    ()=>import('../../components/text/thedraft'),{ssr:false}
)


function ProductList (props){


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
                brands{
                    id
                    name
                }
                subcategories{
                    id
                    name
        
                }
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
    const [dropdownOpen3,setDropdownOpen3] =useState(false);
    const [dropdownOpen4,setDropdownOpen4] =useState(false);
    const toggle3 =() =>setDropdownOpen3(prevState=>!prevState)
    const toggle4 =() =>setDropdownOpen4(prevState=>!prevState)
    const [thepage,setPage] = useState(1)
    const [keyFileInput,setKeyFileInput] = useState(Math.random().toString(36))
    
   // const [categorySel,setCategory] =  useState([])
    const [thedata,settheData] = useState(getcategories())
    const [errors,setErrors] =useState({
        name:"",
        categorySel:""
    })
    const [modal,setModal] = useState(false)
    const toggleModal = ()=>setModal(!modal)

    //product edit vars
    const [product,setProduct] = useState({
        id:"",
        name:"",
        price:"",
        description:"",
        images:[],
    })
    const [categorySel,setCategory] =  useState({id:"",name:"",subs:[],brands:[],
    sel:{brand:{id:"",name:""},sub:{id:"",name:""}}})
    //const [thedata,settheData] = useState([])

    let totalpages;
    // const [page,setPage] = useState(0)
    if (error) console.log(error)
    if (error) return "error loading categories"
    if (loading) return "loading categories"
    function getdata(){
        let searchQuery = []
        if(data.products && data.products.length){
            const perPage = 5;
          
            const NumOfCategories = data.products.length;
            
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
        searchQuery = data.products.filter(subcategory=>
            subcategory.name.toLowerCase().includes(props.search)
        )
        if(searchQuery.length>perPage){
            searchQuery = searchQuery.slice(startindex,lastindex)
        }


        }
       
        return searchQuery;
    }

    function resetFileInput(){
        setKeyFileInput(Math.random().toString(36))
       }
     function funAsButton(){
        // console.log(categorySel)
       
         // await setProduct({...product,images:images_upload.current.files});
         editProduct(product,categorySel.id,categorySel.sel)
             .then(res=>{
                 //pass
                 resetFileInput();
                 setErrors({name:"",description:"",price:""})
                 setSuccess(true)
                 setProduct({ ...product,name:"",description:"",price:"",images:[]})
                setCategory({...categorySel,id:"",name:"",subs:[],brands:[],
                sel:{brand:{id:"",name:""},sub:{id:"",name:""}}}) 
             })
             .catch(error=>{
             
             if(error && error.fronterrors && Object.entries(error.fronterrors).length !=0){
              setErrors({...errors,
                 name:error.fronterrors.name,
                 price:error.fronterrors.price,
                 description:error.fronterrors.description,
                 categorySel:error.fronterrors.categorySel})
     
                 }
     
                 
             })
        }
     
        function getDescription(data){
            setProduct({...product,description:data})
        }
        
    

    const handleImageChange =e=>{
        //console.log(e.target.files)
        setProduct({...product,images:e.target.files})
    }
    if(data.products && data.products.length){
    
        
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
          <th>Product</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category(s)</th>
          <th>Sub Category</th>
          
          
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          
      {
              getdata().map(brand=>(
             
            <tr key={brand.id}>
                
                    <React.Fragment>
                    <td>{brand.name}</td>
                    <th>{brand.brand.name}</th> 
                     <th>{brand.price}</th>
                      
                    <td dangerouslySetInnerHTML={{__html:brand.description}}>
                        {/* {brand.description} */}
                
                                
                            </td>
                            <td>{brand.category.name}</td>
                            <td>{brand.subcategory.name}</td> 
            <td><Button   onClick={(e)=>
                {
                    //console.log(thedata.categories)
                    toggleModal()
                    setProduct({...product,id:brand.id,name:brand.name, description:brand.description,
                        price:brand.price})
                    setCategory(
                        {id:brand.category.id,name:brand.category.name,subs:[],brands:[],
                           
                        sel:{brand:{id:brand.brand.id,name:brand.brand.name},sub:{id:brand.subcategory.id,name:brand.subcategory.name}}}  
                    )
                    setSuccess(false)
                // setEdit({...edit,id:brand.id,name:brand.name})
                // setErrors({...errors,name:"",categorySel:""})
            }
                }>Edit</Button></td>
                </React.Fragment>
                
                
            </tr>
              ))
          }
    </tbody>
    </table>
    <Modal isOpen={modal} toggle={toggleModal} title="Edit Product">
          <Row>
              <Col sm="6">
              <FormGroup>
                                <Label>Product Name</Label>
                                <Input 
                                onChange={(e) =>{
                                    setProduct({...product,name:e.target.value})
                                   
                                }}
                                disabled={isloading}
                                className={errors.name?"is-invalid":""}
                                onKeyPress={(e)=>{
                                
                                    errors.name?setErrors({...errors,name:""}):""
                                
                                }}
                               
                                value={product.name}
                                style={{height:50,fontSize:"1.2rem"}}
                                />
                                
                        <span className="error" >{errors && errors.name && errors.name.msg}</span>
                        <span className="success">{success && "product was edited"}</span>
                            </FormGroup>

              </Col>
              <Col sm="6">


              <FormGroup>
                                <Label>Product Price</Label>
                                <Input  type="number"
                                onChange={(e) =>{
                                    setProduct({...product,price:e.target.value})
                                   
                                }}
                                disabled={isloading}
                                className={errors.price?"is-invalid":""}
                                onKeyPress={(e)=>{
                                
                                    errors.price?setErrors({...errors,price:""}):""
                                
                                }}
                               
                                value={product.price}
                                style={{height:50,fontSize:"1.2rem"}}
                                />
                                
                        <span className="error" >{errors && errors.price && errors.price}</span>
                       
                            </FormGroup>

              </Col>
          </Row>
          <Row >
              <Col sm="12">
                  <label className="fileupload">
                  <Input type="file" hidden={true}  key={keyFileInput} onChange={handleImageChange}  multiple/>
                  {product.images.length? `${product.images.length} image(s) uploaded`: "upload image(s)"} 
                  </label>
                  
              </Col>
          </Row>
          <Row>
              <Col sm="12">
              <div className="paper1">
                      
                       <section className="wrappernone">
                       <Form>
                        <fieldset disabled={isloading}>
                        

                           
                            
                            <FormGroup>
                               
{
    (thedata &&  thedata.length)?
    (
        <React.Fragment>


<Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
<DropdownToggle caret>
{categorySel.name?categorySel.name:"Select category"}
</DropdownToggle>

<DropdownMenu>


{ thedata.map(category=>(
<DropdownItem key={category.id} 
onClick={(e)=>{   

setCategory({id:category.id,name:category.name,subs:category.subcategories,
brands:category.brands })

}
}

>{category.name}</DropdownItem>


))

}

</DropdownMenu>
</Dropdown>

    <span className="error">{!categorySel.name && errors.categorySel && errors.categorySel} </span> 
        </React.Fragment>
        
    ):
    (<div>No available categories</div>)
}

</FormGroup>


{categorySel.subs && categorySel.subs.length?
                        (

                            <FormGroup>
                <Dropdown  isOpen={dropdownOpen3} toggle={toggle3}>
                <DropdownToggle caret>
                {categorySel.sel && categorySel.sel.sub?categorySel.sel.sub.name:"Select Sub-category"}
                </DropdownToggle>
                <DropdownMenu>
                        

                           { categorySel.subs.map(subcat=>(
                                <DropdownItem key={subcat.id}
                                onClick={e=>{
                                    setCategory({...categorySel,sel:{...categorySel.sel,
                                        sub:
                                        {
                                        id:subcat.id,
                                        name:subcat.name 
                    
                                        }
                                        
                                    }})
                                }}
                                >{subcat.name}</DropdownItem>
                            ))
                           }
                </DropdownMenu>
            </Dropdown>

                            </FormGroup>
                            )
                        :"" 
                            }

{categorySel.brands && categorySel.brands.length?
                        (

                            <FormGroup>
                <Dropdown  isOpen={dropdownOpen4} toggle={toggle4}>
                <DropdownToggle caret>
                {categorySel.sel && categorySel.sel.brand?categorySel.sel.brand.name:"Select Brand"}
                </DropdownToggle>
                <DropdownMenu
                >
                        

                           { categorySel.brands.map(subcat=>(
                                <DropdownItem key={subcat.id}
                                
                                onClick={e=>{
                                    setCategory({...categorySel,sel:{...categorySel.sel,
                                        brand:
                                        {
                                        id:subcat.id,
                                        name:subcat.name 
                    
                                        }
                                        
                                    }})
                                }}

                                
                                >{subcat.name}</DropdownItem>
                            ))
                           }
                </DropdownMenu>
            </Dropdown>

                            </FormGroup>
                            )
                        :"" 
                            }
                            <FormGroup>
                                <h1 className="h5"><strong><u>current description</u></strong></h1>
                          <div  dangerouslySetInnerHTML={{__html:product.description}}></div>
                            </FormGroup>
                        <DynamicComp theClick={funAsButton}  
                            sendDesc={getDescription} 
                            msg={errors.description}
                           
                            />

                        </fieldset>
                        </Form>
                        </section>
                        </div>
                        
              </Col>
          </Row>



    </Modal>
    <style jsx>
        {
            `
            .fileupload{
                border:1px dashed #BBB;
                display:inline-block;
                padding:8px 12px;
                cursor:pointer;
                color:white;
                background-color:blue;
                -webkit-border-radius:5px;
                -moz-border-radius:5px;
            }
            `
        }
    </style>
            </div>
            )
        }

    }else{
        return <div>No Sub-category Found</div>
    }

}

export default  ProductList;