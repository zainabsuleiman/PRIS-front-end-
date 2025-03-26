
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link ,useHistory} from 'react-router-dom';
import qs from "querystring";
import { useState,useEffect } from 'react';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

import axios from 'axios';
export default () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const history = useHistory();
  
 
  const handleSubmit = async (context, payload)=>{
    try {
      const data = {
        grant_type: "password",
        username,
        password
      };
      const str = `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`;
      const enc = window.btoa(str);
      const cred = qs.stringify(data);
      const url = `http://127.0.0.1:8000/o/token/`;
      const response = await axios.post(url, cred, {
        headers: {
          Authorization: `Basic ${enc}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      
      // context.commit("mutateCredentials", response.data);
      console.log(response.data)
      // console.log('token:',response.data.access_token)
      // context.dispatch("get_user_profile", {
      //   token: response.data.access_token
      // });
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        history.push('/examples/pass')
        return response;
      }
     
      
    
    } catch (error)  {
      console.log(error.message);
      alert('hello');
    }
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
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="username" name="username" className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="username" placeholder="johndoe" onChange={e =>setUsername(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password"  name="password"className="mb-4">
                      <Form.Label> Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" onChange={e=> setPassword(e.target.value)} />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or </span>
                </div>
               
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    New Industry
                    <Card.Link as={Link} to={Routes.Registerind.path} className="fw-bold">
                      {` Register `}
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
