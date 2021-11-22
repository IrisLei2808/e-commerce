import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import { COMPLETE_DELIVERY } from "../../../../configs/Constants";
import {
  sellCompleteDelivery,
  sellCountCompleteDelivery,
} from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";

const CompleteDelivery = (props) => {
  const {
    sellCompleteDelivery,
    purchase,
    sellCountCompleteDelivery,
    purchaseCount,
  } = props;

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    sellCompleteDelivery(own && own.id, COMPLETE_DELIVERY, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    sellCountCompleteDelivery(own && own.id, COMPLETE_DELIVERY);
  }, []);

  return purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} status={4} />
            ))}
        </ListGroup>
        <Paging
          count={purchaseCount && purchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={sellCompleteDelivery}
          own={own}
          type={COMPLETE_DELIVERY}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    purchase: order && order.sellCompleteDelivery,
    purchaseCount: order && order.countSellCompleteDelivery,
  };
};

const mapDispatchToProps = {
  sellCompleteDelivery,
  sellCountCompleteDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteDelivery);
