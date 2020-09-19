import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import Link from 'next/link'
import {useState} from 'react'
import {Card,CardBody,CardImg,
  CardText,CardTitle,Row,
  Col,
  Dropdown,DropdownToggle,DropdownMenu,DropdownItem
} from 'reactstrap'


const query = gql`
 {
     products{
         id
         name
         price
         description
         brand{
             id
             name
         }
         category{
             id
             name
         }
         subcategory{
             id
             name
         }
         images{
             url
         }
     }
 }`


 function ProductList(props){
     const {loading,error,data} = useQuery(query)
     const [thepage,setPage] = useState(1)
     const [dropdownOpen,setDropdownOpen] =useState(false);
    const toggle =() =>setDropdownOpen(prevState=>!prevState)
      let totalpages;
     if (error) return "Error loading products"
     if (error) console.log(error)
     if (loading) return <h1>Fetching</h1>

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
      searchQuery = data.products.filter(product=>
          product.name.toLowerCase().includes(props.search)
      )
      if(props.category){
        searchQuery = searchQuery.filter(product=>product.category.id===props.category)
      }
      if(props.sub){
        searchQuery = searchQuery.filter(product=>product.subcategory.id===props.sub)
      }
  
      if(searchQuery.length>perPage){
          searchQuery = searchQuery.slice(startindex,lastindex+1)
      }


      }
      return searchQuery;
  }

  function builder(){
    let array = []
    for(let i=1;i<=totalpages;i++){
       // if(thepage!==i)
       
            array.push(i)
    }
    
    return array;
}


     if (data.products && data.products.length){
         //search query
        //  let searchQuery = data.products.filter(query=>
        //     query.name.toLowerCase().includes(props.search))

        //     if(props.category){
        //       searchQuery = searchQuery.filter(product=>product.category.id===props.category)
        //     }
        //     if(props.sub){
        //       searchQuery = searchQuery.filter(product=>product.subcategory.id===props.sub)
        //     }
        
            if(getdata().length!=0){

                return (
                  <div>
                   
                    <Row>
                      
                      {getdata().map((res) => (
                        <Col xs="6" sm="4" key={res.id}>
                          
                          <Card style={{ margin: "0 0.5rem 20px 0.5rem" }} className="product-card">
                            <CardImg
                              className="product-image"
                              top={true}
                              // style={{ height:130 }}
                              src={ process.env.NODE_ENV === "production"
                              ? res.images.url : `${process.env.NEXT_PUBLIC_API_URL}${res.images[0].url}`}
                      
                            />
                            <CardBody>
                              {/* <CardTitle> */}
                              <Link
                                as={`/product/${res.id}`}
                                href={`/product?id=${res.id}`}
                              >
                               <a style={{color:"green",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}> {res.name}</a>
                               </Link>
                                
                                {/* </CardTitle> */}
                                <div>ksh.{res.price}</div>
                              {/* <CardText >ksh.{res.price}</CardText> */}
                              {/* <Link
                                as={`/product/${res.id}`}
                                href={`/product?id=${res.id}`}
                              >
                                <a className="btn btn-primary">open</a>
                              </Link> */}
                            </CardBody>
                            {/* <div className="card-footer">
                              
                            </div> */}
                          </Card>
                        </Col>
                      ))}
                      <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
        <Row>
                      <Col xs="6" md="4">

                      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret color="primary">
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


                      </Col>
                    </Row>
        </div>
      );


            }else{
                return <h1>No Products Found</h1>;
            }
     }
    //  return <h5>Add Product</h5>;
 }

 export default ProductList;