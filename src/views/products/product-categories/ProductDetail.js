import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MaterialRating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Rating from '../../../components/layout-components/Rating';
import Loader from '../../../components/shared-components/Spinner';
import {
  fetchProductDetails,
  getFeedback,
  resetProductType,
} from '../../../redux/actions/Product';
import { PRODUCT_DETAILS_SUCCESS } from '../../../redux/constants/Product';
import { formatMoney } from '../../../utils/formatText';
import { openInNewTab } from '../../../utils/utilities';

import styles from './product-detail.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 40,
    background: 'white',
    borderRadius: 5,
  },
  root2: {
    width: '100%',
    marginTop: 40,
    borderRadius: 5,
  },
  inline: {
    display: 'inline',
  },
}));

const ProductDetail = (props) => {
  const classes = useStyles();

  let history = useHistory();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState([]);
  const {
    fetchProductDetails,
    productDetails,
    getFeedback,
    feedback,
    loading,
    match,
    type,
    resetProductType,
  } = props;

  const own = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : 0;
  const isOwn = product && product.own === own.id;
  const isExchange =
    (product && product.status === 'EXCHANGE') ||
    (product && product.status === 'BOTH');
  const isBuy =
    (product && product.status === 'SELL') ||
    (product && product.status === 'BOTH');

  useEffect(() => {
    fetchProductDetails(match.params.id);
  }, [match]);

  useEffect(() => {
    getFeedback(match.params.id);
  }, [match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=1`);
  };

  const exchangeHandler = () => {
    if (!own) {
      history.push('/login?redirect=exchange');
    } else {
      history.push(`/exchange/${match.params.id}?qty=1`);
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case 'EXCHANGE':
        return 'Bạn muốn trao đổi ?';
      case 'BOTH':
        return 'Bạn muốn mua hoặc trao đổi ?';
      case 'SELL':
        return 'Bạn muốn mua sản phẩm ?';
      default:
        return 'Bạn muốn mua sản phẩm ?';
    }
  };

  useEffect(() => {
    switch (type) {
      case PRODUCT_DETAILS_SUCCESS:
        let arr = [];
        setProduct(productDetails);
        productDetails &&
          productDetails.Images.map((img) => {
            let obj = {};
            obj['original'] = img.address;
            obj['thumbnail'] = img.address;
            obj['originalHeight'] = 380;
            obj['thumbnailHeight'] = 68;
            arr.push(obj);
          });
        setImage(...image, arr);
        break;
      default:
        break;
    }
    return function cleanup() {
      resetProductType();
    };
  }, [type]);

  const defaultImage = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <div
            style={{
              padding: 20,
              background: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
            }}
          >
            <Row>
              <Col>
                <ImageGallery
                  items={image.length > 0 ? image : defaultImage}
                  showPlayButton={false}
                  autoPlay={true}
                />
              </Col>
              <Col>
                <h2 className={styles.productDetailName}>
                  {product && product.name}
                </h2>
                <Row
                  style={{
                    justifyContent: 'center',
                    padding: 10,
                  }}
                >
                  <span className="d-flex align-items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src={`${product && product.avatar}`}
                      sx={{ width: 24, height: 24 }}
                      className="mr-2"
                    />
                  </span>
                  <span
                    className={styles.rating}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <span style={{ fontWeight: 'bold', color: '#001f3f' }}>
                      {product && product.fullName}
                    </span>
                    <span style={{ cursor: 'pointer' }}>
                      <i class="fas fa-store mr-2"></i>Xem shop
                    </span>
                  </span>
                  {!isOwn && (
                    <span
                      className={styles.rating}
                      style={{ marginLeft: 'auto' }}
                    >
                      {getStatus(product && product.status)}
                    </span>
                  )}
                </Row>
                <p className={styles.description}>
                  {product && product.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    borderBottom: '1px solid black',
                    padding: '15px 0px',
                  }}
                >
                  {feedback && feedback.AVGStar > 0 ? (
                    <span style={{ color: 'orangered', fontSize: 17 }}>
                      <Rating
                        value={feedback && feedback.AVGStar}
                        text={`${feedback && feedback.AVGStar} reviews`}
                      />
                    </span>
                  ) : (
                    <span className={styles.rating}>Chưa có đánh giá nào</span>
                  )}
                </div>
                <Row
                  style={{
                    display: 'flex',
                    margin: '20px 0px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span className={styles.price}>
                      {formatMoney(product && product.price)}
                    </span>
                  </div>
                  <div>
                    {!isOwn && (
                      <span className={styles.exchange}>
                        Số lượng sản phẩm: {product && product.quantity}
                      </span>
                    )}
                  </div>
                </Row>
                {!isOwn && (
                  <div>
                    {isBuy && (
                      <Button
                        className={styles.cartbtn}
                        variant="danger"
                        onClick={addToCartHandler}
                        disabled={product && product.quantity <= 0}
                      >
                        <i class="fas fa-shopping-cart mr-2"></i>Thêm vào giỏ
                        hàng
                      </Button>
                    )}
                    {isExchange && (
                      <Button
                        className={styles.exchangbtn}
                        style={{ marginLeft: isBuy ? 20 : 0 }}
                        disabled={product && product.quantity <= 0}
                        onClick={exchangeHandler}
                      >
                        <i class="fas fa-exchange-alt mr-2"></i>Trao đổi
                      </Button>
                    )}
                  </div>
                )}
              </Col>
            </Row>
            {feedback &&
            feedback.listFeedback &&
            feedback.listFeedback.length > 0 ? (
              <List className={classes.root}>
                <span className="ml-1 px-3 py-4" style={{ fontWeight: 'bold' }}>
                  ĐÁNH GIÁ SẢN PHẨM
                </span>
                {feedback.listFeedback.map((item, index) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.fullName}
                        secondary={
                          <span
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <MaterialRating
                              name="simple-controlled"
                              defaultValue={0}
                              style={{ fontSize: 20 }}
                              className="mb-2"
                              readOnly
                              value={item.star}
                            />
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {item.content}
                            </Typography>
                            <Row style={{ margin: 'auto' }}>
                              {item.image &&
                                item.image.length > 0 &&
                                item.image.map((img) => (
                                  <Col
                                    sm={12}
                                    md={4}
                                    lg={2}
                                    xl={2}
                                    className="mt-3 mb-2 mr-3"
                                    style={{ padding: 0 }}
                                  >
                                    <Image
                                      src={`${img.address}`}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        cursor: 'pointer',
                                        padding: 0,
                                      }}
                                      onClick={() => openInNewTab(img.address)}
                                    />
                                  </Col>
                                ))}
                            </Row>
                          </span>
                        }
                      />
                    </ListItem>
                    {feedback.listFeedback.length - 1 !== index && (
                      <Divider variant="inset" component="li" />
                    )}
                  </>
                ))}
              </List>
            ) : (
              <div className={classes.root2}>
                <span className="ml-1 px-3 py-4" style={{ fontWeight: 'bold' }}>
                  SẢN PHẨM CHƯA CÓ ĐÁNH GIÁ NÀO !
                </span>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    productDetails: product.productDetails,
    loading: product.isLoading,
    type: product.type,
    feedback: product.feedback,
  };
};

const mapDispatchToProps = {
  fetchProductDetails,
  getFeedback,
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
