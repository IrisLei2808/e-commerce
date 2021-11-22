import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import { DELIVERY } from "../../../../configs/Constants";
import {
  countDelivery,
  deliveryRequest,
} from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import DeliveryItem from "./DeliveryItem";

const Delivery = (props) => {
  const { deliveryRequest, countDelivery, delivery, deliveryCount } = props;

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    deliveryRequest(own && own.id, DELIVERY, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countDelivery(own && own.id, DELIVERY);
  }, []);

  return delivery && delivery.length > 0 ? (
    <>
      <Row>
        <Col>
          <ListGroup variant="flush">
            {delivery &&
              delivery.map((item) => (
                <DeliveryItem key={item.idOrderDetail} item={item} status={3} />
              ))}
          </ListGroup>
          <Paging
            count={deliveryCount && deliveryCount}
            page={page}
            setPage={setPage}
            limit={limit}
            purchaseRequest={deliveryRequest}
            own={own}
            type={DELIVERY}
          />
        </Col>
      </Row>
    </>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    delivery: order && order.delivery,
    deliveryCount: order && order.deliveryCount,
  };
};

const mapDispatchToProps = {
  deliveryRequest,
  countDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
