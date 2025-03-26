import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEnvelope, faMobile, faUserCircle,faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav,Form,Modal ,Card, Image, Button,InputGroup, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link,useHistory, useParams } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {useEffect,useState} from 'react';
import { faCcDiscover, faReadme } from "@fortawesome/free-brands-svg-icons";
export const App = () => {
    
    const history = useHistory();
    const [userdata,userdatachange] = useState([]);
    const [userdatas,userdataschange] = useState([]);
    const [userdatass,userdatasschange] = useState([]);
    const [feeddata,feeddatachange] = useState([]);
    const [appdata,appdatachange] = useState([]);
    const user = JSON.parse(localStorage.getItem("token"));
    const [showDefault, setShowDefault] = useState(false);
    const [Default, setDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const [Defaults, setDefaults] = useState(false);
    const handleCloses = () => setDefaults(false);
    const [Defaultss, setDefaultss] = useState(false);
    const handleClosess = () => setDefaultss(false);
    const[lab,labchange] = useState("");
    const[standards,standchange] = useState("");
    const[recomm,recommchange] = useState("");
    const[query,querychange] = useState("");
    const[comments,commentschange] = useState("");
    const data ={lab,standards,recomm,query,comments};
   const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/Listofapp/",{
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
  
  const feedData = (id) => {
      fetch(`Listoffeed/`+id,{
    method:"GET",
    headers:{
      Authorization: `Bearer ${user.access_token}`,
      "content-type":"application/json"}
  }).then((res)=>{
    return res.json();
  }).then((resp)=>{
    feeddatachange(resp);
  }).catch((err)=>{
    console.log(err.message);
  })
  setDefault(true)
};
   const loadEdit =(id)=>{
   
    const resp =    fetch(`ApproveApp/` +id,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":"application/json"}
        }).then((res)=>{
            return res.json();
        }).then((resp)=>{
            appdatachange(resp);
            console.log(resp);
            if (resp.status === 201) {
                localStorage.setItem("id", JSON.stringify(resp.data));
                
                return resp;
              }
        }).catch((err)=>{
            console.log(err.message);
        });

feedData(id);
    };
   
    useEffect(()=>{
      fetchData();
    },[]);
    const loadEditi =(id)=>{

        fetch(`Appfeeddetail/` +id,{
         method:"GET",
         headers:{
         Authorization: `Bearer ${user.access_token}`,
        "content-type":"application/json"}
}).then((res)=>{
return res.json();
}).then((resp)=>{
userdatasschange(resp);
}).catch((err)=>{
console.log(err.message);
})
setDefaultss(true);
};


    const loadEditing =(id)=>{

        fetch(`Appdetail/` +id,{
         method:"GET",
         headers:{
         Authorization: `Bearer ${user.access_token}`,
        "content-type":"application/json"}
}).then((res)=>{
return res.json();
}).then((resp)=>{
userdataschange(resp);
}).catch((err)=>{
console.log(err.message);
})
setDefaults(true);
};
 const load=(id)=>{
     history.push('/industry/evform/' +id);
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
            <th scope="col">Action</th>
            
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
                  <td>{item.food_additive}</td>
                  <td>{item.food_ingredient}</td>
                  <td className="text-danger" >{item.status}</td>
                  <td className="text-success" >{item.stage}</td>
                  <td>{item.nutritional_info}</td>
                  <td>
                      <Button  onClick={()=>{loadEdit(item.id)}} size="sm" variant ="success" className="m-1">Evaluate</Button>
                      <Button  onClick={()=>{loadEditing(item.id)}} size="sm" variant ="primary" className="m-1">View</Button>
                      
                  </td>
                  </tr>
              ))}
        </tbody>
      </Table>
  <Modal as={Modal.Dialog} centered show={Default} onHide={handleClose}>
       <Modal.Header>
      <Modal.Title className="h6">Application Feedback</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
    <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
          <th scope="col">#</th>
            <th scope="col">Applicant Name</th>
            <th scope="col">Applicant Address</th>
            <th scope="col">Brand name</th>
            <th scope="col">Common Name</th>
            <th scope="col">Food category</th>
            <th scope="col">Screening date</th>
            <th scope="col">Food Additives</th>
            <th scope="col">Product Image </th>
            <th scope="col">Food Ingredient Image </th>
            <th scope="col">Evaluation Date </th>
            <th scope="col">Action</th>
            
          </tr>
        </thead>
        <tbody>
        {feeddata.map((item)=>(
                  <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.applicant_name}</td>
                  <td>{item.applicant_address}</td>
                  <td>{item.brand_name}</td>
                  <td>{item.common_name}</td>
                  <td>{item.food_category}</td>
                  <td>{item.screening_date}</td>
                  <td>{item.food_additive}</td>
                  <td><img src={`http://127.0.0.1:8000${item.product_image}`} width="90px;" height="50px;"/></td>
                  <td ><img src={`http://127.0.0.1:8000${item.food_ingredient_image}`}width="90px;" height="50px;"/></td>
                  <td >{item.evaluation_date}</td>
                  <td>
                      <Button  onClick={()=>{load(item.id)}} size="sm" variant ="success" className="m-1">Feed Back</Button>
                      <Button  onClick={()=>{loadEditi(item.id)}} size="sm" variant ="primary" className="m-1">View</Button>
                  </td>
                  </tr>
              ))}
        </tbody>
      </Table>
   
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
  <Modal as={Modal.Dialog} centered show={Defaults} onHide={handleCloses}>
       <Modal.Header>
      <Modal.Title className="h6">App Details</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleCloses} />
    </Modal.Header>
    <Modal.Body>
    <Card border="light" className="shadow-sm mb-0 w=100 align-content-lg-center fmxw-1000">
    <Card.Body>
            {userdatas &&
            <div>
                <Row>
                <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Brand Name :</Form.Label>
                <b> {userdatas.Brand_name}</b>
                {/* <Form.Control  placeholder={userdatas.Brand_name} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Product form : </Form.Label>
               <b> {userdatas.product_form}</b>
                {/* <Form.Control  placeholder={userdatas.product_form} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Intended use :</Form.Label>
                <b> {userdatas.intended_use}</b>
                {/* <Form.Control  placeholder={userdatas.intended_use}  disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Target user :</Form.Label>
                <b> {userdatas.target_user}</b>
                {/* <Form.Control  placeholder={userdatas.target_user}  className="fmxw-600"disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Nutritional Info  :</Form.Label>
                <b> {userdatas.nutritional_info}</b>
                {/* <Form.Control  placeholder={userdatas.nutritional_info} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Status  :</Form.Label>
                <b> {userdatas.status}</b>
                {/* <Form.Control  placeholder={userdatas.status} disabled /> */}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Shelf Life :</Form.Label>
                <b> {userdatas.shelf_life}</b>
                {/* <Form.Control  placeholder={userdatas.shelf_life} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Storage condition  :</Form.Label>
                <b> {userdatas.storage_condition}</b>
                {/* <Form.Control  placeholder={userdatas.storage_condition} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Food ingredient :</Form.Label>
                <b> {userdatas.food_ingredient}</b>
                {/* <Form.Control  placeholder={userdatas.food_ingredient} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Food additive  :</Form.Label>
                <b> {userdatas.food_additive}</b>
                {/* <Form.Control  placeholder={userdatas.food_additive} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Packaging  material :</Form.Label>
                <b> {userdatas.packaging_material}</b>
                {/* <Form.Control  placeholder={userdatas.packaging_material} disabled /> */}
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Stage  :</Form.Label>
                <b> {userdatas.stage}</b>
                {/* <Form.Control  placeholder={userdatas.stage} disabled /> */}
              </Form.Group>
            </Col>
            
                </Row>
   
            </div>
            }
        </Card.Body>
    </Card>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="tertiary" onClick={handleCloses}>
        I Got It
    </Button>
      <Button variant="link" className="text-gray ms-auto" onClick={handleCloses}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>

  <Modal as={Modal.Dialog} centered show={Defaultss} onHide={handleClosess}>
       <Modal.Header>
      <Modal.Title className="h6">Feedback Details</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClosess} />
    </Modal.Header>
    <Modal.Body>
    <Card border="light" className="shadow-sm mb-0 w=100 align-content-lg-center fmxw-1000">
        <Card.Body>
            {userdatas &&
            <div>
                <Row>
                <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Applicant Name</Form.Label>
                <Form.Control  placeholder={userdatass.applicant_name} disabled />
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Applicant address </Form.Label>
                <Form.Control  placeholder={userdatass.applicant_address} disabled />
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Brand name </Form.Label>
                <Form.Control  placeholder={userdatass.brand_name}  disabled />
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Common Name </Form.Label>
                <Form.Control  placeholder={userdatass.common_name}  className="fmxw-600"disabled />
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Food category  </Form.Label>
                <Form.Control  placeholder={userdatass.food_category} disabled />
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Screening Date</Form.Label>
                <Form.Control  placeholder={userdatass.screening_date} disabled />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Food additive</Form.Label>
                <b>{userdatass.food_additive}</b>
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Product image </Form.Label>
                <img src={`http://127.0.0.1:8000${userdatass.product_image}`} width="150px;" height="210px;"/>
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Food ingredient image </Form.Label>
                <img src={`http://127.0.0.1:8000${userdatass.food_ingredient_image}`} width="150px;" height="210px;"/>
              </Form.Group>
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Evaluation date </Form.Label>
                <Form.Control  placeholder={userdatass.evaluation_date} disabled />
              </Form.Group>
              
            </Col>
            
                </Row>
   
            </div>
            }
        </Card.Body>
    </Card>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="tertiary" onClick={handleClosess}>
        I Got It
    </Button>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClosess}>
        Close
    </Button>
    </Modal.Footer>
    </Modal>
    </Card>
  );
};