import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {
  feedbackProduct,
  imageRemove,
  resetProductType,
} from '../../redux/actions/Product';
import { cancelRefund } from '../../redux/actions/Order';
import {
  CANCEL_REFUND_FAIL,
  CANCEL_REFUND_SUCCESS,
} from '../../redux/constants/Order';
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

const CancelRefundDialog = (props) => {
  const [image, setImage] = useState([]);
  const [productId, setProductId] = useState();
  const [content, setContent] = useState();
  const [star, setStar] = useState();
  const [user, setUser] = useLocalStorage('userInfo');

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const { open, handleCloseModal, type, item, cancelRefund, loading } = props;

  function handleSubmit(event) {
    event.preventDefault();
    cancelRefund(item && item.idOrderDetail, content, user.token);
  }

  useEffect(() => {
    switch (type) {
      case CANCEL_REFUND_SUCCESS:
        handleCloseModal();
        break;
      case CANCEL_REFUND_FAIL:
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
          <i class="fas fa-times-circle mr-2"></i>Hủy yêu cầu trả hàng{' '}
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
            placeholder="Nhập lý do hủy yêu cầu trả hàng"
            style={{ height: '150px' }}
            required
            className="mb-2"
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <DialogActions className="ml-auto">
            <Button onClick={handleCloseModal} color="primary">
              Không
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              Hủy yêu cầu trả hàng
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
  feedbackProduct,
  resetProductType,
  cancelRefund,
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelRefundDialog);
