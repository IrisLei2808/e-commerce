import React, { useState, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import {
  countWaitingDelivery,
  waitingDeliveryRequest,
} from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";
import { WAITING_FOR_DELIVERY } from "../../../../configs/Constants";

const WaitingDelivery = (props) => {
  const {
    waitingDeliveryRequest,
    waitingDelivery,
    countWaitingDelivery,
    purWaitingDeliveryCount,
  } = props;

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    waitingDeliveryRequest(own && own.id, WAITING_FOR_DELIVERY, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countWaitingDelivery(own && own.id, WAITING_FOR_DELIVERY);
  }, []);

  return waitingDelivery && waitingDelivery.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {waitingDelivery &&
            waitingDelivery.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} status={2} />
            ))}
        </ListGroup>
        <Paging
          count={purWaitingDeliveryCount && purWaitingDeliveryCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={waitingDeliveryRequest}
          own={own}
          type={WAITING_FOR_DELIVERY}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    waitingDelivery: order && order.waitingDelivery,
    purWaitingDeliveryCount: order && order.purWaitingDeliveryCount,
  };
};

const mapDispatchToProps = {
  waitingDeliveryRequest,
  countWaitingDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDelivery);
