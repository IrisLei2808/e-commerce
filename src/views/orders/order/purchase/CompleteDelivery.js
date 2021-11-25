import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Paging from "../../../../components/shared-components/Paging";
import { COMPLETE_DELIVERY } from "../../../../configs/Constants";
import {
  completeDelivery,
  countCompleteDelivery,
} from "../../../../redux/actions/Order";
import NoOrderScreen from "../NoOrderScreen";
import PurchaseItem from "./PurchaseItem";
import { toast, ToastContainer } from "react-toastify";
import {
  FEEDBACK_PRODUCT_FAIL,
  FEEDBACK_PRODUCT_SUCCESS,
} from "../../../../redux/constants/Product";

const CompleteDelivery = (props) => {
  const {
    completeDelivery,
    purchase,
    countCompleteDelivery,
    purchaseCount,
    type,
  } = props;

  const notify = () => toast.success("Gửi đánh giá thành công!");
  const notifyFail = () =>
    toast.error("Không thể gửi đánh giá hoặc bạn đã đánh giá sản phẩm này!");

  const own = JSON.parse(localStorage.getItem("userInfo"));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    completeDelivery(own && own.id, COMPLETE_DELIVERY, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countCompleteDelivery(own && own.id, COMPLETE_DELIVERY);
  }, []);

  useEffect(() => {
    switch (type) {
      case FEEDBACK_PRODUCT_SUCCESS:
        notify();
        break;
      case FEEDBACK_PRODUCT_FAIL:
        notifyFail();
        break;
      default:
        break;
    }
  }, [type]);

  return purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <PurchaseItem
                key={item.idOrderDetail}
                item={item}
                status={4}
                notify={notify}
              />
            ))}
        </ListGroup>
        <Paging
          count={purchaseCount && purchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={completeDelivery}
          own={own}
          type={COMPLETE_DELIVERY}
        />
      </Col>
      <ToastContainer position="top-center" />
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order, product }) => {
  return {
    purchase: order && order.completeDelivery,
    purchaseCount: order && order.countCompleteDelivery,
    type: product.type,
  };
};

const mapDispatchToProps = {
  completeDelivery,
  countCompleteDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteDelivery);
