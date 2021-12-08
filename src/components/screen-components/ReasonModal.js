import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from '../../components/layout-components/FileUpload';
import { imageRemove } from '../../redux/actions/Product';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const ReasonModal = (props) => {
  const [productId, setProductId] = useState();
  const [content, setContent] = useState();
  const [star, setStar] = useState();
  const own = JSON.parse(localStorage.getItem('userInfo'));

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const {
    image,
    open,
    handleCloseModal,
    type,
    feedbackProduct,
    item,
    notify,
    data,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    feedbackProduct(
      item && item.product && item.product[0] && item.product[0].idProduct,
      item && item.idOrderDetail,
      content,
      image,
      star,
      own && own.token
    );
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <i class="fas fa-comment-alt mr-2"></i>Lý do đổi trả hàng{' '}
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
            value={`${data && data.reasonRefund}`}
            style={{ height: '150px' }}
            required
            className="mb-2"
            readOnly
          />
          {image && image.length > 0 ? (
            <Row className="d-flex align-items-center py-3 w-100">
              {image.map((item, index) => (
                <Col sm={12} md={8} lg={4} xl={3}>
                  <Image
                    src={item.address}
                    style={{
                      width: 120,
                      height: 100,
                      cursor: 'pointer',
                      marginBottom: 20,
                    }}
                    onClick={() => openInNewTab(item.address)}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            'Không có hình ảnh'
          )}
          <DialogActions className="ml-auto">
            <Button Button onClick={handleCloseModal} color="primary">
              OK
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReasonModal);
