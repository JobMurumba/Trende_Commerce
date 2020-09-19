import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {userLogin} from '../lib/auth'
import AppContext from "../context/AppContext";
function LoginView(props){
    const [credentials,setCredentials] = useState({
        username:"",
        password:""
    })
    const [errors,setErrors]=useState({
        username:"",
        password:"",
        login:"",
    })
const router = useRouter();
  const appContext = useContext(AppContext);
  async function checkerrors(field,msg){
    const updateItem = (errors[field] = msg);

    await setErrors({...errors,updateItem})
    return errors;
}
  useEffect(() => {
    if (appContext.isAuthenticated) {
     router.push("/"); // redirect if you're already logged in
    }
    //router.prefetch('/categories')
  }, []);
    return(
        <Container>
            <Row>
                <Col xm="12" sm="12" md={{size:5,offset:3}}>
                    <div className="paper">
                        <div className="header">
                            <u><i>Trender</i></u> Login
                        </div>
                        <section className="wrapper">
                            <Form>
                                <fieldset>
                                    <FormGroup>
                                        <Label>Username</Label>
                                        <Input
                                        style={{height:50,fontSize:"1.2rem"}}
                                        className={errors.username?"is-invalid":""}
                                         onKeyPress={(e)=>{
                                
                                            errors.username?setErrors({...errors,username:""}):""
                                        
                                        }}
                                        onFocus={(e)=>{
                                
                                            errors.username?setErrors({...errors,username:""}):""
                                        
                                        }}
                                        onChange={e=>{
                                            setCredentials({...credentials,username:e.target.value})
                                        }}
                                        />
                                          <span className="error" >{errors && errors.username}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input
                                        type="password"
                                         style={{height:50,fontSize:"1.2rem"}}
                                         className={errors.password?"is-invalid":""}
                                         onKeyPress={(e)=>{
                                
                                            errors.password?setErrors({...errors,password:""}):""
                                        
                                        }}
                                        onFocus={(e)=>{
                                
                                            errors.password?setErrors({...errors,password:""}):""
                                        
                                        }}
                                         
                                         onChange={e=>{
                                            setCredentials({...credentials,password:e.target.value})
                                        }}/>
                                        <span className="error" >{errors && errors.password}</span>
                                    </FormGroup>
                                    <span className="error">{errors && errors.login}</span>
                                    <FormGroup>
                                    <Button 
                                    className="btn-block"
                                    color="primary"
                                    
                                    onClick={e=>{
                                    
                                        if (credentials.username.trim().length<5 || credentials.password.trim().length<8){
                                            
                                            checkerrors("username","please provide a valid username")
                                            .then(errors=>{
                                                checkerrors("password","please provide a valid email")
                                            })
                                                
                                                   
                                            //if(credentials.username.length<5) setErrors({...errors,username:"please enter a valid username"})
                                            //if(credentials.password.length<8) setErrors({...errors,password:"please enter a valid password"})
                                        }else{
                                        
                                            userLogin(credentials)
                                                .then(res=>{
                                                  // console.log(res)
                                                   appContext.setUser(res.data.user);
                                                })
                                                .catch(error=>{
                                                    setErrors({...errors,login:"Invalid Credentials"})
                                                })
                                        }
                                       
                                    }}
                                    >Login</Button>

                                    </FormGroup>

                                </fieldset>
                            </Form>
                        </section>
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
export default LoginView;