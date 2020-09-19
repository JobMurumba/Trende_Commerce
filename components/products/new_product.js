import {Container,Row,Col,Button,Form,FormGroup,Input,Label} from 'reactstrap';
import {useState} from 'react';
import {newProduct} from '../../lib/products'
import  ProductList  from './index';
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
//import {TextEditor} from '../../components/text'
import {Editor,EditorState,RichUtils} from 'draft-js'
//import { MyEditor } from'../../components/text/thedraft'
//import  Editor  from '../../components/text/TextEditor'
import  Draft  from '../../components/text/draft'
//import  {MyEditor} from '../../components/text/thedraft'
import { getDescription } from 'graphql';

import dynamic from 'next/dynamic'
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

const DynamicComp= dynamic(
    ()=>import('../../components/text/thedraft'),{ssr:false}
)
function NewsubCategory (){
    const [product,setProduct] = useState({
        name:"",
        price:"",
        description:"",
        images:[],
    })
    const {loading,error,data} = useQuery(queryS)
    const [categorySel,setCategory] =  useState({id:"",name:"",subs:[],brands:[],
    sel:{brand:{id:"",name:""},sub:{id:"",name:""}}})
    const [isloading,setLoading] = useState(false)
    const [errors,setErrors] =useState({
        name:"",
        price:"",
        description:"",
        categorySel:""
    })
    const [success,setSuccess] = useState(false)
    const [query, updateQuery] = useState("");
    const [subcategories,setsubCategories] = useState([]);
    const [dropdownOpen,setDropdownOpen] =useState(false);
    const toggle =() =>setDropdownOpen(prevState=>!prevState)
    const [dropdownOpen3,setDropdownOpen3] =useState(false);
    const [dropdownOpen4,setDropdownOpen4] =useState(false);
    const toggle3 =() =>setDropdownOpen3(prevState=>!prevState)
    const toggle4 =() =>setDropdownOpen4(prevState=>!prevState)
    const [productAddOpen,setProductAdd] =useState(true)
    const toggleProductAdd =()=>setProductAdd(prevState=>!prevState)
    const [keyFileInput,setKeyFileInput] = useState(Math.random().toString(36))
  
   // const [editorState,setEditorState] = useState(()=>EditorState.createEmpty(),);
    
    if (error) return <div>There was an error in retrieving categories</div>
    if(loading) return <div>loading</div>
    
  
    const handleImageChange =e=>{
        //console.log(e.target.files)
        setProduct({...product,images:e.target.files})
    }
    function funAsButton(){
   // console.log(categorySel)
   
    newProduct(product,categorySel.id,categorySel.sel)
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
   
   function resetFileInput(){
    setKeyFileInput(Math.random().toString(36))
   }
    return(
        <Container>
            <Row>
                <Col xs="12" sm="12" md="2">
                    <br/>
                    <Button type="button" color="primary" onClick={e=>{
                        setSuccess(false)
                        toggleProductAdd()
                        resetFileInput();
            setErrors({name:"",description:"",price:""})
        
            setProduct({ ...product,name:"",description:"",price:"",images:[]})
           setCategory({...categorySel,id:"",name:"",subs:[],brands:[],
           sel:{brand:{id:"",name:""},sub:{id:"",name:""}}}) 
                    }
                        }>
                        Add Product
                    </Button>
                </Col>
            </Row>
            
            
            <Row hidden={productAddOpen} >

                <Col xs="12" sm="12" md={{size:8,offset:2}} >
                    
                    <Row>
                   <div className="paper">
                       <div className="header">
                           Add a new Product
                       </div>
                       <section className="wrapper">
                       <Form>
                        <fieldset disabled={isloading}>
                        <Row>
                <Col sm="12" md="6">
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
                        <span className="success">{success && "product was added"}</span>
                            </FormGroup>
                </Col>
                <Col sm="12" md="6">
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
                            <FormGroup>

                                {
                                    (data &&  data.categories.length)?
                                    (
                                        <React.Fragment>


<Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {categorySel.name?categorySel.name:"Select category"}
                </DropdownToggle>
                
                <DropdownMenu>
                   
                  
                       { data.categories.map(category=>(
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

            


                                                {/* <MultiSelect
                                        options = {loadarray(data.categories)}
                                        onChange = {setCategory}
                                        labelledBy={"Select a sub-category"}
                                        value={categorySel}
                                    
                                    /> */}
                                    <span className="error">{!categorySel.name && errors.categorySel && errors.categorySel} </span> 
                                        </React.Fragment>
                                        
                                    ):
                                    (<div>No available sub categories</div>)
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

                            {/* <MyEditor/> */}
                            <DynamicComp theClick={funAsButton}  
                            sendDesc={getDescription} 
                            msg={errors.description}
                           
                            />
                            {/* <span className="error" >{errors && errors.description && errors.description}</span> */}
                              {/* <Draft theClick={funAsButton}  sendDesc={getDescription}/> */}
                            {/* <FormGroup>
                                <Button color="primary" 
                                className="btn-block"
                                disabled={isloading}
                                onClick={e=>{
                                    console.log(categorySel)
                                    newProduct(product.name,categorySel.id,categorySel.sel)
                                        .then(res=>{
                                            //pass
                                            setErrors({name:""})
                                            setSuccess(true)
                                            setsubCategory({name:""})
                                        })
                                        .catch(error=>{
                                        if(Object.entries(error.fronterrors).length !=0){
                                         setErrors({...errors,
                                            name:error.fronterrors.name,
                                            categorySel:error.fronterrors.categorySel})

                                            }

                                            
                                        })
                                    
                                }}
                                >Save</Button>
                            </FormGroup> */}
                        </fieldset>
                    </Form>
                       </section>
                   
                   </div>
                   </Row>
                </Col>
                
               
            </Row>
            <Row >
                <Col xs="12" sm="12" md="12">
                <div className="paper">
                <div className="header">
                Product List
                </div>
                <section className="wrapper">
                     <ProductList search={query}/>         
               
                </section>
               
                
                </div>
                </Col>
            </Row>
        <style jsx>
            {
                `
                .paper {
                    border: 1px solid lightgray;
                    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                      0px 2px 1px -1px rgba(0, 0, 0, 0.12);
                    border-radius: 6px;
                    margin-top: 30px;
                  }
                  .header {
                    text-align:center;
                    color:white;
                    font-weight:800;
                    font-size:20px;
                    width: 100%;
                    height: 40px;
                    background-color: #2196f3;
                    margin-bottom: 5px;
                    border-radius-top: 6px;
                  }
                  .wrapper {
                    padding: 10px 30px 20px 30px !important;
                  }
                  .error{
                      color:red;
                     
                  }

                  .editorContainer{
                    border:1px solid blue;
                    background-color:black;
                    width: 100%;
                     }

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
        </Container>
        
    )
}

export default NewsubCategory;