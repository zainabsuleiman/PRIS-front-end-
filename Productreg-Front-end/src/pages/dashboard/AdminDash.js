
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendar, faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserFriends, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup ,Modal ,Form,InputGroup} from '@themesberg/react-bootstrap';
import {useEffect ,useState} from 'react';
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { UsersTable } from "../../components/Users";
import { trafficShares, totalOrders } from "../../data/charts";
import axios from 'axios';
import{useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
export default () => {
  const [Default, setDefault] = useState(false);
  const handleClose = () => setDefault(false);
  const [userdata,userdatachange] = useState([]);
  const [inddata,inddatachange] = useState([]);
  const[date1,date1change] = useState("");
  const[date2,date2change] = useState("");
  const user = JSON.parse(localStorage.getItem("token"));
  var u_count;
  var i_count;
  const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/countusers/",{
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
  })
 
}
const Data = () => {fetch("http://127.0.0.1:8000/apiaccounts/countindustry/",{
    method:"GET",
    headers:{
      Authorization: `Bearer ${user.access_token}`,
      "content-type":"application/json"}
  }).then((res)=>{
    return res.json();
  }).then((resp)=>{
   inddatachange(resp);
  }).catch((err)=>{
    console.log(err.message);
  })
 
}
const pdf =() =>{
  axios(`http://127.0.0.1:8000/apiaccounts/industry_report/`, {
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
  useEffect(()=>{
    Data();
    fetchData();
  },[]);
  u_count = userdata;
  i_count = inddata;
 
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
        </Dropdown>

        <ButtonGroup>

          <Button variant="outline-primary" onClick={()=>{setDefault(true)}} size="sm">Report</Button>
        </ButtonGroup>
      </div>
     
      <Row className="justify-content-md-center">
    
     
        <Col xs={12} sm={6} xl={4} className="mb-4">
        
          <CounterWidget
          
            category="Users"
            title={u_count}
            period="Feb 1 - Jun 1"
            icon={faUserFriends}
            iconColor="shape-secondary"
          />

        </Col>


        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Industry"
            title={i_count}
            period="Feb 1 - Jun 1"
            icon={faBuilding}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <UsersTable />
                </Col>

               

                
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                
              <Modal as={Modal.Dialog} centered show={Default} onHide={handleClose}>
       <Modal.Header>
      <Modal.Title className="h6">Report Form</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
    <Form className="mt-4" >
                 <Col md={6} className="mb-3">
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> Start Date</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faCalendar} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="date" placeholder="Enter The Start Date " value={date1} onChange={e=>date1change(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="target_user" name="name" className="mb-4" >
                    <Form.Label> End Date</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faCalendar} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="date" placeholder="Enter The End Date" value={date2} onChange={e=>date2change(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  </Col>
                  <Button variant="primary" type="submit" className="w-100 text-light" onClick={()=>{pdf()}}>
                    Submit
                  </Button>
                </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>
                

                
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
