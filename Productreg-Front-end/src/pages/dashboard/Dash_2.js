
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import {useEffect,useState} from 'react';
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import {App} from '../../Industry/AppEv2';
import { trafficShares, totalOrders } from "../../data/charts";

export default () => {
  
  const [userdata,userdatachange] = useState([]);
  const [inddata,inddatachange] = useState([]);
  const [indcdata,indcdatachange] = useState([]);
  const user = JSON.parse(localStorage.getItem("token"));
  var u_count;
  var i_count;
  var s_count;
  const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/countpendingev/",{
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
const Data = () => {fetch("http://127.0.0.1:8000/apiaccounts/countrejectedev/",{
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
const Datac = () => {fetch("http://127.0.0.1:8000/apiaccounts/countcompleteev/",{
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
  useEffect(()=>{
    Data();
    fetchData();
    Datac();
  },[]);
  u_count = userdata;
  i_count = inddata;
  s_count = indcdata;
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
       

        {/* <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup> */}
      </div>

      <Row className="justify-content-md-center">
       
        
        <Col xs={12} sm={6} xl={4} className="mb-4 text-tertiary">
          <CounterWidget
            category="Pending"
            title={u_count}
           
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4 text-danger" >
          <CounterWidget
            category="Rejected"
            title={i_count}
          
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4 text-success" >
          <CounterWidget
            category="Complete"
            title={s_count}
       
            percentage={28.4}
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
                  <App />
                </Col>

                

               
              </Row>
            </Col>

            
          </Row>
        </Col>
      </Row>
    </>
  );
};
