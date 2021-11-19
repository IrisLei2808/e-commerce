import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";

const WaitingConfirm = (props) => {
  const { waitingDelivery } = props;
  return waitingDelivery ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {waitingDelivery &&
            waitingDelivery.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} status={2} />
            ))}
        </ListGroup>
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

export default WaitingConfirm;
