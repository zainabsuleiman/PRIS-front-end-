import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card,Form,Button, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import {useEffect,useState} from 'react';
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import{useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
export default () => {
    const user = JSON.parse(localStorage.getItem("token"));
    const[old_password,oldchange] = useState("");
    const[new_password1,new1change] = useState("");
    const[new_password2,new2change] = useState("");
    const data ={old_password,new_password1,new_password2};
    const history = useHistory();
    useEffect(()=>{
        fetch(`password/`,{
         method:"PUT",
         headers:{
             Authorization: `Bearer ${user.access_token}`,
             "content-type":"application/json"}
         }).then((res)=>{
            return res.json();
        }).then((resp)=>{
         oldchange(resp.old_password);
         new1change(resp.new_password1);
         new2change(resp.new_password2);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[]);
 function handleSubmit(e){
   e.preventDefault();
   fetch(`http://127.0.0.1:8000/apiaccounts/password/`,{
         method:"PUT",
         headers:{
             Authorization: `Bearer ${user.access_token}`,
             "content-type":"application/json"},
             body:JSON.stringify(data)
        
     })
     .then(res=>{
        Swal.fire('Password changed successfully');
         window.location.reload();
          history.push('/examples/sign-in');
     }).catch((err) =>{
         console.log(err.message)
     })
     
 }
  return (
    <>
      

      <Row>
        <Col xs={12} xl={8}>
        <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Change Password</h5>
        <Form  className="mt-4" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Old Password</Form.Label>
                <Form.Control required type="password" placeholder="Enter your old password" value={old_password} onChange={e=>oldchange(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName" name="new_password1" className="mb-4">
                <Form.Label>New Password</Form.Label>
                <Form.Control required type="password" placeholder="New Password"  value={new_password1} onChange={e=>new1change(e.target.value)}/>
              </Form.Group>
              <Form.Group id="lastName" name="new_password2" className="mb-4">
                <Form.Label> Confirm New Password</Form.Label>
                <Form.Control required type="password" placeholder="confirm new password"  value={new_password2} onChange={e=>new2change(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
      
          
          
          <div className="mt-3">
            <Button variant="primary" type="submit">Change</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              
            </Col>
            <Col xs={12}>
              
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
