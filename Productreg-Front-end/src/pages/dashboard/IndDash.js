
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup,Modal } from '@themesberg/react-bootstrap';
import {useEffect,useState} from 'react';
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { useLocation } from 'react-router-dom';
import {AppTable } from '../../Industry/Applications';
import axios from 'axios';
import Swal from 'sweetalert2';
export default () => {
  const [Defaulty, setDefaulty] = useState(false);
  const handleCloses = () => setDefaulty(false);
    const [userdata,userdatachange] = useState([]);
  const [inddata,inddatachange] = useState([]);
  const [indcdata,indcdatachange] = useState([]);
  const user = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();
  const locSearch = new URLSearchParams(location.search);
 
  let search = window.location.search;
  var status =locSearch.get('status');
  console.log(status);
  
  var u_count;
  var i_count;
  var s_count;
  const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/countpending/",{
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
const Data = () => {fetch("http://127.0.0.1:8000/apiaccounts/countrejected/",{
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
const Datac = () => {fetch("http://127.0.0.1:8000/apiaccounts/countcomplete/",{
    method:"GET",
    headers:{
      Authorization: `Bearer ${user.access_token}`,
      "content-type":"application/json"}
  }).then((res)=>{
    return res.json();
  }).then((resp)=>{
   indcdatachange(resp);
  }).catch((err)=>{
    console.log(err.message);
  })
 
}
const pdf =() =>{
  axios(`http://127.0.0.1:8000/apiaccounts/app_report`, {
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
    Datac();
    fetchData();
  },[]);
  u_count = userdata;
  i_count = inddata;
  s_count = indcdata;
 
  
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
        </Dropdown>

        <ButtonGroup>
         
          <Button variant="outline-primary" onClick={()=>{pdf()}} size="sm">Report</Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4 text-tertiary">
          <CounterWidget
            category="Pending"
            title={u_count}
         
           
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4 text-danger" >
          <CounterWidget
            category="Rejected"
            title={i_count}
         
            
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4 text-success" >
          <CounterWidget
            category="Complete"
            title={s_count}
           
            
            icon={faCashRegister}
            iconColor="shape-tertiary"/>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <AppTable />
                </Col>
               
                <Modal as={Modal.Dialog} centered show={Defaulty} onHide={handleCloses}>
       <Modal.Header>
      <h2 className="h6">Payment Successful</h2>
      <Button variant="close" aria-label="Close" onClick={handleCloses} />
    </Modal.Header>
    <Modal.Body>
    

   
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
             

               
              </Row>
            </Col>

            
          </Row>
        </Col>
      </Row>
    </>
  );
};
