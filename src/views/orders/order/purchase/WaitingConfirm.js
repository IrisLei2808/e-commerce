import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import PurchaseItem from "./PurchaseItem";
import NoOrderScreen from "../NoOrderScreen";

const WaitingConfirm = (props) => {
  const { purchase } = props;
  return purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} />
            ))}
        </ListGroup>
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

export default WaitingConfirm;
