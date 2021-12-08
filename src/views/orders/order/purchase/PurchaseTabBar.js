import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DELIVERY, WAITING_FOR_CONFIRM } from '../../../../configs/Constants';
import {
  countWantPurchase,
  resetExchangeType,
  wantChangePurchase,
} from '../../../../redux/actions/Exchange';
import {
  countDelivery,
  countPurchase,
  countRefundRequest,
  deliveryRequest,
  getRefundRequest,
  purchaseRequest,
  resetOrderType,
} from '../../../../redux/actions/Order';
import { CANCEL_EXCHANGE_SUCCESS } from '../../../../redux/constants/Exchange';
import {
  CANCEL_ORDER_SUCCESS,
  RECEIVE_PRODUCT_SUCCESS,
  REFUND_PRODUCT_SUCCESS,
  REPORT_ADMIN_SUCCESS,
} from '../../../../redux/constants/Order';
import { useLocalStorage } from '../../../../utils/utilities';
import Cancelled from './Cancelled';
import CompleteDelivery from './CompleteDelivery';
import Delivery from './Delivery';
import Exchange from './Exchange';
import Return from './Return';
import WaitingConfirm from './WaitingConfirm';
import WaitingDelivery from './WaitingDelivery';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    textTransform: 'none',
  },
}));

const ScrollableTabsButtonAuto = (props) => {
  const {
    type,
    exchangeType,
    purchaseRequest,
    countPurchase,
    countWantPurchase,
    deliveryRequest,
    countDelivery,
    wantChangePurchase,
    resetExchangeType,
    getRefundRequest,
    countRefundRequest,
  } = props;
  const own = JSON.parse(localStorage.getItem('userInfo'));
  const [user, setUser] = useLocalStorage('userInfo');

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const notifyCancel = () => toast.success('Đã hủy đơn hàng!');
  const notifyCancelExchange = () => toast.success('Đã hủy yêu cầu trao đổi!');
  const receiveProduct = () =>
    toast.success('Cảm ơn bạn đã xác nhận đơn hàng này!');
  const refundProduct = () => toast.success('Đã gửi yêu cầu trả hàng!');
  const report = () =>
    toast.success('Khiếu nại của bạn đã được gửi lên hệ thống để xét duyệt!');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (type) {
      case CANCEL_ORDER_SUCCESS:
        purchaseRequest(own && own.id, WAITING_FOR_CONFIRM, {
          page: 1,
          limit: 5,
        });
        countPurchase(own && own.id, WAITING_FOR_CONFIRM);
        notifyCancel();
        break;
      case RECEIVE_PRODUCT_SUCCESS:
        deliveryRequest(user.id, DELIVERY, {
          page: 1,
          limit: 5,
        });
        countDelivery(user.id, DELIVERY);
        receiveProduct();
        break;
      case REFUND_PRODUCT_SUCCESS:
        deliveryRequest(user.id, DELIVERY, {
          page: 1,
          limit: 5,
        });
        countDelivery(user.id, DELIVERY);
        refundProduct();
        break;
      case REPORT_ADMIN_SUCCESS:
        getRefundRequest(user.id, {
          page: 1,
          limit: 5,
        });
        countRefundRequest(user.id);
        report();
        break;
      default:
        break;
    }
    return function cleanup() {
      resetOrderType();
    };
  }, [type]);

  useEffect(() => {
    switch (exchangeType) {
      case CANCEL_EXCHANGE_SUCCESS:
        wantChangePurchase(own && own.id, {
          page: 1,
          limit: 5,
        });
        countWantPurchase(own && own.id);
        notifyCancelExchange();
        break;
      default:
        break;
    }
    return function cleanup() {
      resetExchangeType();
    };
  }, [exchangeType]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            label="Chờ xác nhận"
            {...a11yProps(0)}
            className={classes.label}
          />
          <Tab
            label="Yêu cầu trao đổi"
            {...a11yProps(1)}
            className={classes.label}
          />
          <Tab
            label="Chờ lấy hàng"
            {...a11yProps(2)}
            className={classes.label}
          />
          <Tab label="Đang giao" {...a11yProps(3)} className={classes.label} />
          <Tab label="Đã giao" {...a11yProps(4)} className={classes.label} />
          <Tab label="Đã hủy" {...a11yProps(5)} className={classes.label} />
          <Tab label="Trả hàng" {...a11yProps(6)} className={classes.label} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <WaitingConfirm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Exchange />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WaitingDelivery />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Delivery />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CompleteDelivery />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Cancelled />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Return />
      </TabPanel>
      <ToastContainer position="top-center" />
    </div>
  );
};

const mapStateToProps = ({ order, exchange }) => {
  return {
    type: order && order.type,
    exchangeType: exchange && exchange.type,
  };
};

const mapDispatchToProps = {
  resetOrderType,
  purchaseRequest,
  countPurchase,
  countWantPurchase,
  deliveryRequest,
  countDelivery,
  wantChangePurchase,
  resetExchangeType,
  getRefundRequest,
  countRefundRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonAuto);
