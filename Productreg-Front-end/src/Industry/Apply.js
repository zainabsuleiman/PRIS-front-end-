
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faMobile, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link ,useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
export default () => {
    const[product_form,formchange] = useState("");
    const[Brand_name,Brand_namechange] = useState("");
    const[intended_use,intendedchange] = useState("");
    const[shelf_life,shelflifechange] = useState("");
    const[target_user,targetuserchange] = useState("");
    const[food_additive,additivechange] = useState("");
    const[nutritional_info,nutritionchange] = useState("");
    const[food_ingredient,ingrechange] = useState("");
    const[storage_condition,conditionchange] = useState("");
    const[packaging_material,packageuserchange] = useState("");
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("token"));
    function handleSubmit(e){
        e.preventDefault();
        const ind_data ={product_form,Brand_name,intended_use,shelf_life,target_user,food_additive,nutritional_info,food_ingredient,packaging_material,storage_condition};
        fetch('http://127.0.0.1:8000/apiaccounts/Apply/',{
            method:"POST",
            headers:{
                Authorization: `Bearer ${user.access_token}`,
                "content-type":"application/json"},
            body:JSON.stringify(ind_data)
        })
        .then(res=>{
            Swal.fire('Application Sent Successfully');
            // window.location.reload();
            history.push('/dashboard/industry')
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
                  <h3 className="mb-0">Application</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group id="Brand_name" name="Brand_name" className="mb-4" >
                    <Form.Label>Brand Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={Brand_name} onChange={e=>Brand_namechange(e.target.value)}   />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="intended_use" name="intended_use" className="mb-4" >
                    <Form.Label>Intended Use</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={intended_use} onChange={e=>intendedchange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-4" id="product_form" name="product_form">
                <Form.Label>Product Form</Form.Label>
               <Form.Select  value={product_form} onChange={e=>formchange(e.target.value)}>
               <option>Select Form</option>
              <option>Solid</option>
              <option>Liquid</option>
            
           </Form.Select>
          </Form.Group>
                  <Form.Group id="target_user" name="target_user" className="mb-4" >
                    <Form.Label>Target User</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={target_user} onChange={e=>targetuserchange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="target_user" name="packaging_material" className="mb-4" >
                    <Form.Label>Packaging material</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={packaging_material} onChange={e=>packageuserchange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="shelf_life" name="shelf_life" className="mb-4" >
                    <Form.Label>Shelf Life</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faMobile} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={shelf_life} onChange={e=>shelflifechange(e.target.value)} />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="storage_condition"  name="storage_condition"className="mb-4" >
                    <Form.Label>Storage Condition</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="" value={storage_condition} onChange={e=>conditionchange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="food_ingredient" name="food_ingredient" className="mb-4" >
                    <Form.Label>Food Ingredient</Form.Label>
                    <InputGroup>
                      <InputGroup.Text >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="" value={food_ingredient} onChange={e=>ingrechange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="food_additives"  name="food_additives"  className="mb-4" >
                    <Form.Label>Food Additives</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faUserCircle} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="" value={food_additive} onChange={e=>additivechange(e.target.value)}  />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="nutritional_info"  name="nutritional_info"  className="mb-4" >
                    <Form.Label>Nutritional Information</Form.Label>
                    <InputGroup>
                      <InputGroup.Text  >
                        <FontAwesomeIcon icon={faMobile} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="" value={nutritional_info} onChange={e=>nutritionchange(e.target.value)} />
                     
                    </InputGroup>
                  </Form.Group>
                
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" value={true} className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button variant="primary" type="submit" className="w-100">
                    Apply
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
