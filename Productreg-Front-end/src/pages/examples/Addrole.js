
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faMobile, faUnlockAlt,faBullhorn, faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col,Dropdown, Modal,Table,Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link , useHistory } from 'react-router-dom';
import{useEffect,useState} from 'react';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { Alert } from '@themesberg/react-bootstrap';
import Swal from 'sweetalert2';
export default () => {
  const [hiddenAlerts, setHiddenAlerts] = React.useState([]);

  const onClose = (alertId) => {
    const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
    setHiddenAlerts(hiddenAlertsUpdated);
  };
 
  const shouldShowAlert = (alertId) => (
    hiddenAlerts.indexOf(alertId) === -1
  );
  const [Default, setDefault] = useState(false);
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
  const user = JSON.parse(localStorage.getItem("token"));
  const [userdata,userdatachange] = useState([]);
    const[type_name,type_namechange] = useState("");
    console.log(user.access_token);
    const history = useHistory();
    function handleSubmit(e){
        e.preventDefault();
        
        const ind_data ={type_name};
        fetch('http://127.0.0.1:8000/apiaccounts/rolecreate/',{
            method:"POST",
            headers:{  
              Authorization: `Bearer ${user.access_token}`,
              "content-type":"application/json"},
              body:JSON.stringify(ind_data)
        })
        .then(res=>{
          Swal.fire('Role Created SuccessFully');
          setDefault(true);
            history.push('/dashboard/admin')
        }).catch((err) =>{
            console.log(err.message)
        })
    }
    const fetchData = () => {fetch("http://127.0.0.1:8000/apiaccounts/roleList/",{
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
      const Removeuser=(id)=>{
        if(window.confirm("Do you want to remove role")){
            fetch(`http://127.0.0.1:8000/apiaccounts/roledelete/${id}/`,{
                method:"DELETE",
                headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":"application/json"}
            }).then((res)=>{
                Swal.fire('removed successfully.');
                window.location.reload();
            }).catch((err)=>{
                console.log(err.message);
            })
        }
    }
      useEffect(()=>{
        fetchData();
      },[]);
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create Role</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="names" name="type_name" className="mb-4">
                    <Form.Label>Type name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Admin"  value={type_name} onChange={e=>type_namechange(e.target.value)}/>
                    </InputGroup>
                  </Form.Group>
                 
                  <Button variant="primary"  type="submit" icon={faUserPlus} className="w-100">
                    Add
                  </Button>
                </Form>
              </div>
            </Col>
            
         
          </Row>
          <Dropdown.Divider className="my-3 border-white" />
          <Card border="light" className="shadow-sm mb-0 p-4 p-lg-5 w-100 align-content-lg-center fmxw-600">
        <Card.Body className="pb-1">
        <div className="text-left text-md-left mb-4 mt-md-0">
                  <h6 className="mb-0">List Of Roles</h6>
                </div>
          <Table responsive className="table-centered  rounded mb-4">
            <thead className="thead-light">
            <tr>
                <th className="border-0">#</th>
                <th className="border-0"> Type Name</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((item)=>(
                  <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type_name}</td>
                  <td>
                      <Button onClick={()=>{Removeuser(item.id)}} size="sm" variant="primary"    className="m-1">Delete</Button>
                  </td>

                  </tr>
              ))}
                 
            </tbody>
          </Table>
        </Card.Body>
        </Card>
        </Container>
      </section>
      
      <Alert
          variant="warning"
          show={Default}
          onClose={() => onClose("warning")}>
  
          <div className="d-flex justify-content-between">
            <div>
              <FontAwesomeIcon icon={faBullhorn} className="me-1" />
              Role created successfully!!
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("warning")} />
          </div>
        </Alert>
    </main>
  );
};
