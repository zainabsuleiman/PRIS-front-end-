import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav,Modal, Card, Image, Button,Toast, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link,useHistory,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {useEffect ,useState} from 'react';
import Toasts from "../pages/components/Toasts";
export const UsersTable = () => {
   
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const history = useHistory();
    // const LoadDetails =(id) =>{
    //     history.push("/examples/user-details")
    // }
    const [userdata,userdatachange] = useState([]);
    const user = JSON.parse(localStorage.getItem("token"));
  
   console.log(user)
   console.log(user.access_token)
   const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/userList/",{
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
    const Removeuser=(id)=>{
        if(window.confirm("Do you want to remove user")){
            fetch(`http://127.0.0.1:8000/apiaccounts/deleteuser/${id}/`,{
                method:"DELETE",
                headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":"application/json"}
            }).then((res)=>{
                Swal.fire('removed successfully.','','success');
                window.location.reload();
            }).catch((err)=>{
                console.log(err.message);
            })
        }
    }
    const [userdet,userdetchange] = useState([]);
    
  const userDetails=(id,setShowDefault)=>{fetch(`http://127.0.0.1:8000/apiaccounts/Userdetails/${id}/`,{
        method:"GET",
        headers:{
        Authorization: `Bearer ${user.access_token}`,
        "content-type":"application/json"}

}).then((res)=>{
    return res.json();
}).then((resp)=>{
    userdetchange(resp);
}).catch((err)=>{
    console.log(err.message);
})



}
    useEffect(()=>{
        userDetails();
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
          <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>List of users</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
        <Card.Body className="pb-0">
            
          <Table responsive className="table-centered table-nowrap rounded mb-0">
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">Names</th>
                <th className="border-0">Username</th>
                <th className="border-0">Email</th>
                <th className="border-0">Phone Number</th>
                <th className="border-0">Created_at</th>
                <th className="border-0">Updated_at</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((item)=>(
                  <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.names}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.created_at}</td>
                  <td>{item.updated_at}</td>
                  <td>
                      <Button onClick={() => userDetails(item.id,setShowDefault(true))}  size="sm" variant ="success" className="m-1">Details</Button>
                      <Button onClick={()=>{Removeuser(item.id)}} size="sm" variant="primary"    className="m-1">Delete</Button>
                  </td>

                  </tr>
              ))}
                 
            </tbody>
          </Table>
        </Card.Body>
        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
       <Modal.Header>
      <Modal.Title className="h6">User Details</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
    <Card border="light" className="shadow-sm mb-4">
        <Card.Body>
            {userdet &&
            <div>
                <h4>Names : <b>{userdet.names}</b></h4>
                <h4>Username : {userdet.username}</h4>
                <h4>Contact details</h4>
                <h5>Email : {userdet.email}</h5>
                <h5>Phone number : {userdet.phone}</h5>
                
                
            </div>
            }
        </Card.Body>
    </Card>
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