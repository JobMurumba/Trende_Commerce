import {Container,Row,Col,Button,Form,FormGroup,Input,Label} from 'reactstrap';
import {useState} from 'react';
import {newCategory} from '../../lib/categories'
import  CategoryList  from './index';
const NewCategory = ()=>{
    const [category,setCategory] = useState({
        name:""
    })
    const [loading,setLoading] = useState(false)
    const [errors,setErrors] =useState({
        name:"",
    })
    const [success,setSuccess] = useState(false)
    const [query, updateQuery] = useState("");
    return(
        <Container>
            <Row >
                <Col xs="12" sm="12" md={{size:5}} >

                   <div className="paper">
                       <div className="header">
                           Add a new category
                       </div>
                       <section className="wrapper">
                       <Form>
                        <fieldset disabled={loading}>
                            <FormGroup>
                                <Label>Category Name</Label>
                                <Input 
                                onChange={(e) =>{
                                    setCategory({...category,name:e.target.value})
                                   
                                }}
                                disabled={loading}
                                className={errors.name?"is-invalid":""}
                                onKeyPress={(e)=>{
                                
                                    errors.name?setErrors({...errors,name:""}):""
                                
                                }}
                               
                                value={category.name}
                                style={{height:50,fontSize:"1.2rem"}}
                                />
                                
                        <span className="error" >{errors && errors.name && errors.name.msg}</span>
                        <span className="success">{success && "category was added"}</span>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" 
                                className="btn-block"
                                disabled={loading}
                                onClick={e=>{
                                    newCategory(category)
                                        .then(res=>{
                                            //pass
                                            setErrors({name:""})
                                            setSuccess(true)
                                            setCategory({name:""})
                                        })
                                        .catch(error=>{
                                        if(Object.entries(error.fronterrors).length !=0){
                                         setErrors({...errors,name:error.fronterrors.name})
                                            }

                                            
                                        })
                                    //setLoading(true)
                                    //const response= newCategory(category).response
                                    
                                    // if(Object.entries(response.errors).length !=0){
                                    //     setErrors({...errors,name:response.errors.name})
                                    // }
                                   
                                   // setLoading(false)
                                   
                                  // console.log(newCategory(category).response.errors.name)
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
                Category List
                </div>
                <section className="wrapper">
                         <CategoryList search={query}/>       
               
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

export default NewCategory;