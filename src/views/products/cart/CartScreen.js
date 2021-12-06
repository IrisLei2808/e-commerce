import React, { useEffect, useState } from 'react';
import {
  addToCart,
  removeFromCart,
  resetCartType,
} from '../../../redux/actions/Cart';
import {
  fetchProductDetails,
  resetProductType,
} from '../../../redux/actions/Product';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import ErrorMessage from '../../../components/shared-components/ErrorMessage';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../utils/formatText';
import { PRODUCT_DETAILS_SUCCESS } from '../../../redux/constants/Product';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../../../redux/constants/Cart';
import { useHistory } from 'react-router-dom';

const CartScreen = (props) => {
  let history = useHistory();
  const {
    addToCart,
    resetCartType,
    match,
    location,
    cartItems,
    type,
    productDetails,
    fetchProductDetails,
    resetProductType,
    removeFromCart,
    cartType,
  } = props;
  const defaultImage =
    'https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg';
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const [cartStorage, setCartStorage] = useState(
    localStorage.getItem('productCartItems')
      ? JSON.parse(localStorage.getItem('productCartItems'))
      : []
  );
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : [];

  const checkoutHandler = () => {
    if (!userInfo) {
      history.push('/login?redirect=placeorder');
    } else {
      history.push('/placeorder');
    }
  };

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    switch (type) {
      case PRODUCT_DETAILS_SUCCESS:
        addToCart(productDetails, productId, qty);
        break;
      default:
        break;
    }
    return function cleanup() {
      resetProductType();
    };
  }, [type]);
  useEffect(() => {
    switch (cartType) {
      case CART_ADD_ITEM:
        localStorage.setItem('productCartItems', JSON.stringify(cartItems));
        setCartStorage(
          JSON.parse(localStorage.getItem('productCartItems')) || []
        );
        break;
      case CART_REMOVE_ITEM:
        localStorage.setItem('productCartItems', JSON.stringify(cartItems));
        setCartStorage(
          JSON.parse(localStorage.getItem('productCartItems')) || []
        );
        break;
      default:
        break;
    }
    return function cleanup() {
      resetCartType();
    };
  }, [cartType]);

  return (
    <Row>
      <Col md={8}>
        <h4>Giỏ hàng</h4>
        {cartStorage.length === 0 ? (
          <ErrorMessage>
            Chưa có sản phẩm nào <Link to="/">Quay lại</Link>
          </ErrorMessage>
        ) : (
          <ListGroup variant="flush">
            {cartStorage.map((item) => (
              <ListGroup.Item>
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
                      style={{ height: 75 }}
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.idProduct}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>{formatMoney(item.price)}</Col>
                  <Col md={2}>
                    <Row>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCart(
                            item,
                            item.idProduct,
                            Number(e.target.value)
                          )
                        }
                      >
                        {[...Array(item.quantity).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Row>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCart(item.idProduct)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                Tổng ({cartStorage.reduce((acc, item) => acc + item.qty, 0)})
                Sản phẩm
              </h4>
              {formatMoney(
                cartStorage.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                )
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                onClick={checkoutHandler}
                disabled={cartStorage.length === 0}
              >
                Kiểm tra sản phẩm
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cart, product }) => {
  return {
    cartItems: cart && cart.cartItems,
    type: product.type,
    cartType: cart.type,
    productDetails: product.productDetails,
    cartItemsFromStorage: cart.cartItemsFromStorage,
  };
};

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  resetCartType,
  fetchProductDetails,
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
