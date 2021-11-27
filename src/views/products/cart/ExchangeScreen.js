import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ErrorMessage from '../../../components/shared-components/ErrorMessage';
import Loader from '../../../components/shared-components/Spinner';
import {
  addToCart,
  removeFromCart,
  resetCartType,
} from '../../../redux/actions/Cart';
import {
  fetchProductDetails,
  fetchProductOwn,
  resetProductType,
} from '../../../redux/actions/Product';
import { PRODUCT_DETAILS_SUCCESS } from '../../../redux/constants/Product';
import { formatMoney } from '../../../utils/formatText';

const ExchangeScreen = (props) => {
  const [name, setName] = useState('Bạn chưa chọn sản phẩm nào');
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [active, setActive] = useState();
  const [disabled, setDisabled] = useState(false);

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
    fetchProductOwn,
    cartType,
    listOwn,
    loading,
  } = props;
  const defaultImage =
    'https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg';
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

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

  const viewProductDetail = (id) => {
    history.push(`/product/${id}`);
  };

  const selectProduct = (item) => {
    setName(item.name);
    setPrice(item.price);
    setImage(item.image);
    setActive(item.id);
    setDisabled(true);
  };

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    fetchProductOwn(userInfo && userInfo.token);
  }, [userInfo.token]);

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
      default:
        break;
    }
    return function cleanup() {
      resetCartType();
    };
  }, [cartType]);

  return loading ? (
    <Loader />
  ) : (
    <Row>
      <Col md={8}>
        <h1>Chọn 1 sản phẩm để trao đổi</h1>
        {listOwn && listOwn.length <= 0 ? (
          <ErrorMessage>
            Bạn chưa có sản phẩm nào để trao đổi <Link to="/">Quay lại</Link>
          </ErrorMessage>
        ) : (
          <ListGroup variant="flush">
            {listOwn &&
              listOwn.map((item, index) => (
                <ListGroup.Item
                  style={{ background: index === active && '#DCDEE6' }}
                >
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
                    <Col md={2}>
                      <Link to={`/product/${item.idProduct}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{formatMoney(item.price)}</Col>
                    <Col md={3}>
                      <Button
                        type="button"
                        onClick={() => viewProductDetail(item.idProduct)}
                        className="w-100"
                        variant="light"
                      >
                        <i class="fas fa-eye mr-2"></i>
                        Xem chi tiết
                      </Button>
                    </Col>
                    <Col md={3}>
                      <Button
                        type="button"
                        variant="info"
                        onClick={() =>
                          selectProduct({
                            id: index,
                            name: item.name,
                            image: item.Images[0] && item.Images[0].address,
                            price: item.price,
                          })
                        }
                        className="w-100"
                      >
                        <i class="far fa-hand-pointer mr-2"></i>
                        Chọn sản phẩm
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {name}
                </h4>
                {price && formatMoney(price)}
                <Col className="w-80 mt-3">
                  {image && (
                    <Card.Img
                      variant="top"
                      style={{ height: '250px', width: '100%' }}
                      src={image}
                    />
                  )}
                </Col>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                onClick={checkoutHandler}
                disabled={!disabled}
              >
                Thực hiện trao đổi
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
    listOwn: product.listOwn,
    loading: product.isLoading,
  };
};

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  resetCartType,
  fetchProductDetails,
  fetchProductOwn,
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeScreen);
