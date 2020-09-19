import {HttpLink} from 'apollo-link-http'
import {withData} from 'next-apollo'
import {setContext} from 'apollo-link-context'
import Cookie from 'js-cookie'
// import {withData} from 'next-apollo'
// import {ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client'
//import {setContext} from '@apollo/client/link/context'
 
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
const token = Cookie.get('token')
  const authLink = setContext((_,{headers})=>{
  
  return {
    headers:{
      ...headers,
      authorization:token?`Bearer ${token}`:"",
    }
  }
})
// const httplink = {
//   link: new HttpLink({
//     uri:"http://localhost:1337/graphql",
//     opts:{
//       credentials:'include',
//     }
//     //uri: `${API_URL}/graphql`, // Server URL (must be absolute)
//   })
// };

const httplink = new HttpLink({
  uri:"http://localhost:1337/graphql",
  opts:{
    credentials:'include',
  }
})
const config = {
  link:authLink.concat(httplink)
}
export default withData(config);


// const httplink = createHttpLink(
//   {
//     uri: "http://localhost:1337/graphql"
//   }
// )

// const authLink = setContext((_,{headers})=>{
//   const token = Cookie.get('token')
//   return {
//     headers:{
//       ...headers,
//       authorization:token?`Bearer ${token}`:"",
//     }
//   }
// })

// const client = new ApolloClient({
//   link:authLink.concat(httplink),
//   cache:new InMemoryCache()
// });

// export default withData(client);
