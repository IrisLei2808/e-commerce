import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #fddb92, #d1fdff)",
        width: "100%",
      }}
    >
      <Col className="text-center py-3">
        Old Stuff Exchange ©2021 Created by Capstone Team
      </Col>
    </footer>
  );
};

export default Footer;
