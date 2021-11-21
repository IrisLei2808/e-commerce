import React, { useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";
import Paging from "../../../../components/shared-components/Paging";

const WaitingConfirm = (props) => {
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  const { waitingDelivery } = props;
  return waitingDelivery && waitingDelivery.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {waitingDelivery &&
            waitingDelivery.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} status={2} />
            ))}
        </ListGroup>
      </Col>
      <Paging count={count} page={page} setPage={setPage} />
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

export default WaitingConfirm;
