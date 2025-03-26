
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faMobile, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link ,useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";



export default () => {
    const[owner_name,owner_namechange] = useState("");
    const[Brand_name,Brand_namechange] = useState("");
    const[physical_address,physical_addresschange] = useState("");
    const[Phone,Phonechange] = useState("");
    const[email,emailchange] = useState("");
    const[names,nameschange] = useState("");
    const[username,usernamechange] = useState("");
    const[phone,phonechange] = useState("");
    const[Email,Emailchange] = useState("");
    const history = useHistory();
    function handleSubmit(e){
        e.preventDefault();
        const ind_data ={owner_name,Brand_name,physical_address,Phone,email,names,username,phone,Email};
        fetch('http://127.0.0.1:8000/apiaccounts/industrycreate/',{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(ind_data)
        })
        .then(res=>{
            Swal.fire('industry created successfully');
            history.push('/examples/sign-in')
        }).catch((err) =>{
            console.log(err.message)
        })
    }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.Presentation.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={8} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Registration</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group id="owner_name" name="owner_name" className="mb-4" >
                    <Form.Label>Owner Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="john doe" value={owner_name} onChange={e=>owner_namechange(e.target.value)}   />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="Brand_name" name="Brand_name" className="mb-4" >
                    <Form.Label>Brand Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Inyange" value={Brand_name} onChange={e=>Brand_namechange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="address" name="physical_address" className="mb-4" >
                    <Form.Label>Physical Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Gasabo" value={physical_address} onChange={e=>physical_addresschange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="Phone" name="Phone" className="mb-4" >
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faMobile} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="+250780958495" value={Phone} onChange={e=>Phonechange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email"  name="email"className="mb-4" >
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} onChange={e=>emailchange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  
                  <div className="text-center text-md-center mb-4 mt-md-0">
                  <h5 className="mb-0">User Details</h5>
                </div>
                  <Form.Group id="names" name="names" className="mb-4" >
                    <Form.Label>Names</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="john doe" value={names} onChange={e=>nameschange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="username"  name="username"  className="mb-4" >
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="john12" value={username} onChange={e=>usernamechange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="phone"  name="phone"  className="mb-4" >
                    <Form.Label>Phone number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faMobile} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="+250780958495" value={phone} onChange={e=>phonechange(e.target.value)} />
                     
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="Email" name="Email" className="mb-4" >
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control required type="email" placeholder="example@company.com" value={Email} onChange={e=>Emailchange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" value={true} className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button variant="primary" type="submit" className="w-100">
                    Register
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or</span>
                </div>
                
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already registered?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
            
          </Row>
          
        </Container>
      </section>
    </main>
  );
};
