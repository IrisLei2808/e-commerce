import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
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
import CancelRefundDialog from '../../../../components/layout-components/CancelRefundDialog';
import WantRefundDialog from '../../../../components/layout-components/WantRefundDialog';
import ConfirmModal from '../../../../components/screen-components/ConfirmModal';
import {
  acceptRefund,
  cancelRefund,
  reportAdmin,
} from '../../../../redux/actions/Order';
import { formatMoney } from '../../../../utils/formatText';
import { useLocalStorage } from '../../../../utils/utilities';

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
        <i class="fas fa-flag mr-2"></i>
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

const RefundItem = ({
  item,
  status,
  acceptRefund,
  cancelRefund,
  reportAdmin,
  loading,
}) => {
  const [user, setUser] = useLocalStorage('userInfo');
  const [open, setOpen] = React.useState(false);
  const [reportOpen, setReportOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <PopoverTitle>
        <i class="fas fa-exclamation mr-2"></i>L??u ??
      </PopoverTitle>
      <PopoverContent style={{ fontSize: 15 }}>
        N???u ng?????i b??n t??? ch???i y??u c???u ?????i tr???, b???n vui l??ng click v??o n??t "Khi???u
        n???i" ????? g???i khi???u n???i ?????n h??? th???ng. Sau ng??y{' '}
        <span style={{ fontWeight: 'bold' }}>
          {item && item.timeLimitAccept}
        </span>{' '}
        , n???u kh??ng khi???u n???i, h??? th???ng s??? t??? x??c nh???n l?? giao d???ch th??nh c??ng
        v?? tr??? ti???n cho ng?????i b??n
      </PopoverContent>
    </Popover>
  );

  const reason = (
    <Popover id="popover-basic">
      <PopoverTitle>
        <i class="fas fa-exclamation mr-2"></i>L?? do t??? ch???i ?????i tr???
      </PopoverTitle>
      <PopoverContent style={{ fontSize: 15 }}>
        {item && item.description}
      </PopoverContent>
    </Popover>
  );

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

  const handleReportOpen = () => {
    setReportOpen(true);
  };

  const handleReportClose = () => {
    setReportOpen(false);
  };

  const handleReport = () => {
    reportAdmin(item && item.idOrderDetail);
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
              {item && item.status == 11 && (
                <span className="ml-auto d-flex align-items-center">
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={reason}
                  >
                    <a
                      style={{
                        textDecoration: 'none',
                        fontSize: 15,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      className="suggest"
                    >
                      <i class="fas fa-comment-alt mr-1"></i>Xem l?? do t??? ch???i
                      ?????i tr???
                    </a>
                  </OverlayTrigger>
                  <Chip
                    size="small"
                    label={`???? b??? t??? ch???i ?????i tr???`}
                    style={{
                      padding: '15px 5px',
                      background: '#D21404',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                    className="ml-5"
                  />
                </span>
              )}
              {item && item.status == 6 && (
                <Chip
                  size="small"
                  label={`??ang ch??? ng?????i b??n x??c nh???n`}
                  style={{
                    padding: '15px 5px',
                    background: '#fe4a49',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
              {item && item.status == 9 && (
                <Chip
                  size="small"
                  label={`Ng?????i giao ???? l???y ????n h??ng ?????i tr???`}
                  style={{
                    padding: '15px 5px',
                    background: '#2ECC40',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
              {item && item.status == 10 && (
                <Chip
                  size="small"
                  label={`????n h??ng ?????i tr??? ???? ???????c giao th??nh c??ng`}
                  style={{
                    padding: '15px 5px',
                    background: '#3D9970',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
              {item && item.status == 12 && (
                <Chip
                  size="small"
                  label={`??ang ch??? h??? th???ng gi???i quy???t`}
                  style={{
                    padding: '15px 5px',
                    background: '#2ab7ca',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
              {item && item.status == 8 && (
                <Chip
                  size="small"
                  label={`???? ???????c ch???p nh???n ?????i tr???`}
                  style={{
                    padding: '15px 5px',
                    background: '#3D9970',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                  className="ml-auto"
                />
              )}
            </Row>
            <Row style={{ borderBottom: '1px solid #E8E9EB', padding: 20 }}>
              <Col md={2}>
                <Image
                  src={
                    item &&
                    item.product &&
                    item.product.images[0] &&
                    item.product.images[0].address
                  }
                  fluid
                  rounded
                  style={{ width: 100, height: 100 }}
                />
              </Col>
              <Col>
                <Row>
                  {item && item.product && item.product && item.product.name}
                </Row>
                <Row className="mt-2">x{item && item.quantity}</Row>
              </Col>
              <Col md={4} style={{ color: '#d73211' }}>
                {formatMoney(item && item.price)}
              </Col>
            </Row>
            <Row style={{ padding: 20 }}>
              {item && item.status == 11 && (
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <LoadingButton
                    title="Khi???u n???i"
                    accept={true}
                    handleClickOpen={handleReportOpen}
                  />
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={popover}
                  >
                    <a
                      style={{ textDecoration: 'none', fontSize: 15 }}
                      className="suggest"
                    >
                      <i class="fas fa-info-circle mr-1"></i>L??u ?? khi ????n h??ng
                      b??? t??? ch???i ?????i tr???
                    </a>
                  </OverlayTrigger>
                </Col>
              )}
              <div
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
      <ConfirmModal
        open={reportOpen}
        handleClose={handleReportClose}
        loading={loading}
        reportAdmin={handleReport}
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
  reportAdmin,
};

export default connect(mapStateToProps, mapDispatchToProps)(RefundItem);
