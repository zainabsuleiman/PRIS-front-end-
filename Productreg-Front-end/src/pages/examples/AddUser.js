
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faMobile, faUnlockAlt, faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link , useHistory } from 'react-router-dom';
import{useEffect,useState} from 'react';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Swal from 'sweetalert2';

export default () => {
  const [userdata,userdatachange] = useState([]);
  const user = JSON.parse(localStorage.getItem("token"));
 
 const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/roleList/",{
  method:"GET",
  headers:{
    Authorization: `Bearer ${user.access_token}`,
    "content-type":"application/json"}
}).then((res)=>{
  return res.json();
}).then((resp)=>{
  userdatachange(resp);
}).catch((err)=>{
  console.log(err.message);
})};
  useEffect(()=>{
    fetchData();
  },[]);
  
    const[role,rolechange] = useState("");
    const[email,emailchange] = useState("");
    const[names,nameschange] = useState("");
    const[username,usernamechange] = useState("");
    const[phone,phonechange] = useState("");
    
    console.log(user.access_token);
    const history = useHistory();
    function handleSubmit(e){
        e.preventDefault();
        
        const ind_data ={names,username,email,phone,role};
        fetch('http://127.0.0.1:8000/apiaccounts/usercreation/',{
            method:"POST",
            headers:{  
              Authorization: `Bearer ${user.access_token}`,
              "content-type":"application/json"},
              body:JSON.stringify(ind_data)
        })
        .then(res=>{
            Swal.fire('user created successfully');
            history.push('/dashboard/admin')
        }).catch((err) =>{
            console.log(err.message)
        })
    }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create User</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="names" name="names" className="mb-4">
                    <Form.Label>Names</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="john doe"  value={names} onChange={e=>nameschange(e.target.value)}/>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="username" name="username" className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="john12" value={username} onChange={e=>usernamechange(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" name="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} onChange={e=>emailchange(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="phone" name="phone" className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faMobile} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="+250780958495" value={phone} onChange={e=>phonechange(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-4" id="role" name="role">
                <Form.Label>Role</Form.Label>
               <Form.Select value={role} onChange={e=>rolechange(e.target.value)}>
              {userdata.map((item)=>(
              <option key={item.id} value={item.id}>{item.type_name}</option>
            ))}
           </Form.Select>
          </Form.Group>
               
                  <Button variant="tertiary" type="submit" icon={faUserPlus} className="w-100">
                    Add
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
