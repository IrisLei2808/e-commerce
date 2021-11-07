import React, { useState, useEffect } from "react";
import { Col, Image, ListGroup, Row, Card, Button } from "react-bootstrap";
import Message from "../../../components/shared-components/ErrorMessage";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../utils/formatText";
import { useHistory } from "react-router-dom";

const PlaceOrderScreen = () => {
  let history = useHistory();
  const defaultImage =
    "https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg";

  const [cartStorage, setCartStorage] = useState(
    localStorage.getItem("productCartItems")
      ? JSON.parse(localStorage.getItem("productCartItems"))
      : []
  );

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [];

  console.log("DD: ", userInfo);
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

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartStorage.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartStorage.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
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
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Products</Col>
                  <Col>{formatMoney(cartStorage.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{formatMoney(cartStorage.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  title="Place Order"
                  type="button"
                  className="btn-block"
                  disabled={cartStorage.cartItems === 0}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
