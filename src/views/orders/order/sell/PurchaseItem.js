import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import OrderDialog from '../../../../components/shared-components/OrderDialog';
import { acceptOrder, cancelOrder } from '../../../../redux/actions/Order';
import { formatMoney } from '../../../../utils/formatText';
import Chip from '@material-ui/core/Chip';

const LoadingButton = ({ title, loading, accept, handleClickOpen }) => {
  return (
    <div>
      <Button
        className={
          accept ? 'btn btn-primary mr-2' : 'btn btn-primary btn-block'
        }
        type="submit"
        disabled={loading}
        variant={accept ? 'success' : 'danger'}
        onClick={handleClickOpen}
      >
        <span
          className={accept ? 'fas fa-check mr-2' : 'fas fa-times mr-2'}
          role="status"
          aria-hidden="true"
        ></span>
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

const WaitingConfirm = ({
  item,
  loading,
  acceptOrder,
  cancelOrder,
  status,
}) => {
  const [open, setOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    acceptOrder(item && item.idOrderDetail);
    setOpen(false);
  };

  const handleDenyOpen = () => {
    setDenyOpen(true);
  };

  const handleDenyClose = () => {
    setDenyOpen(false);
  };

  const handleDeny = () => {
    cancelOrder(item && item.idOrderDetail);
    setOpen(false);
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
              {status === 2 && (
                <Chip
                  size="small"
                  label={`Đang chờ lấy hàng`}
                  style={{
                    padding: '15px 5px',
                    background: '#E98621',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
              {status === 1 && (
                <span className="ml-auto d-flex">
                  <LoadingButton
                    title="Xác nhận đơn hàng"
                    loading={loading}
                    accept={true}
                    handleClickOpen={handleClickOpen}
                  />
                  <LoadingButton
                    title="Hủy"
                    loading={loading}
                    accept={false}
                    handleClickOpen={handleDenyOpen}
                  />
                </span>
              )}
              {status === 4 && (
                <Chip
                  size="small"
                  label={`Đã giao`}
                  style={{
                    padding: '15px 5px',
                    background: '#3D9970',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
              {status === 5 && (
                <Chip
                  size="small"
                  label={`Đã hủy`}
                  style={{
                    padding: '15px 5px',
                    background: '#D21404',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
              {status === 6 && (
                <span
                  className="ml-auto d-flex"
                  style={{
                    background: '#2ab7ca',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: 4,
                  }}
                >
                  Đang đợi xác nhận đổi trả
                </span>
              )}
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
      <OrderDialog
        open={open}
        handleClose={handleClose}
        handleAccept={handleAccept}
        loading={loading}
        accept={true}
      />
      <OrderDialog
        open={denyOpen}
        handleClose={handleDenyClose}
        handleDeny={handleDeny}
        loading={loading}
        accept={false}
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
  acceptOrder,
  cancelOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingConfirm);
