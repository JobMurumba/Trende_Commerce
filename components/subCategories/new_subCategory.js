import {Container,Row,Col,Button,Form,FormGroup,Input,Label} from 'reactstrap';
import {useState} from 'react';
import {newSub} from '../../lib/subs'
import  SubList  from './index';
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import MultiSelect from 'react-multi-select-component';

const queryS= gql`
{
    categories{
        id
        name
    }
}

`
function NewsubCategory (){
    const [subCategory,setsubCategory] = useState({
        name:""
    })
    const {loading,error,data} = useQuery(queryS)
    const [categorySel,setCategory] =  useState({id:"",name:""})
    const [isloading,setLoading] = useState(false)
    const [errors,setErrors] =useState({
        name:"",
        categorySel:""
    })
    const [success,setSuccess] = useState(false)
     const [query, updateQuery] = useState("");
    const [subcategories,setsubCategories] = useState([]);
    const [dropdownOpen,setDropdownOpen] =useState(false);
    const toggle =() =>setDropdownOpen(prevState=>!prevState)
    if (error) return <div>There was an error in retrieving categories</div>
    if(loading) return <div>loading</div>
    
    // function updateCat(data){
    //     console.log(data)
    //     setCategories(data)
    //     return data
        
    // }
    function loadarray(array){

        let arrayloaded =[]
        array.forEach(category => {
            let temp={label:category.name,value:category.id}
            arrayloaded.push(temp)
        });
        return arrayloaded;
      }
    return(
        <Container>
            <Row >
                <Col xs="12" sm="12" md={{size:5}} >

                   <div className="paper">
                       <div className="header">
                           Add a new sub category
                       </div>
                       <section className="wrapper">
                       <Form>
                        <fieldset disabled={isloading}>
                            <FormGroup>
                                <Label>Sub-category Name</Label>
                                <Input 
                                onChange={(e) =>{
                                    setsubCategory({...subCategory,name:e.target.value})
                                   
                                }}
                                disabled={isloading}
                                className={errors.name?"is-invalid":""}
                                onKeyPress={(e)=>{
                                
                                    errors.name?setErrors({...errors,name:""}):""
                                
                                }}
                               
                                value={subCategory.name}
                                style={{height:50,fontSize:"1.2rem"}}
                                />
                                
                        <span className="error" >{errors && errors.name && errors.name.msg}</span>
                        <span className="success">{success && "sub-category was added"}</span>
                            </FormGroup>
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
                                    <span className="error">{!categorySel.name && errors.categorySel && errors.categorySel} </span> 
                                        </React.Fragment>
                                        
                                    ):
                                    (<div>No available sub categories</div>)
                                }
                            
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" 
                                className="btn-block"
                                disabled={isloading}
                                onClick={e=>{
                                    newSub(subCategory.name,categorySel.id)
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
                            </FormGroup>
                        </fieldset>
                    </Form>
                       </section>
                   
                   </div>
                </Col>
                
                <Col xs="12" sm="12" md="7">
                <div className="paper">
                <div className="header">
                Sub-category List
                </div>
                <section className="wrapper">
                          <SubList search={query}/>        
               
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
                `
            }
        </style>
        </Container>
    )
}

export default NewsubCategory;