
import React, { useState ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faMobile, faUserCircle ,faComment} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link ,useHistory,useParams} from 'react-router-dom';
import { faCcDiscover, faReadme } from "@fortawesome/free-brands-svg-icons";
import Swal from 'sweetalert2'
export default () => {
    const {id} = useParams();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("token"));
    const[laboratory_analysis,labchange] = useState("");
    const[standards,standchange] = useState("");
    const[recommendation,recommchange] = useState("");
    const[query,querychange] = useState("");
    const[comments,commentschange] = useState("");
    const data ={laboratory_analysis,standards,recommendation,query,comments};
    
        console.log(id);
       useEffect(()=>{
           fetch(`FeedUpApp/` +id ,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":"application/json"}
            }).then((res)=>{
               return res.json();
           }).then((resp)=>{
            labchange(resp.lab);
            standchange(resp.standards);
            recommchange(resp.recomm);
            querychange(resp.query);
            commentschange(resp.comments);
           }).catch((err)=>{
               console.log(err.message);
           })
       },[]);
    function handleSubmit(e){
      e.preventDefault();
      fetch(`FeedUpApp/` +id,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":"application/json"},
                body:JSON.stringify(data)
           
        })
        .then(res=>{
           Swal('application Feedback updated');

           history.push('/industry/evaluator2');
            
        }).catch((err) =>{
            console.log(err.message)
        })
        
    }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          
          <Row className="justify-content-center form-bg-image" >
            <Col xs={8} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Application Feedback</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-4"  name="standards">
                <Form.Label>standards</Form.Label>
               <Form.Select  value={standards} onChange={e=>standchange(e.target.value)}>
              <option>High Risk Food</option>
              <option>Low Risk Food</option>
            
           </Form.Select>
          </Form.Group>
                  <Form.Group  name="recommendation" className="mb-4" >
                    <Form.Label>recommendation</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faReadme} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={recommendation} onChange={e=>recommchange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  
                  
                  <Form.Group  name="laboratory_analysis"  className="mb-4" >
                    <Form.Label>Laboratory Analysis</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faComment} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={laboratory_analysis} onChange={e=>labchange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group  name="query"  className="mb-4" >
                    <Form.Label>Query</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faCcDiscover} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="" value={query} onChange={e=>querychange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group  name="comments"  className="mb-4" >
                    <Form.Label>Comments</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faComment} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="" value={comments} onChange={e=>commentschange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                   send
                  </Button>
                </Form>
              </div>
            </Col>
            
          </Row>
          
        </Container>
      </section>
    </main>
  );
};
