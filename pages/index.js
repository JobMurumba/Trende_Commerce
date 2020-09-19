
import React, { useState } from "react";
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
import { Col, Input, InputGroup, InputGroupAddon, Row ,Label} from "reactstrap";
import ProductList from "../components/products/list";


const category_query = gql`
{
 categories{
   id
   name
 }
}
`
const sub_category_query = gql`
{
  subcategories{
    id
    name
  }
}

`
function Home() {
  const [query, updateQuery] = useState("");
  const {loading,error,data} = useQuery(category_query)
 // const [subcat,setSubCat] = useState(loadsubcategories())
  const theget = useQuery(sub_category_query)
  const [activecategory,setCategory] = useState("")
 const [activesubcategory,setSubCategory] = useState("")
  function loadsubcategories(){
   
    let {isloading,iserror,isdata} = useQuery(sub_category_query)
    if (isdata && isdata.subcategories && isdata.subcategories.length){
      
      
      return isdata.subcategories

    }else{
      return []
    }
  }
  return (
    <div className="container-fluid">
      <Row>
        <Col xs="12">
        <h1 className="h3 text-center" style={{marginLeft:"1px"}}>Our categories</h1>
        </Col>
       
      </Row>
      
      <Row>
      <Col xs="12">
      {
        loading?"Loading categories":(
          <div  style={{display:"flex",marginLeft:"0px",flexWrap:"wrap"}}>
              <p className="tabs"
              className={activecategory===""?"tabs active":"tabs"}
              onClick={e=>setCategory("")}
              >All</p> 
           { data.categories.map(category=>(
              <p className={category.id===activecategory?"tabs active":"tabs"} key={category.id}
              onClick={e=>setCategory(category.id)}
              >{category.name}</p>
            ))
           }
          </div>
        )
        }
      </Col>
      </Row>
      <Row>
        <Col xs="12">
        <h1 className="h3 text-center" style={{marginLeft:"0px"}}>Our sub-categories
        </h1>
        </Col>
        
      </Row> 
      <Row>
        <Col xs="12">
        {
        theget.data?(
          <div  style={{display:"flex",marginLeft:"1px",flexWrap:"wrap"}}>
          
          <p className="tabs"
              className={activesubcategory===""?"tabs active":"tabs"}
              onClick={e=>setSubCategory("")}
              >All</p> 
           { theget.data.subcategories.map(subcategory=>(
             
              <p  
              className={subcategory.id===activesubcategory?"tabs active":"tabs"} key={subcategory.id}
              onClick={e=>setSubCategory(subcategory.id)}
            
              >{subcategory.name}</p>
              
           ))
           }
          </div>
        ):""
        }
        </Col>
      </Row>
        
    
      
      <Row>
      
        
      </Row>
      <Row>
        <Col xs="12">
          <div className="search">
            <InputGroup>
              <InputGroupAddon addonType="append" >
                
                <Label style={{backgroundColor:"blue",color:"white",height:"88%",padding:"6px 8px"}}>Search</Label> </InputGroupAddon>
              <Input
                onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
                value={query}
                placeholder="search product..."
              />
            </InputGroup>
          </div>
          <ProductList search={query} category={activecategory}  sub={activesubcategory}/>
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 14px;
            width: 90%;
          }
          .tabs{
            display:flex;
            -webkit-border-radius:5px;
            border:1px solid blue;
            margin-left:6px;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            min-width:120px;
            
          }
          .tabs.active{
            font-weight:800;
            background-color:blue;
            color:white;
          }
        `}
      </style>
    </div>
  );
}
export default Home;