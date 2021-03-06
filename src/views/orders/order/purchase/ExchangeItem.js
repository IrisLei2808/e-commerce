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
import WantChangeDialog from '../../../../components/layout-components/WantChangeDialog';
import { cancelExchange } from '../../../../redux/actions/Exchange';
import { formatMoney } from '../../../../utils/formatText';
import Chip from '@material-ui/core/Chip';

const LoadingButton = ({ title, loading, accept, handleClickOpen }) => {
  return (
    <div>
      <Button
        className={
          accept ? 'btn btn-primary px-3 py-2' : 'btn btn-primary btn-block'
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

const ExchangeItem = ({ item, status, cancelExchange, loading }) => {
  const [open, setOpen] = useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);

  const handleDenyOpen = () => {
    setDenyOpen(true);
  };

  const handleDenyClose = () => {
    setDenyOpen(false);
  };

  const handleDeny = () => {
    cancelExchange(item && item.idRequest);
  };

  const { myproduct } = item;
  const popover = (
    <Popover id="popover-basic">
      <PopoverTitle>Trao đổi</PopoverTitle>
      <PopoverContent style={{ fontSize: 15 }}>
        Bạn đã gửi yêu cầu trao đổi sản phẩm{' '}
        <span style={{ fontWeight: 'bold' }}>
          {myproduct && myproduct.name}
        </span>{' '}
        của bạn với sản phẩm{' '}
        <span style={{ fontWeight: 'bold' }}>
          {item && item.productExchange && item.productExchange.name}
        </span>{' '}
        của{' '}
        <span style={{ fontWeight: 'bold' }}>
          {item && item.user && item.user.fullName}
        </span>
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
        tiền cho đến ngày {item && item.timeLimitAccept}. Sau ngày này, bạn sẽ
        không thể yêu cầu trả hàng/hoàn tiền nữa
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
                src={item && item.user && item.user.avatar}
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
                {item && item.user && item.user.fullName}
              </span>
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
                    <i class="fas fa-sync-alt mr-1"></i>Thông tin trao đổi
                  </a>
                </OverlayTrigger>
                <Chip
                  size="small"
                  label={`Đang chờ xác nhận trao đổi`}
                  style={{
                    padding: '15px 5px',
                    background: '#00B4AB',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-5"
                />
              </span>
            </Row>
            <Row style={{ borderBottom: '1px solid #E8E9EB', padding: 20 }}>
              <Col md={2}>
                <Image
                  src={
                    myproduct &&
                    myproduct.images[0] &&
                    myproduct.images[0].address
                  }
                  fluid
                  rounded
                  style={{ width: 100, height: 100 }}
                />
              </Col>
              <Col>
                <Row>{myproduct && myproduct.name}</Row>
                <Row className="mt-2" style={{ color: '#d73211' }}>
                  {formatMoney(myproduct && myproduct.price)}
                </Row>
              </Col>
              <Col style={{ textAlign: 'center', margin: 'auto' }}>
                <i
                  class="fas fa-exchange-alt mr-1"
                  style={{ fontSize: 26, color: '#32a852' }}
                ></i>
              </Col>
              <Col md={2}>
                <Image
                  src={
                    item &&
                    item.productExchange &&
                    item.productExchange.images[0] &&
                    item.productExchange.images[0].address
                  }
                  fluid
                  rounded
                  style={{ width: 100, height: 100 }}
                />
              </Col>
              <Col>
                <Row>
                  {item && item.productExchange && item.productExchange.name}
                </Row>
                <Row className="mt-2" style={{ color: '#d73211' }}>
                  {formatMoney(
                    item && item.productExchange && item.productExchange.price
                  )}
                </Row>
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
                        <Link>{item.timeLimitAccept}</Link>
                      </OverlayTrigger>
                    </span>
                  </Col>
                  <Col>
                    <LoadingButton title="Đã nhận hàng" accept={true} />
                  </Col>
                  <Col>
                    <LoadingButton title="Yêu cầu trả hàng" accept={false} />
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
              <Col>
                <LoadingButton
                  title="Hủy yêu cầu trao đổi"
                  accept={true}
                  handleClickOpen={handleDenyOpen}
                />
              </Col>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginLeft: 'auto' }}
              >
                <i class="fas fa-receipt mr-2 fa-2x"></i>
                {item && item.priceDiff && item.priceDiff >= 0
                  ? 'Tiền nhận thêm'
                  : 'Tiền trả thêm'}
                <span
                  className="ml-2"
                  style={{ fontSize: 20, color: '#d73211' }}
                >
                  {formatMoney(Math.abs(item && item.priceDiff))}
                </span>
              </div>
            </Row>
          </>
        </ListGroup>
      </ListGroup.Item>
      <WantChangeDialog
        open={denyOpen}
        handleClose={handleDenyClose}
        handleDeny={handleDeny}
        loading={loading}
        accept={false}
      />
    </>
  );
};

const mapStateToProps = ({ exchange }) => {
  return {
    loading: exchange && exchange.exchangeLoading,
  };
};

const mapDispatchToProps = {
  cancelExchange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeItem);
