import axios from 'axios';
import Router from "next/router";
import Cookie from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// export const userLogin=({username,password})=>{
   
//     if (typeof window === "undefined") {
//         return;
//       }
//     let errors= {}

//     return new Promise((resolve,reject)=>{

//         axios
//       .post(`${API_URL}/auth/local/`, { identifier:username, password })
//       .then((res) => {
        
//         //set token response from Strapi for server validation
//         Cookie.set("token", res.data.jwt);
        
//         //resolve the promise to set loading to false in SignUp form
//         resolve(res);
//         //redirect back to home page for restaurance selection
//         Router.push("/categories");
//       })
//       .catch((error) => {
//         console.log(API_URL+"/auth/local")
//           console.log(error)
//         //reject the promise and pass the error object back to the form
//         reject(error);
//       });
//     })
    
// }
export const userLogin = ({username, password}) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier:username, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};
export const logout = () => {
  if (typeof window === "undefined") {
    return;
  }
  //remove token and user cookie
  Cookie.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem("logout", Date.now());
  //redirect to the home page
  Router.push("/login");
};


export const registerUser = (username, email, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};