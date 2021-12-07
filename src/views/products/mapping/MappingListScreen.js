import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ErrorMessage from '../../../components/shared-components/ErrorMessage';
import ExchangeDialog from '../../../components/shared-components/ExchangeDialog';
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
import { getMappingList } from '../../../redux/actions/Mapping';
import {
  fetchProductDetails,
  resetProductType,
} from '../../../redux/actions/Product';
import { EXCHANGE_SUCCESS } from '../../../redux/constants/Exchange';
import { formatMoney } from '../../../utils/formatText';
import { getMappingListStatus } from '../../../utils/status';
import { useLocalStorage } from '../../../utils/utilities';
import Chip from '@material-ui/core/Chip';

const LoadingButton = ({ title, loading, handleClickOpen, disabled, id }) => {
  return (
    <div>
      <Button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={disabled || loading}
        onClick={() => handleClickOpen(id)}
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

const MappingListScreen = (props) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('Bạn chưa chọn sản phẩm nào');
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [status, setStatus] = useState();
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
    getMappingList,
    cartType,
    listOwn,
    loading,
    exchangeLoading,
    exchangeType,
    exchangeMsg,
    resetExchangeType,
    listSuggest,
  } = props;
  const defaultImage =
    'https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg';
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const [userInfo, setUserInfo] = useLocalStorage('userInfo');

  const exchangeHandler = (id) => {
    history.push(`/mapping-list/${id}`);
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
    setStatus(item.status);
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
    getMappingList(userInfo && userInfo.token, {
      page: page,
      limit: limit,
    });
  }, [userInfo.token]);

  useEffect(() => {
    switch (exchangeType) {
      case EXCHANGE_SUCCESS:
        getMappingList(userInfo && userInfo.token);
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
        <h4>
          {listOwn && listOwn.length > 0
            ? 'Chọn 1 sản phẩm để xem gợi ý trao đổi'
            : 'Bạn không có sản phẩm được gợi ý trao đổi'}
        </h4>
        {listOwn && listOwn.length <= 0 ? (
          <ErrorMessage>
            Bạn chưa có sản phẩm nào để trao đổi <Link to="/">Quay lại</Link>
          </ErrorMessage>
        ) : (
          <ListGroup variant="flush">
            {listOwn &&
              listOwn.map(
                (item, index) =>
                  (item.product.status === 'EXCHANGE' ||
                    item.product.status === 'BOTH') && (
                    <ListGroup.Item
                      style={{ background: index === active && '#DCDEE6' }}
                    >
                      <Row>
                        <Col md={2}>
                          <Image
                            src={
                              item &&
                              item.product &&
                              item.product.images &&
                              item.product.images[0] &&
                              item.product.images[0].address
                                ? item &&
                                  item.product &&
                                  item.product.images[0].address
                                : defaultImage
                            }
                            alt={item && item.product && item.product.name}
                            fluid
                            rounded
                            style={{ height: 75 }}
                          />
                        </Col>
                        <Col md={2}>
                          <Link
                            to={`/product/${
                              item && item.product && item.product.idProduct
                            }`}
                          >
                            {item && item.product && item.product.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          {formatMoney(
                            item && item.product && item.product.price
                          )}
                        </Col>
                        <Col md={3}>
                          <Button
                            type="button"
                            onClick={() =>
                              viewProductDetail(
                                item && item.product && item.product.idProduct
                              )
                            }
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
                                name: item.product.name,
                                image:
                                  item.product.images[0] &&
                                  item.product.images[0].address,
                                price: item.product.price,
                                idProduct: item.product.idProduct,
                                status: item.statusRequestProduct,
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
                {status && (
                  <span style={{ textAlign: 'center' }} className="mt-2">
                    <Chip
                      size="small"
                      label={`${getMappingListStatus(status)}`}
                      style={{
                        padding: '15px 5px',
                        background: '#2ECC40',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    />
                  </span>
                )}
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
                id={idProduct && idProduct}
                disabled={!disabled}
                title="Xem gợi ý trao đổi"
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

const mapStateToProps = ({ cart, product, exchange, mapping }) => {
  return {
    cartItems: cart && cart.cartItems,
    type: product.type,
    cartType: cart.type,
    productDetails: product.productDetails,
    cartItemsFromStorage: cart.cartItemsFromStorage,
    listOwn: mapping.mappingList,
    loading: mapping.loading,
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
  getMappingList,
  resetProductType,
  resetExchangeType,
};

export default connect(mapStateToProps, mapDispatchToProps)(MappingListScreen);
