
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link ,useHistory} from 'react-router-dom';
import qs from "querystring";
import { useState,useEffect } from 'react';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

import axios from 'axios';
export default () => {


    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(user)
    console.log(user.access_token)
    const fetchData = () => { fetch("http://127.0.0.1:8000/apiaccounts/profile/",{
     method:"GET",
     headers:{
       Authorization: `Bearer ${user.access_token}`,
       "content-type":"application/json"}
   }).then((res)=>{
     return res.json();
   }).then((resp)=>{
  
     if(resp.role == 2){
      history.push("/dashboard/industry");
    
     }
     if(resp.role == 1){
      history.push("/dashboard/admin")
      
     }
     if(resp.role == 3){
        history.push("/industry/evaluator1")
        
       }
       if(resp.role == 4){
        history.push("/industry/evaluator2")
        
       }
       if(resp.role == 5){
        history.push("/industry/evaluator3")
        
       }
   }).catch((err)=>{
     console.log(err.message);
   })}
     useEffect(()=>{
      fetchData();
         },[]);
  
  return (
    <main>
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5"></section></main>
  );
    
  
};
