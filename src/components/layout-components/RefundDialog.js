import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from '../../components/layout-components/FileUpload';
import { imageRemove, resetProductType } from '../../redux/actions/Product';
import { refundProduct } from '../../redux/actions/Order';
import {
  REFUND_PRODUCT_FAIL,
  REFUND_PRODUCT_SUCCESS,
} from '../../redux/constants/Order';
import { IMAGE_REMOVE_SUCCESS } from '../../redux/constants/Product';
import { useLocalStorage } from '../../utils/utilities';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const RefundDialog = (props) => {
  const [user, setUser] = useLocalStorage('userInfo');
  const [image, setImage] = useState([]);
  const [productId, setProductId] = useState();
  const [content, setContent] = useState();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const {
    open,
    handleCloseModal,
    type,
    imageRemove,
    resetProductType,
    cloudinaryId,
    refundProduct,
    item,
    notify,
    loading,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    refundProduct(content, item && item.idOrderDetail, image, user.token);
  }

  useEffect(() => {
    switch (type) {
      case IMAGE_REMOVE_SUCCESS:
        let filteredImages = image.filter(
          (item) => item.cloudinaryId !== cloudinaryId && cloudinaryId
        );
        setImage(filteredImages);
        break;
      case REFUND_PRODUCT_SUCCESS:
        handleCloseModal();
        break;
      case REFUND_PRODUCT_FAIL:
        handleCloseModal();
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <i class="far fa-hand-point-left mr-2"></i>Yêu cầu trả hàng{' '}
        </DialogTitle>
        <Form
          style={{
            padding: '0px 20px',
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit}
        >
          <Form.Control
            as="textarea"
            placeholder="Nhập lý do trả hàng"
            style={{ height: '150px' }}
            required
            className="mb-2"
            onChange={(e) => setContent(e.target.value)}
          />
          <Row>
            <FileUpload image={image} setImage={setImage} />
          </Row>
          {image && image.length > 0 && (
            <Row className="d-flex align-items-center py-3 w-100">
              {image.map((item, index) => (
                <Col sm={12} md={8} lg={4} xl={3}>
                  <Badge
                    color="secondary"
                    badgeContent={<i class="fas fa-times"></i>}
                    style={{ cursor: 'pointer' }}
                    onClick={() => imageRemove(item && item.cloudinaryId)}
                  >
                    <Image
                      key={item.cloudinaryId}
                      src={item.url}
                      style={{
                        width: 120,
                        height: 100,
                        cursor: 'pointer',
                        marginBottom: 20,
                      }}
                      onClick={() => openInNewTab(item.url)}
                    />
                  </Badge>
                </Col>
              ))}
            </Row>
          )}
          <DialogActions className="ml-auto">
            <Button onClick={handleCloseModal} color="primary">
              Không
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              Gửi yêu cầu
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    type: product.type,
    cloudinaryId: product && product.cloudinaryId,
  };
};

const mapDispatchToProps = {
  imageRemove,
  refundProduct,
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(RefundDialog);
