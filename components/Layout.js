import Head from 'next/head';
import {Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavbarBrand,
  NavItem,
  Row,
  Col


} from 'reactstrap';
import Link from  'next/link';
import {useContext,useState} from 'react'
import AppContext from "../context/AppContext";
import { logout } from "../lib/auth";
import {useRouter} from 'next/router'
const Layout =({children}) =>{
  
    const {user,setUser,isAuthenticated} = useContext(AppContext)
    const router =useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const toggle =() =>setIsOpen(!isOpen)
  
return(
  <div style={{backgroundColor:"black"}}>
    <div className="pageContainer">
      <Head>
        <title>TrenderCommerce</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    </Head>
    <header>
        <style jsx>
            {`
                .auth{
                    color : white;
                }
                
                
                
            `}
        </style>
    </header>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/" >Trender Commerce</NavbarBrand>
      <NavbarToggler onClick={toggle}/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
        {/* <NavItem>
            <Link href="/">
                <a className="navbar-brand">Trender Commerce</a>
            </Link>
        </NavItem> */}
        <NavItem className="ml-auto">
            {user ? (
              <Link href="/categories">
              <a className="nav-link"> {user.username}</a>
            </Link>
             
            ) : (
              <Link href="/register">
                <a className="nav-link"> Sign up</a>
              </Link>
            )}
          </NavItem>
          {
            isAuthenticated && router.pathname.startsWith("/admin") &&  (
              <React.Fragment>
              <NavItem className="ml-auto">
                <Link href="/admin/categories">
                  <a className="nav-link">categories</a>
                </Link>
              </NavItem>
              
              <NavItem className="ml-auto">
              <Link href="/admin/products">
                <a  className="nav-link">products</a>
              </Link>
            </NavItem>
            <NavItem className="ml-auto">
              <Link href="/admin/subs">
                <a  className="nav-link">sub-categories</a>
              </Link>
            </NavItem>
            <NavItem className="ml-auto">
              <Link href="/admin/brands">
                <a  className="nav-link">brands</a>
              </Link>
            </NavItem>
            </React.Fragment>
            )
          }
        <NavItem className="ml-auto">
            {user ? (
              <Link href="/login">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link auth">Sign in</a>
              </Link>
            )}
          </NavItem>

        </Nav>
      </Collapse>
    </Navbar>

    {/* <Nav className="navbar navbar-dark bg-primary">
    
    </Nav> */}
    <Container>{children}</Container>
   </div>
   <footer className="footer"  >

      
      <Row style={{ background:"black"}}>
        <Col sm="12" xs="12" md="12">
      <Row>
        <Col  xs={{size:7,offset:3}} md={{size:5,offset:5}}>
          <p   style={{ background:"black"}}>&copy; Trender Commerce</p>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="4"  style={{ background:"black"}}>

          <blockquote style={{marginLeft:30}}>
            <p>Main Branch: Nairobi Kenya</p>
            <p> P.O Box 9000 </p>
            <p>Nairobi,Kenya</p>
            
          </blockquote>
          </Col>  
          <Col xs="12" sm="12" md="4"  style={{ background:"black"}}>

          <blockquote style={{marginLeft:30}}>
            <p>Hotline: 0200232233</p>
            <p>Facebook:Trender Commerce</p>
            <p>Twitter: TrenderCommerce</p>
            
          </blockquote>
          </Col>  
          <Col xs="12" sm="12" md="3"  style={{ background:"black"}}>

          <blockquote style={{marginLeft:30}} >
            <p>Free delivery:</p>
            <p> Nairobi CBD</p>
            <p>Msa environs</p>
            
          </blockquote>
          </Col>      
          </Row>
      

      </Col>
        
          </Row>
         
   </footer>
    </div>
)

}
export default Layout