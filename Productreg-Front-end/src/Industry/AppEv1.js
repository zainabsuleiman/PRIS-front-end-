import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEnvelope, faMobile, faUserCircle,faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav,Form,Modal ,Card, Image, Button,InputGroup, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link,useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {useEffect,useState} from 'react';
import Swal from  'sweetalert2';
import { faWindows } from "@fortawesome/free-brands-svg-icons";
export const AppTable = () => {
    
    const history = useHistory();
    const [userdata,userdatachange] = useState([]);
    const [userdatas,userdataschange] = useState([]);
    const [appdata,appdatachange] = useState([]);
    const user = JSON.parse(localStorage.getItem("token"));
    const [showDefault, setShowDefault] = useState(false);
    const [Default, setDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const handleCloses = () => setDefault(false);
    const[common_name,commonchange] = useState("");
    const[product_image,productchange] = useState("");
    const[food_ingredient_image,ingrechange] = useState('');
    const[food_category,categorychange] = useState('');
    const[lab_result,labchange] = useState('');
    const data ={common_name,product_image,food_ingredient_image,food_category};
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
  const onfilechange=(e)=>{
    labchange(e.target.files[0]);
    };
  const prochange=(e)=>{
    productchange(e.target.files[0]);
  };
  const fochange=(e)=>{
    ingrechange(e.target.files[0]);
  };
   const loadEdit =(id)=>{
     fetch(`ApproveApp/` +id,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":"application/json"}
        }).then((res)=>{
            return res.json();
        }).then((resp)=>{
            appdatachange(resp);
            console.log(resp);
            history.push('/industry/evaluator1');
        }).catch((err)=>{
            console.log(err.message);
        })
        setShowDefault(true);
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
  setDefault(true);
    };
    var id;
    function handleSubmit(e){
        e.preventDefault();
        id = appdata.id;
        console.log(id);
        const data = new FormData()
        data.append(`lab_result`, lab_result,lab_result.name)
        console.log(lab_result.name)
        data.append('common_name', common_name)
        data.append('food_category', food_category)
        data.append('product_image', product_image)
        data.append('food_ingredient_image', food_ingredient_image)
        axios.post(`FeedApp/` +id,data,{
            headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":'multipart/form-data'},    
        })
        .then(res=>{
           Swal.fire('Feedback added','success');
           history.push('/industry/evaluator1');
           window.location.reload();
        }).catch((err) =>{
          Swal.fire('An error Occured','error');
            console.log(err.message)
        })
    }
    useEffect(()=>{
      fetchData();
    },[]);

    

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
                      <Button  onClick={()=>{loadEditing(item.id)}} size="sm" variant ="primary" className="m-1">Details</Button>
                      
                  </td>
                  </tr>
              ))}
        </tbody>
      </Table>
      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
       <Modal.Header>
      <Modal.Title className="h6">Evaluation Form</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
    <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="target_user" name="common_name" className="mb-4" >
                    <Form.Label>Common Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={common_name} onChange={e=>commonchange(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-4" id="product_form" name="food_category">
                <Form.Label>Food Category</Form.Label>
               <Form.Select  value={food_category} onChange={e=>categorychange(e.target.value)}>
               <option>Select from Category</option>
              <option>High Risk Food</option>
              <option>Low Risk Food</option>
            
           </Form.Select>
          </Form.Group>
                  
                  <Form.Group id="storage_condition"  name="product_image" accept="image/jpg,image/png,image/gif" className="mb-4" >
                    <Form.Label>Product Image</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="file" placeholder=""  onChange={prochange}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="food_ingredient" name="food_ingredient_image" accept="image/jpg,image/png,image/gif" className="mb-4" >
                    <Form.Label>Food Ingredient_image</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control required type="file" placeholder=""  onChange={fochange}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="food_ingredient" name="lab_result"  className="mb-4" >
                    <Form.Label>Laboratory Result</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control required type="file" placeholder=""  onChange={onfilechange}  />
                      
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Send
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
  <Modal as={Modal.Dialog} centered show={Default} onHide={handleCloses}>
       <Modal.Header>
      <Modal.Title className="h6">App Details</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleCloses} />
    </Modal.Header>
    <Modal.Body>
    <Card border="light" className="shadow-sm mb-0 w-100 align-content-lg-center" >
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
      <Button variant="link" className="text-gray ms-auto" onClick={handleCloses}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>
    </Card>
  );
};