import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
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
import {
  acceptExchange,
  cancelExchange,
} from '../../../../redux/actions/Exchange';
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

const ExchangeItem = ({
  item,
  status,
  acceptExchange,
  cancelExchange,
  loading,
}) => {
  const [user, setUser] = useLocalStorage('userInfo');
  const [open, setOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    acceptExchange(item && item.idRequest, user && user.token);
  };

  const handleDenyClose = () => {
    setDenyOpen(false);
  };

  const handleDeny = () => {
    cancelExchange(item && item.idRequest);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDenyOpen = () => {
    setDenyOpen(true);
  };

  const { myproduct } = item;
  const popover = (
    <Popover id="popover-basic">
      <PopoverTitle>Trao ?????i</PopoverTitle>
      <PopoverContent style={{ fontSize: 15 }}>
        B???n ???? nh???n y??u c???u trao ?????i s???n ph???m{' '}
        <span style={{ fontWeight: 'bold' }}>
          {myproduct && myproduct.name}
        </span>{' '}
        c???a b???n v???i s???n ph???m{' '}
        <span style={{ fontWeight: 'bold' }}>
          {item && item.productExchange && item.productExchange.name}
        </span>{' '}
        c???a{' '}
        <span style={{ fontWeight: 'bold' }}>
          {item && item.user && item.user.fullName}
        </span>
      </PopoverContent>
    </Popover>
  );

  const timePopover = (
    <Popover id="popover-basic">
      <PopoverTitle>
        <i class="fas fa-exclamation mr-2"></i>L??u ??
      </PopoverTitle>
      <PopoverContent style={{ fontSize: 15 }}>
        Vui l??ng ki???m tra t???t c??? c??c s???n ph???m trong ????n h??ng tr?????c khi x??c nh???n
        ???? nh???n h??ng, n???u ph??t sinh v???n ?????, b???n c?? th??? y??u c???u tr??? h??ng/ho??n
        ti???n cho ?????n ng??y {item && item.timeLimitAccept}. Sau ng??y n??y, b???n s???
        kh??ng th??? y??u c???u tr??? h??ng/ho??n ti???n n???a
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
                    <i class="fas fa-sync-alt mr-1"></i>Th??ng tin trao ?????i
                  </a>
                </OverlayTrigger>
                <Chip
                  size="small"
                  label={`??ang ch??? x??c nh???n trao ?????i`}
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
                      B???n h??i l??ng v???i s???n ph???m ???? nh???n? N???u c??, ch???n "???? nh???n
                      h??ng". N???u kh??ng, vui l??ng ch???n "Tr??? h??ng/Ho??n Ti???n" tr?????c
                      ng??y{' '}
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
                    <LoadingButton title="???? nh???n h??ng" accept={true} />
                  </Col>
                  <Col>
                    <LoadingButton title="Y??u c???u tr??? h??ng" accept={false} />
                  </Col>
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    style={{ marginLeft: 'auto' }}
                  >
                    <i class="fas fa-receipt mr-2 fa-2x"></i>
                    T???ng s??? ti???n:
                    <span
                      className="ml-2"
                      style={{ fontSize: 20, color: '#d73211' }}
                    >
                      {formatMoney(item && item.price)}
                    </span>
                  </Col>
                </>
              )}
              <Col style={{ display: 'flex' }}>
                <LoadingButton
                  title="H???y y??u c???u trao ?????i"
                  accept={true}
                  handleClickOpen={handleDenyOpen}
                />
                <LoadingButton
                  title="?????ng ?? trao ?????i"
                  accept={false}
                  handleClickOpen={handleClickOpen}
                />
              </Col>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginLeft: 'auto' }}
              >
                <i class="fas fa-receipt mr-2 fa-2x"></i>
                {item && item.priceDiff && item.priceDiff >= 0
                  ? 'Ti???n nh???n th??m'
                  : 'Ti???n tr??? th??m'}
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
        open={open}
        handleClose={handleClose}
        handleAccept={handleAccept}
        loading={loading}
        accept={true}
      />
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
  acceptExchange,
  cancelExchange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeItem);
