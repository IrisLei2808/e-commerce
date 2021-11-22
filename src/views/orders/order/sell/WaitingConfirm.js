import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import { WAITING_FOR_CONFIRM } from "../../../../configs/Constants";
import { countSell, sellRequest } from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";

const WaitingConfirm = (props) => {
  const { sellRequest, purchase, countSell, sell, sellCount } = props;

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    sellRequest(own && own.id, WAITING_FOR_CONFIRM, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countSell(own && own.id, WAITING_FOR_CONFIRM);
  }, []);

  return sell && sell.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {sell &&
            sell.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} />
            ))}
        </ListGroup>
        <Paging
          count={sellCount && sellCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={sellRequest}
          own={own}
          type={WAITING_FOR_CONFIRM}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    sell: order && order.sell,
    sellCount: order && order.sellCount,
  };
};

const mapDispatchToProps = {
  sellRequest,
  countSell,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingConfirm);
