import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import { CANCELLED } from "../../../../configs/Constants";
import {
  sellCancelled,
  countSellCancelled,
} from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";

const Cancelled = (props) => {
  const { sellCancelled, purchase, countSellCancelled, purchaseCount } = props;

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    sellCancelled(own && own.id, CANCELLED, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countSellCancelled(own && own.id, CANCELLED);
  }, []);

  return purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} status={5} />
            ))}
        </ListGroup>
        <Paging
          count={purchaseCount && purchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={sellCancelled}
          own={own}
          type={CANCELLED}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    purchase: order && order.sellCancelled,
    purchaseCount: order && order.countSellCancelled,
  };
};

const mapDispatchToProps = {
  sellCancelled,
  countSellCancelled,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cancelled);
