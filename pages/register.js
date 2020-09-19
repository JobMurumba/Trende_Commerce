import React, { useState, useContext } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { registerUser } from "../lib/auth";
import AppContext from "../context/AppContext";

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [errors,setErrors]=useState({
    username:"",
    password:"",
    email:"",
})

async function checkerrors(field,msg){
    const updateItem = (errors[field] = msg);

    await setErrors({...errors,updateItem})
    return errors;


}

  const appContext = useContext(AppContext);
  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
             Create an Account
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset >
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      
                      className={errors.username?"is-invalid":""}
                                         onKeyPress={(e)=>{
                                
                                            errors.username?setErrors({...errors,username:""}):""
                                        
                                        }}
                                        onFocus={(e)=>{
                                
                                            errors.username?setErrors({...errors,username:""}):""
                                        
                                        }}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                    <span className="error" >{errors && errors.username}</span>
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      className={errors.email?"is-invalid":""}
                                         onKeyPress={(e)=>{
                                
                                            errors.password?setErrors({...errors,email:""}):""
                                        
                                        }}
                                        onFocus={(e)=>{
                                
                                            errors.password?setErrors({...errors,email:""}):""
                                        
                                        }}
                                         
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                      
                    />
                     <span className="error" >{errors && errors.email}</span>
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                    className={errors.password?"is-invalid":""}
                    onKeyPress={(e)=>{
           
                       errors.password?setErrors({...errors,password:""}):""
                   
                   }}
                   onFocus={(e)=>{
           
                       errors.password?setErrors({...errors,password:""}):""
                   
                   }}
                    
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                     <span className="error" >{errors && errors.password}</span>
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      
                      color="primary"
                      disabled={loading}
                    
                      onClick={async() => {
                         

                        if (data.username.trim().length<5 ||  data.email.trim().length<5 || data.password.trim().length<8){
                         
                            checkerrors("username","please provide a valid username")
                            .then(errors=>{
                                checkerrors("email","please provide a valid email")
                                    .then(errors=>{
                                        checkerrors("password","Please provide a valid password")
                                            .then(errors=>{})
                                    })
                            })
                    // if(data.email.length<8) setErrors({...errors,email:"please enter a valid email"})
        
                        }else{
                            setLoading(true);
                        registerUser(data.username, data.email, data.password)
                          .then((res) => {
                            // set authed user in global context object
                            appContext.setUser(res.data.user);
                            setLoading(false);
                          })
                          .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                          });
                        }
                        
                      }}
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
    
    </Container>
  );
};
export default Register;