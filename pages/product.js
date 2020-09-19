
import { useContext,useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import Cart from "../components/cart/";
import AppContext from "../context/AppContext";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const productquery = gql`
  query($id: ID!) {
    product(id:$id){
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
  }
`;

function Product() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(productquery, {
    variables: { id: router.query.id },
  });
  const [cartvisible,setVisible]=useState(true)

  if (error) return "Error Loading product";
  if (loading) return <h1>Loading ...</h1>;
  if (data.product) {
    const { product} = data;
    return (
      <>
        <h1>{product.name}</h1>
        <Row>
        
            <Col xs="6" sm="4" md="3" style={{ padding: 0 }} key={product.id}>
              <Card style={{ margin: "0 10px" }} className="product-card">
                <CardImg
                  top={true}
                  className="product-image"
                  // style={{ height: 150 }}
                  src={ process.env.NODE_ENV === "production"
                  ? product.images.url : `${process.env.NEXT_PUBLIC_API_URL}${product.images[0].url}`}
          
                />
                <CardBody>
                  {/* <CardTitle>{product.brand.name}</CardTitle>
                  <CardText >{product.category.name}</CardText> */}
                  
                               <a  href="#" style={{color:"green",whiteSpace:"nowrap",
                               overflow:"hidden",textOverflow:"ellipsis"}}> {product.name}</a>
                      <div>Ksh.{product.price}</div>        

                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(product)}
                  >
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          
          <Col xs="5" sm="3" md={{size:4,offset:2}} style={{ padding: 0 }}>
            <Button onClick={e=>setVisible(!cartvisible)}>{!cartvisible?"hide cart":"View cart"}</Button>
            <div hidden={cartvisible} style={{zIndex:99,position:'absolute'}}>
             <Cart /> 
            </div>
          </Col>
        </Row>
        <Row >
            <Col xs="12" sm="12" md="8">
            <h1 className="h4"><strong>About this Product</strong></h1>
            
            <div dangerouslySetInnerHTML={{__html:product.description}} style={{ margin: "0 10px" }}/>
            </Col>
            
        </Row>
      </>
    );
  }
  
}
export default Product;