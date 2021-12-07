import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import CancelRefundDialog from '../../../../components/layout-components/CancelRefundDialog';
import WantRefundDialog from '../../../../components/layout-components/WantRefundDialog';
import { acceptRefund, cancelRefund } from '../../../../redux/actions/Order';
import { formatMoney } from '../../../../utils/formatText';
import { useLocalStorage } from '../../../../utils/utilities';
import Chip from '@material-ui/core/Chip';

const LoadingButton = ({ title, loading, accept, handleClickOpen }) => {
  return (
    <div>
      <Button
        className={
          accept
            ? 'btn btn-primary px-3 py-2 mr-3'
            : 'btn btn-primary px-3 py-2'
        }
        type="submit"
        disabled={loading}
        variant={accept ? 'danger' : 'success'}
        onClick={handleClickOpen}
        style={{ padding: '10px 0px' }}
      >
        <i class="fas fa-times mr-2"></i>
        {title}
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const RefundItem = ({ item, status, acceptRefund, cancelRefund, loading }) => {
  const [user, setUser] = useLocalStorage('userInfo');
  const [open, setOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    acceptRefund(item && item.idOrderDetail, user && user.token);
  };

  const handleDenyClose = () => {
    setDenyOpen(false);
  };

  const handleDeny = () => {
    cancelRefund(item && item.idOrderDetail, user && user.token);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDenyOpen = () => {
    setDenyOpen(true);
  };

  const classes = useStyles();
  return (
    <>
      <ListGroup.Item
        style={{
          marginBottom: 20,
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
      >
        <ListGroup variant="flush" style={{ padding: '0px 20px' }}>
          <>
            <Row
              style={{
                borderBottom: '1px solid #E8E9EB',
                padding: 10,
                alignItems: 'center',
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={item && item.user && item.user[0] && item.user[0].avatar}
                className={classes.small}
              />
              <span
                style={{
                  alignSelf: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
                className="ml-2"
              >
                {item && item.user && item.user[0] && item.user[0].fullName}
              </span>
              <Chip
                size="small"
                label={`Bị từ chối đổi trả`}
                style={{
                  padding: '15px 5px',
                  background: '#D21404',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
                className="ml-auto"
              />
            </Row>
            <Row style={{ borderBottom: '1px solid #E8E9EB', padding: 20 }}>
              <Col md={2}>
                <Image
                  src={
                    item &&
                    item.product &&
                    item.product[0] &&
                    item.product[0].Images &&
                    item.product[0].Images[0] &&
                    item.product[0].Images[0].address
                  }
                  fluid
                  rounded
                  style={{ width: 100, height: 100 }}
                />
              </Col>
              <Col>
                <Row>
                  {item &&
                    item.product &&
                    item.product[0] &&
                    item.product[0].name}
                </Row>
                <Row className="mt-2">x{item && item.quantity}</Row>
              </Col>
              <Col md={4} style={{ color: '#d73211' }}>
                {formatMoney(item && item.price)}
              </Col>
            </Row>
            <Row style={{ padding: 20 }}>
              <Col style={{ display: 'flex' }}>
                <LoadingButton
                  title="Hủy yêu cầu trả hàng"
                  accept={true}
                  handleClickOpen={handleDenyOpen}
                />
                <LoadingButton
                  title="Đồng ý yêu cầu trả hàng"
                  accept={false}
                  handleClickOpen={handleClickOpen}
                />
              </Col>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginLeft: 'auto' }}
              >
                <i class="fas fa-receipt mr-2 fa-2x"></i>
                Tổng số tiền:
                <span
                  className="ml-2"
                  style={{ fontSize: 20, color: '#d73211' }}
                >
                  {formatMoney(item && item.price)}
                </span>
              </div>
            </Row>
          </>
        </ListGroup>
      </ListGroup.Item>
      <WantRefundDialog
        open={open}
        handleClose={handleClose}
        handleAccept={handleAccept}
        loading={loading}
        accept={true}
      />
      <CancelRefundDialog
        open={denyOpen}
        handleClose={handleDenyClose}
        handleDeny={handleDeny}
        loading={loading}
        accept={false}
        item={item}
      />
    </>
  );
};

const mapStateToProps = ({ order }) => {
  return {
    loading: order && order.orderLoading,
  };
};

const mapDispatchToProps = {
  acceptRefund,
  cancelRefund,
};

export default connect(mapStateToProps, mapDispatchToProps)(RefundItem);
