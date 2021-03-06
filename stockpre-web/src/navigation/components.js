import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { StockSearchComponent } from "./search";

export function StockLink(props) {
  const { stock } = props;
  const handleStockLink = (event) => {
    event.preventDefault();
    window.location.href = `/stocks/${stock.ticker}`;
  };
  return <span onClick={handleStockLink}>{stock.ticker} </span>;
}

export function NavigationComponent(props) {
  return (
    <Container>
      <Row className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <Col>
          {" "}
          <StockSearchComponent />{" "}
        </Col>
        <Col>
          {" "}
          <HomeLink />{" "}
        </Col>
        <Col>
          {" "}
          <ProfileLink />{" "}
        </Col>
      </Row>
    </Container>
  );
}

function HomeLink(props) {
  const handleHomeLink = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };
  return <span onClick={handleHomeLink}>Home</span>;
}

function ProfileLink(props) {
  const handleProfileLink = (event) => {
    event.preventDefault();
    window.location.href = "/profile";
  };
  return <span onClick={handleProfileLink}>Profile</span>;
}
