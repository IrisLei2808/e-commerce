import React from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../../../../components/shared-components/ErrorMessage";
import { formatMoney } from "../../../../utils/formatText";
import { Link } from "react-router-dom";
import PurchaseItem from "./PurchaseItem";
import NoOrderScreen from "../NoOrderScreen";

const WaitingConfirm = (props) => {
  const { purchase } = props;
  return purchase ? (
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
