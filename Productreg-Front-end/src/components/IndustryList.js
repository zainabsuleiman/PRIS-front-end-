import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button,Toast, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {useEffect ,useState} from 'react';
import Toasts from "../pages/components/Toasts";
export default () => {
    const [userdata,userdatachange] = useState([]);
    const user = JSON.parse(localStorage.getItem("token"));
   console.log(user)
   console.log(user.access_token)
   const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/IndustryList/",{
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
    
    const TableRow = (props) => {
      const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;
  
      return (
        <tr>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
          </td>
          <td className="fw-bold">
            <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
            {source}
          </td>
          <td>{sourceType}</td>
          <td>{category ? category : "--"}</td>
          <td>{rank ? rank : "--"}</td>
          <td>
            <Row className="d-flex align-items-center">
              <Col xs={12} xl={2} className="px-0">
                <small className="fw-bold">{trafficShare}%</small>
              </Col>
              <Col xs={12} xl={10} className="px-0 px-xl-1">
                <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
              </Col>
            </Row>
          </td>
          <td>
            
          </td>
        </tr>
      );
    };
  
    return (
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="pb-0">
          <Table responsive className="table-centered table-nowrap rounded mb-0">
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">Owner_name</th>
                <th className="border-0">Brand_name</th>
                <th className="border-0">Physical_address</th>
                <th className="border-0">Phone Number</th>
                <th className="border-0">Email</th>
               
              </tr>
            </thead>
            <tbody>
              {userdata.map((item)=>(
                  <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.owner_name}</td>
                  <td>{item.Brand_name}</td>
                  <td>{item.physical_address}</td>
                  <td>{item.Phone}</td>
                  <td>{item.email}</td>
                  

                  </tr>
              ))}
                 
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };