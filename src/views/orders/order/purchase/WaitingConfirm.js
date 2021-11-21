import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import { WAITING_FOR_CONFIRM } from "../../../../configs/Constants";
import {
  purchaseRequest,
  countPurchase,
} from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";

const WaitingConfirm = (props) => {
  const { purchaseRequest, purchase, countPurchase, purchaseCount } = props;

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    purchaseRequest(own && own.id, WAITING_FOR_CONFIRM, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countPurchase(own && own.id, WAITING_FOR_CONFIRM);
  }, []);

  return purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} />
            ))}
        </ListGroup>
        <Paging
          count={purchaseCount && purchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={purchaseRequest}
          own={own}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    purchase: order && order.purchase,
    purchaseCount: order && order.purchaseCount,
  };
};

const mapDispatchToProps = {
  purchaseRequest,
  countPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingConfirm);
