
import React, { useState ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faMobile, faUserCircle ,faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container,Modal, InputGroup , Dropdown,DropdownButton,DropdownToggle,DropdownMenu,DropdownItem } from '@themesberg/react-bootstrap';
import { Link ,useHistory,useParams} from 'react-router-dom';
import { faCcDiscover, faReadme } from "@fortawesome/free-brands-svg-icons";
import Swal from 'sweetalert2'
export default () => {
    const [Default, setDefault] = useState(false);
    const handleClose = () => setDefault(false);
    const [userdatas,userdataschange] = useState([]);
    const {id} = useParams();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("token"));
    const loadEdit =()=>{
   
        // const resp =    fetch(`ApproveApp/` +id,{
        //         method:"PUT",
        //         headers:{
        //             Authorization: `Bearer ${user.access_token}`,
        //             "content-type":"application/json"}
        //     }).then((res)=>{
        //         return res.json();
        //     }).then((resp)=>{
        //         //return resp;
                Swal.fire("Application Approved sucessfully",);
                setDefault(true);
                
            // }).catch((err)=>{
            //     console.log(err.message);
            // });
        }
        const loadEd =()=>{
          Swal.fire("Application Rejected sucessfully",);
        }
        console.log(id);
       useEffect(()=>{
        fetch(`Appfeeddetail/` +id,{
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
       },[]);
    
  

        
  return (
    <main>
      <Row className="justify-content-right align-items-left p-4 mt-5">
          <Col xs={6} className="d-flex align-items-right justify-content-right">
            <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon  className="me-2" />Actions
          </Dropdown.Toggle> 
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold" onClick={()=>{loadEdit()}}>
              <FontAwesomeIcon  className="me-2"  />Approve
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon  className="me-2"/>Reject
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
            </Col>
          </Row>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
        
          <Row className="justify-content-left form-bg-image" >
            <Col xs={8} className="d-flex align-items-left justify-content-space-between">
            {userdatas &&
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-700">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0"> Feedback Details</h3>
                </div>
               <Row>
                <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Applicant  Name : <b> {userdatas.applicant_name}</b></Form.Label>
                </Form.Group>
                <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Applicant  Address : <b> {userdatas.applicant_address}</b></Form.Label>
                </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Brand  Name : <b> {userdatas.brand_name}</b></Form.Label>
                </Form.Group>
                <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Common Name : <b> {userdatas.common_name}</b></Form.Label>
                </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Food  Additive : <b> {userdatas.food_additive}</b></Form.Label>
                </Form.Group>
                <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Food  Category : <b> {userdatas.food_category}</b></Form.Label>
                </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Evaluation  Date : <b> {userdatas.evaluation_date}</b></Form.Label>
                </Form.Group>
                <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Screening  Date : <b> {userdatas.screening_date}</b></Form.Label>
                </Form.Group>
                  </Col><Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Comments : <b> {userdatas.comments}</b></Form.Label>
                </Form.Group>
                <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Query : <b> {userdatas.query}</b></Form.Label>
                </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
              <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Reccomendation : <b> {userdatas.laboratory_analysis}</b></Form.Label>
                </Form.Group>
                <Form.Group id="firstName" name="old_password" className="mb-4">
                <Form.Label>Laboratory  Analysis : <b> {userdatas.laboratory_analysis}</b></Form.Label>
                </Form.Group>
                  </Col>
                  <Row>
                  <Col md={6} className="mb-3">
                      <h5 className="text-muted">Product Image </h5>
                      <img src={`http://127.0.0.1:8000${userdatas.product_image}`}  />
                  </Col>
                  <Col md={6} className="mb-3">
                  <h5 className="text-muted">Ingredient Image </h5>
                      <img src={`http://127.0.0.1:8000${userdatas.food_ingredient_image}`}  />
                  </Col>
                  <Col md={6} className="mb-3">
                  <h5 className="text-muted">Lab Result </h5>
                      <iframe src={`http://127.0.0.1:8000${userdatas.lab_result}` } embedded="true"  />
                  </Col>
                  </Row>
                  </Row>
              </div>
               }
            </Col>
          </Row>
                  <Modal as={Modal.Dialog} centered show={Default} onHide={handleClose}>
       <Modal.Header>
      <Modal.Title className="h6">Report Form</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
    <Form className="mt-4" >
      <Row>
                 <Col md={6} className="mb-3">
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Signature </Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter Signature "  />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Title </Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter Title "  />
                    </InputGroup>
                  </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label>Name Of Manufacturer </Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter Manufacturer "  />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Address </Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter Address "  />
                    </InputGroup>
                  </Form.Group>
                   
                  </Col>
                  <Col md={6} className="mb-3">
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Manufacturing </Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter manufacturing "  />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Packaging Material </Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter material "  />
                    </InputGroup>
                  </Form.Group>
                  </Col><Col md={6} className="mb-3">
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Target User </Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter Target user"  />
                    </InputGroup>
                  </Form.Group>
                  </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="w-100 text-light" >
                    Generate License
                  </Button>
                </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>
        </Container>
      </section>
    </main>
  );
};
