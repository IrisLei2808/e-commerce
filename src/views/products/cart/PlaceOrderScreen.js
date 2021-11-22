import React, { useEffect, useState } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Message from "../../../components/shared-components/ErrorMessage";
import PlaceOrderModal from "../../../components/shared-components/PlaceOrderModal";
import { orderRequest, resetOrderType } from "../../../redux/actions/Order";
import { cartClearItems } from "../../../redux/actions/Cart";
import { getProfile } from "../../../redux/actions/Auth";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
} from "../../../redux/constants/Order";
import { formatMoney } from "../../../utils/formatText";

const PlaceOrderScreen = (props) => {
  const {
    loading,
    orderRequest,
    resetOrderType,
    type,
    message,
    cartClearItems,
    getProfile,
  } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    history.push("/purchase");
  };
  const goToHomePage = () => {
    history.push("/");
  };
  const own = JSON.parse(localStorage.getItem("userInfo"));
  let history = useHistory();
  const defaultImage =
    "https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg";

  const [cartStorage, setCartStorage] = useState(
    localStorage.getItem("productCartItems")
      ? JSON.parse(localStorage.getItem("productCartItems"))
      : []
  );

  const handleOrder = () => {
    orderRequest({
      id: own && own.id,
      product: cartStorage && cartStorage,
      token: own && own.token,
    });
  };

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [];

  useEffect(() => {
    if (userInfo.length === 0) {
      history.push("/login");
    }
  });

  cartStorage.itemsPrice = cartStorage.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cartStorage.totalPrice = Number(cartStorage.itemsPrice);

  useEffect(() => {
    switch (type) {
      case ORDER_CREATE_SUCCESS:
        cartClearItems();
        getProfile(own && own.token);
        setShow(true);
        break;
      case ORDER_CREATE_FAIL:
        setShow(true);
        break;
      default:
        break;
    }
    return function cleanup() {
      resetOrderType();
    };
  }, [type]);

  return (
    <>
      <Row>
        <Col md={8}>
          <h2>Sản phẩm</h2>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {cartStorage.length === 0 ? (
                <Message>Không có sản phẩm nào</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartStorage.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={
                              item &&
                              item.Images &&
                              item.Images[0] &&
                              item.Images[0].address
                                ? item.Images[0].address
                                : defaultImage
                            }
                            alt={item && item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {formatMoney(item.price)} =
                          {formatMoney(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Thông tin</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Sản phẩm</Col>
                  <Col>{formatMoney(cartStorage.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng</Col>
                  <Col>{formatMoney(cartStorage.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  className="btn btn-primary btn-block mt-3"
                  type="submit"
                  disabled={loading}
                  onClick={handleOrder}
                >
                  <span
                    className={
                      loading ? "spinner-border spinner-border-sm" : ""
                    }
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {loading ? "Loading..." : "Đặt hàng"}
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <PlaceOrderModal
          show={show}
          handleClose={handleClose}
          history={history}
          goToHomePage={goToHomePage}
          message={message}
        />
      </Row>
    </>
  );
};

const mapStateToProps = ({ order }) => {
  return {
    loading: order.loading,
    type: order.type,
    message: order.message,
  };
};

const mapDispatchToProps = {
  orderRequest,
  resetOrderType,
  cartClearItems,
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderScreen);
