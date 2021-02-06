import React from "react";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Side from "./newSide";
import './style/Dashboard.css'

const Dash = props => {

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                </Row>
            </Container>
        </>
        );
  };
  //const Dashboard = withRouter(Dash);

export default Dash;