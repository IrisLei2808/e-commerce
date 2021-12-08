import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import {
  Button,
  Col,
  Image,
  ListGroup,
  PopoverContent,
  PopoverTitle,
  Row,
} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../../utils/formatText';
import {
  receiveProduct,
  resetOrderType,
} from '../../../../redux/actions/Order';
import ReceiveProductModal from '../../../../components/shared-components/ReceiveProductModal';
import RefundDialog from '../../../../components/layout-components/RefundDialog';
import Chip from '@material-ui/core/Chip';

const LoadingButton = ({ title, loading, accept, handleClickOpen }) => {
  return (
    <div>
      <Button
        className={
          accept ? 'btn btn-primary btn-block' : 'btn btn-primary btn-block'
        }
        type="submit"
        disabled={loading}
        variant={accept ? 'success' : 'danger'}
        onClick={handleClickOpen}
        style={{ padding: '10px 0px' }}
      >
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
  status,
  receiveProduct,
  resetOrderType,
  loading,
}) => {
  const [open, setOpen] = useState(false);
  const [refund, setRefund] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenRefund = () => {
    setRefund(true);
  };

  const handleRefundClose = () => {
    setRefund(false);
  };

  const joinExchange = () => {
    receiveProduct(item && item.idOrderDetail);
  };

  const popover = (
    <Popover id="popover-basic">
      <PopoverTitle>
        <i class="fas fa-shipping-fast mr-2"></i>Đang giao
      </PopoverTitle>
      <PopoverContent style={{ fontSize: 15 }}>
        {item && item.transport}
      </PopoverContent>
    </Popover>
  );

  const timePopover = (
    <Popover id="popover-basic">
      <PopoverTitle>
        <i class="fas fa-exclamation mr-2"></i>Lưu ý
      </PopoverTitle>
      <PopoverContent style={{ fontSize: 15 }}>
        Vui lòng kiểm tra tất cả các sản phẩm trong đơn hàng trước khi xác nhận
        đã nhận hàng, nếu phát sinh vấn đề, bạn có thể yêu cầu trả hàng/hoàn
        tiền cho đến ngày{' '}
        <span style={{ fontWeight: 'bold' }}>
          {item && item.timeLimitAccept}
        </span>
        . Sau ngày này, bạn sẽ không thể yêu cầu trả hàng/hoàn tiền nữa
      </PopoverContent>
    </Popover>
  );
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
              {status === 3 && (
                <span className="ml-auto d-flex align-items-center">
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={popover}
                  >
                    <a
                      style={{ textDecoration: 'none', fontSize: 15 }}
                      className="suggest"
                    >
                      <i class="fas fa-truck mr-1"></i>Trạng thái giao hàng
                    </a>
                  </OverlayTrigger>
                  <Chip
                    size="small"
                    label={`Đang giao`}
                    style={{
                      padding: '15px 5px',
                      background: '#2ECC40',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                    className="ml-5"
                  />
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
                    item.product[0].images &&
                    item.product[0].images[0] &&
                    item.product[0].images[0].address
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
            <Row
              style={{
                padding: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {item && item.timeLimitAccept && (
                <>
                  <Col>
                    <span style={{ fontSize: 12, color: '#746D69' }}>
                      Bạn hài lòng với sản phẩm đã nhận? Nếu có, chọn "Đã nhận
                      hàng". Nếu không, vui lòng chọn "Trả hàng/Hoàn Tiền" trước
                      ngày{' '}
                      <OverlayTrigger
                        trigger="hover"
                        placement="bottom"
                        overlay={timePopover}
                      >
                        <a className="suggest">{item.timeLimitAccept}</a>
                      </OverlayTrigger>
                    </span>
                  </Col>
                  <Col>
                    <LoadingButton
                      title="Đã nhận hàng"
                      accept={true}
                      handleClickOpen={handleOpen}
                    />
                  </Col>
                  <Col>
                    <LoadingButton
                      title="Yêu cầu trả hàng"
                      accept={false}
                      handleClickOpen={handleOpenRefund}
                    />
                  </Col>
                  <Col
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
                  </Col>
                </>
              )}
              {item && !item.timeLimitAccept && (
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
              )}
            </Row>
          </>
        </ListGroup>
      </ListGroup.Item>
      <ReceiveProductModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        joinExchange={joinExchange}
        loading={loading}
      />
      <RefundDialog
        open={refund}
        handleCloseModal={handleRefundClose}
        item={item}
        loading={loading}
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
  receiveProduct,
  resetOrderType,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingConfirm);
