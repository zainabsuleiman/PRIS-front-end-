import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp,faEnvelope,  faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt, faUser, faMobile, faDownload, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Modal,InputGroup,Form,Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
export const AppTable = () => {
  const location = useLocation();
  const locSearch = new URLSearchParams(location.search);
 
  let search = window.location.search;
  var status =locSearch.get('status');
  console.log(status);
// search.split("=")[1]
    const [userdata,userdatachange] = useState([]);
    const [appdata,appdatachange] = useState([]);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("token"));
    const [Default, setDefault] = useState(false);
    const [Defaulty, setDefaulty] = useState(false);
    const handleClose = () => setDefault(false);
    const handleCloses = () => setDefaulty(false);
    const[names,namechange] = useState("");
    const[email,emailchange] = useState("");
    const[phone,phonechange] = useState("");
    
    const data ={names,email,phone};
   const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/Listofapp/",{
    method:"GET",
    headers:{
      Authorization: `Bearer ${user.access_token}`,
      "content-type":"application/json"}
  }).then((res)=>{
    return res.json();
  }).then((resp)=>{
    userdatachange(resp);
    console.log(resp);
  }).catch((err)=>{
    console.log(err.message);
  })};

  const load = (id) => {
    fetch(`http://127.0.0.1:8000/apiaccounts/Appid/`+id,{
    method:"GET",
    headers:{
      Authorization: `Bearer ${user.access_token}`,
      "content-type":"application/json"}
    }).then((res)=>{
    return res.json();
    }).then((resp)=>{
    appdatachange(resp);
    console.log(resp);
    }).catch((err)=>{
    console.log(err.message);
    })
    setDefault(true);
 };
  var id;
  function handleSubmit(e){
    e.preventDefault();
    id = appdata.id;
    console.log(id);
    fetch(`payment/` +id,{
        method:"POST",
        headers:{
            Authorization: `Bearer ${user.access_token}`,
            "content-type":"application/json"},
            body:JSON.stringify(data)
       
    })
    .then(res=>{
     return res.json();
    }).then((resp)=>{
      var data =resp;
      console.log(data);
      window.location.replace(data) ;
    }).catch((err) =>{
        console.log(err.message)
    })
}
    useEffect(()=>{
      fetchData();
    },[]);

    const pdf =(id) =>{
      axios(`http://127.0.0.1:8000/apiaccounts/license/${id}`, {
        method: 'POST',
        headers:{
          Authorization: `Bearer ${user.access_token}`,
          "content-type":"application/pdf"},
        responseType: 'blob' //Force to receive data in a Blob Format
    })
    .then(response => {
    //Create a Blob from the PDF Stream
        const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});
    //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
        window.open(fileURL);
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Report not available!',
      })
     
        console.log(error);
    });
    }

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Applications</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
          <th scope="col">#</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Product Form</th>
            <th scope="col">Intended Use</th>
            <th scope="col">Target User</th>
            <th scope="col">Shelf Life</th>
            <th scope="col">Storage Condition</th>
            <th scope="col">Food Additives</th>
            <th scope="col">Food Ingredient </th>
            <th scope="col">Status </th>
            <th scope="col">Stage </th>
            <th scope="col">Nutritional Information</th>
            <th scope="col">Date Submitted</th>
            <th scope="col">Activity</th>
            
          </tr>
        </thead>
        <tbody>
        {userdata.map((item)=>(
                  <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.Brand_name}</td>
                  <td>{item.product_form}</td>
                  <td>{item.intended_use}</td>
                  <td>{item.target_user}</td>
                  <td>{item.shelf_life}</td>
                  <td>{item.storage_condition}</td>
                  <td>{item.food_additives}</td>
                  <td>{item.food_ingredient}</td>
                  <td className="text-danger" >{item.status}</td>
                  <td className="text-success" >{item.stage}</td>
                  <td>{item.nutritional_info}</td>
                  <td>{item.date_submitted}</td>
                       <td>
                     {  item.status ==='complete' ? <Button  onClick={()=>{load(item.id)}} size="sm" variant ="warning" className="m-1 text-light" >Pay</Button> : null }
                     {  status === "successful" ? <Button  onClick={()=>{pdf(item.id)}} size="sm" variant ="primary"    className="m-1 text-light" ><FontAwesomeIcon icon={faDownload} />License Certificate</Button> : null }
                   </td>
                   
                   
                  </tr>
              ))}
        </tbody>
      </Table>
    
      <Modal as={Modal.Dialog} centered show={Default} onHide={handleClose}>
       <Modal.Header>
      <Modal.Title className="h6">Payment Form</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
    <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={names} onChange={e=>namechange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  
                  
                  <Form.Group id="storage_condition"  name="email"  className="mb-4" >
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="" value={email} onChange={e=>emailchange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="food_ingredient" name="phone"  className="mb-4" >
                    <Form.Label>Phone number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faMobile} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="" value={phone} onChange={e=>phonechange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>

                  <Button variant="warning" type="submit" className="w-100 text-light">
                    pay 5000 RWF
                  </Button>
                </Form>

   
    </Modal.Body>
    <Modal.Footer>
      <Button variant="tertiary" onClick={handleClose}>
        I Got It
    </Button>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>
    </Card>
  );
};