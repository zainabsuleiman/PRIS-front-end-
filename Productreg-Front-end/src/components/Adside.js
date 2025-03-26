
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox,faUserPlus, faWarehouse, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link ,useHistory} from 'react-router-dom';
import {useEffect} from 'react';
import { Routes } from "../routes";
import ReactHero from "../assets/img/logo1.png";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
    const [userdata,userdatachange] = useState({});
    // const getToken = () => localStorage.getItem("token")
    // ? JSON.parse(localStorage.getItem("token"))
    // : null;
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
      userdatachange(resp);
      console.log(resp.role);
    }).catch((err)=>{
      console.log(err.message);
    })}
      useEffect(()=>{
       fetchData();
          },[]);
      const Logout = ()=> {
        localStorage.removeItem(user.access_token)
        window.location.reload();
        history.push('/examples/sign-in')
        window.location.reload();
        
      }
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.AdminDash.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi {userdata.username}</h6>
                  <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark" onClick={Logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="PRIS" link={Routes.Presentation.path} image={ReactHero} />

              <NavItem title="DashBoard" link={Routes.AdminDash.path} icon={faChartPie} />
              <NavItem title="AddUser" link={Routes.AddUser.path} icon={faUserPlus} />
              <NavItem title="IndustryList" link={Routes.IndustryList.path} icon={faWarehouse} />
              <NavItem title="Create Role" link={Routes.Addrole.path} icon={faUserAlt} />
              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
