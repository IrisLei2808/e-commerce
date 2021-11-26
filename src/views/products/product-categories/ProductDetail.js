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

  const own = JSON.parse(localStorage.getItem('userInfo'));
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
        <div
          style={{
            padding: 20,
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
                  <span className={styles.rating}>
                    <Rating
                      value={feedback && feedback.AVGStar}
                      text={`${feedback && feedback.AVGStar} reviews`}
                    />
                  </span>
                ) : (
                  <span className={styles.rating}>Chưa có đánh giá nào</span>
                )}

                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                  className={styles.heart}
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg> */}
              </div>
              <Row
                style={{
                  display: 'flex',
                  margin: '20px 0px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Col>
                  <span className={styles.price}>
                    {formatMoney(product && product.price)}
                  </span>
                </Col>
                <Col>
                  {!isOwn && (
                    <span className={styles.exchange}>
                      {getStatus(product && product.status)}
                    </span>
                  )}
                </Col>
              </Row>
              {!isOwn && (
                <div className="mt-3">
                  {isBuy && (
                    <Button
                      className={styles.cartbtn}
                      variant="danger"
                      onClick={addToCartHandler}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  )}
                  {isExchange && (
                    <Button
                      className={styles.exchangbtn}
                      style={{ marginLeft: isBuy ? 20 : 40 }}
                    >
                      Trao đổi
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
                            <Col
                              sm={12}
                              md={4}
                              lg={2}
                              xl={2}
                              className="mt-3 mb-2 mr-3"
                              style={{ padding: 0 }}
                            >
                              <Image
                                src={
                                  'https://res.cloudinary.com/fpt-company/image/upload/v1637812747/yknyc7huieoobn4qustt.jpg'
                                }
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  cursor: 'pointer',
                                  padding: 0,
                                }}
                                //onClick={() => openInNewTab(item.url)}
                              />
                            </Col>
                            <Col
                              sm={12}
                              md={4}
                              lg={2}
                              xl={2}
                              className="mt-3 mb-2 mr-3"
                              style={{ padding: 0 }}
                            >
                              <Image
                                src={
                                  'https://res.cloudinary.com/fpt-company/image/upload/v1637812747/yknyc7huieoobn4qustt.jpg'
                                }
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  cursor: 'pointer',
                                  padding: 0,
                                }}
                                onClick={() =>
                                  openInNewTab(
                                    'https://res.cloudinary.com/fpt-company/image/upload/v1637812747/yknyc7huieoobn4qustt.jpg'
                                  )
                                }
                              />
                            </Col>
                            <Col
                              sm={12}
                              md={4}
                              lg={2}
                              xl={2}
                              className="mt-3 mb-2 mr-3"
                              style={{ padding: 0 }}
                            >
                              <Image
                                src={
                                  'https://res.cloudinary.com/fpt-company/image/upload/v1637812747/yknyc7huieoobn4qustt.jpg'
                                }
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  cursor: 'pointer',
                                  padding: 0,
                                }}
                                //onClick={() => openInNewTab(item.url)}
                              />
                            </Col>
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
