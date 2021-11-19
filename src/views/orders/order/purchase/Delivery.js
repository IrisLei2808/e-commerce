import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";
import DeliveryItem from "./DeliveryItem";

const Delivery = (props) => {
  const { delivery, deliveryInfo } = props;
  return delivery && deliveryInfo ? (
    <>
      <Row>
        <Col>
          <ListGroup variant="flush">
            {delivery &&
              delivery.map((item) => (
                <PurchaseItem key={item.idOrderDetail} item={item} status={3} />
              ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            {deliveryInfo &&
              deliveryInfo.map((item) => (
                <DeliveryItem key={item.idOrderDetail} item={item} status={7} />
              ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  ) : (
    <NoOrderScreen />
  );
};

export default Delivery;
