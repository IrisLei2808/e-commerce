import React, { useState, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import {
  countSellWaitingDelivery,
  sellWaitingDeliveryRequest,
} from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import DeliveryItem from "./DeliveryItem";
import { WAITING_FOR_DELIVERY } from "../../../../configs/Constants";

const WaitingDelivery = (props) => {
  const {
    sellWaitingDeliveryRequest,
    sellWaitingDelivery,
    countSellWaitingDelivery,
    purSellWaitingDeliveryCount,
  } = props;

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    sellWaitingDeliveryRequest(own && own.id, WAITING_FOR_DELIVERY, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countSellWaitingDelivery(own && own.id, WAITING_FOR_DELIVERY);
  }, []);

  return sellWaitingDelivery && sellWaitingDelivery.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {sellWaitingDelivery &&
            sellWaitingDelivery.map((item) => (
              <DeliveryItem key={item.idOrderDetail} item={item} status={2} />
            ))}
        </ListGroup>
        <Paging
          count={purSellWaitingDeliveryCount && purSellWaitingDeliveryCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={sellWaitingDeliveryRequest}
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
    sellWaitingDelivery: order && order.sellWaitingDelivery,
    purSellWaitingDeliveryCount: order && order.purSellWaitingDeliveryCount,
  };
};

const mapDispatchToProps = {
  sellWaitingDeliveryRequest,
  countSellWaitingDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDelivery);
