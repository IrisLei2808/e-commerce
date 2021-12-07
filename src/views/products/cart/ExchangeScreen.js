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
  exchangeRequest,
  resetExchangeType,
} from '../../../redux/actions/Exchange';
import {
  fetchProductDetails,
  fetchProductOwn,
  resetProductType,
} from '../../../redux/actions/Product';
import { EXCHANGE_SUCCESS } from '../../../redux/constants/Exchange';
import { formatMoney } from '../../../utils/formatText';
import ExchangeDialog from '../../../components/shared-components/ExchangeDialog';
import { PRODUCT_OWN_REQUEST } from '../../../redux/constants/Product';

const LoadingButton = ({ title, loading, handleClickOpen, disabled }) => {
  return (
    <div>
      <Button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={disabled || loading}
        onClick={handleClickOpen}
        style={{ padding: '10px 0px' }}
      >
        <span
          className={loading ? 'spinner-border spinner-border-sm' : ''}
          role="status"
          aria-hidden="true"
        ></span>
        {title}
      </Button>
    </div>
  );
};

const ExchangeScreen = (props) => {
  const [name, setName] = useState('Bạn chưa chọn sản phẩm nào');
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [active, setActive] = useState();
  const [disabled, setDisabled] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  let history = useHistory();
  const {
    exchangeRequest,
    resetCartType,
    match,
    location,
    type,
    fetchProductDetails,
    resetProductType,
    fetchProductOwn,
    cartType,
    listOwn,
    loading,
    exchangeLoading,
    exchangeType,
    exchangeMsg,
    resetExchangeType,
  } = props;
  const defaultImage =
    'https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg';
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : [];

  const exchangeHandler = () => {
    exchangeRequest(userInfo && userInfo.id, productId, idProduct);
  };

  const viewProductDetail = (id) => {
    history.push(`/product/${id}`);
  };

  const selectProduct = (item) => {
    setName(item.name);
    setPrice(item.price);
    setImage(item.image);
    setActive(item.id);
    setIdProduct(item.idProduct);
    setDisabled(true);
  };

  const handleClose = () => {
    setShow(false);
    history.push('/');
  };

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    fetchProductOwn(userInfo && userInfo.token);
  }, [userInfo.token]);

  useEffect(() => {
    switch (exchangeType) {
      case EXCHANGE_SUCCESS:
        fetchProductOwn(userInfo && userInfo.token);
        setMessage(exchangeMsg && exchangeMsg);
        setShow(true);
      default:
        break;
    }
    return function cleanup() {
      resetExchangeType();
    };
  }, [exchangeType]);

  useEffect(() => {
    switch (type) {
      default:
        break;
    }
    return function cleanup() {
      resetProductType();
    };
  }, [type]);

  return loading ? (
    <Loader />
  ) : (
    <Row>
      <Col md={8}>
        <h4>Chọn 1 sản phẩm để trao đổi</h4>
        {listOwn && listOwn.length <= 0 ? (
          <ErrorMessage>
            Bạn chưa có sản phẩm nào để trao đổi <Link to="/">Quay lại</Link>
          </ErrorMessage>
        ) : (
          <ListGroup variant="flush">
            {listOwn &&
              listOwn.map(
                (item, index) =>
                  (item.status === 'EXCHANGE' || item.status === 'BOTH') && (
                    <ListGroup.Item
                      style={{ background: index === active && '#DCDEE6' }}
                    >
                      <Row>
                        <Col md={2}>
                          <Image
                            src={
                              item &&
                              item.images &&
                              item.images[0] &&
                              item.images[0].address
                                ? item.images[0].address
                                : defaultImage
                            }
                            alt={item && item.name}
                            fluid
                            rounded
                            style={{ height: 75 }}
                          />
                        </Col>
                        <Col md={2}>
                          <Link to={`/product/${item.idProduct}`}>
                            {item.name}
                          </Link>
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
                                image: item.images[0] && item.images[0].address,
                                price: item.price,
                                idProduct: item.idProduct,
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
                  )
              )}
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
              <LoadingButton
                handleClickOpen={exchangeHandler}
                disabled={!disabled}
                title="Thực hiện trao đổi"
                loading={exchangeLoading}
              />
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <ExchangeDialog
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        message={message}
      />
    </Row>
  );
};

const mapStateToProps = ({ cart, product, exchange }) => {
  return {
    cartItems: cart && cart.cartItems,
    type: product.type,
    cartType: cart.type,
    productDetails: product.productDetails,
    cartItemsFromStorage: cart.cartItemsFromStorage,
    listOwn: product.listOwn,
    loading: product.isLoading,
    exchangeLoading: exchange.loading,
    exchangeType: exchange.type,
    exchangeMsg: exchange.exchangeMsg,
  };
};

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  exchangeRequest,
  resetCartType,
  fetchProductDetails,
  fetchProductOwn,
  resetProductType,
  resetExchangeType,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeScreen);
