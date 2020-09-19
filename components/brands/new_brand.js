import {Container,Row,Col,Button,Form,FormGroup,Input,Label} from 'reactstrap';
import {useState} from 'react';
import {newBrand} from '../../lib/brands'
import  BrandList  from './index';
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
function NewBrand (){
    const [brand,setBrand] = useState({
        name:""
    })
    const {loading,error,data} = useQuery(queryS)
    const [categorySel,setCategory] =  useState([])
    const [isloading,setLoading] = useState(false)
    const [errors,setErrors] =useState({
        name:"",
        categorySel:""
    })
    const [success,setSuccess] = useState(false)
    const [query, updateQuery] = useState("");
    const [categories,setCategories] = useState([]);
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
                           Add a new category
                       </div>
                       <section className="wrapper">
                       <Form>
                        <fieldset disabled={isloading}>
                            <FormGroup>
                                <Label>Brand Name</Label>
                                <Input 
                                onChange={(e) =>{
                                    setBrand({...brand,name:e.target.value})
                                   
                                }}
                                disabled={isloading}
                                className={errors.name?"is-invalid":""}
                                onKeyPress={(e)=>{
                                
                                    errors.name?setErrors({...errors,name:""}):""
                                
                                }}
                               
                                value={brand.name}
                                style={{height:50,fontSize:"1.2rem"}}
                                />
                                
                        <span className="error" >{errors && errors.name && errors.name.msg}</span>
                        <span className="success">{success && "category was added"}</span>
                            </FormGroup>
                            <FormGroup>

                                {
                                    (data &&  data.categories.length)?
                                    (
                                        <React.Fragment>
                                                <MultiSelect
                                        options = {loadarray(data.categories)}
                                        onChange = {setCategory}
                                        labelledBy={"Select a category"}
                                        value={categorySel}
                                    
                                    />
                                    <span className="error">{errors.categorySel && errors.categorySel} </span> 
                                        </React.Fragment>
                                        
                                    ):
                                    (<div>No available categories</div>)
                                }
                            
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" 
                                className="btn-block"
                                disabled={isloading}
                                onClick={e=>{
                                    newBrand(brand.name,categorySel)
                                        .then(res=>{
                                            //pass
                                            setErrors({name:"",categorySel:""})
                                            setSuccess(true)
                                            setBrand({name:"",categorySel:[]})
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
                Brand List
                </div>
                <section className="wrapper">
                          <BrandList search={query}/>       
               
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

export default NewBrand;