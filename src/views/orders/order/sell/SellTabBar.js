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
import { WAITING_FOR_CONFIRM } from '../../../../configs/Constants';
import {
  countWantSell,
  resetExchangeType,
  wantChangeSell,
} from '../../../../redux/actions/Exchange';
import {
  countSellRefund,
  resetMappingType,
  sellRefundRequest,
} from '../../../../redux/actions/Mapping';
import {
  countSell,
  resetOrderType,
  sellRequest,
} from '../../../../redux/actions/Order';
import {
  ACCEPT_EXCHANGE_SUCCESS,
  CANCEL_EXCHANGE_SUCCESS,
} from '../../../../redux/constants/Exchange';
import {
  ACCEPT_ORDER_SUCCESS,
  ACCEPT_REFUND_SUCCESS,
  CANCEL_ORDER_SUCCESS,
  CANCEL_REFUND_SUCCESS,
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
    sellRequest,
    countSell,
    cresetOrderType,
    type,
    wantChangeSell,
    countWantSell,
    resetExchangeType,
    exchangeType,
    resetMappingType,
    sellRefundRequest,
    countSellRefund,
    mappingType,
    resetOrderType,
  } = props;
  const [user, setUser] = useLocalStorage('userInfo');
  const own = JSON.parse(localStorage.getItem('userInfo'));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const notify = () => toast.success('Đã xác nhận đơn hàng!');
  const notifyCancel = () => toast.success('Đã hủy đơn hàng!');

  const notifyWant = () => toast.success('Đã đồng ý yêu cầu trao đổi!');
  const notifyWantCancel = () => toast.success('Đã hủy yêu cầu trao đổi!');

  const notifyRefund = () => toast.success('Đã đồng ý yêu cầu trả hàng!');
  const notifyRefundCancel = () =>
    toast.success('Đã từ chối yêu cầu trả hàng!');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (type) {
      case ACCEPT_ORDER_SUCCESS:
        sellRequest(own && own.id, WAITING_FOR_CONFIRM, {
          page: 1,
          limit: 5,
        });
        countSell(own && own.id, WAITING_FOR_CONFIRM);
        notify();
        break;
      case CANCEL_ORDER_SUCCESS:
        sellRequest(own && own.id, WAITING_FOR_CONFIRM, {
          page: 1,
          limit: 5,
        });
        countSell(own && own.id, WAITING_FOR_CONFIRM);
        notifyCancel();
        break;
      case ACCEPT_REFUND_SUCCESS:
        sellRefundRequest(user.id, {
          page: 1,
          limit: 5,
        });
        countSellRefund(user.id);
        notifyRefund();
        break;
      case CANCEL_REFUND_SUCCESS:
        sellRefundRequest(user.id, {
          page: 1,
          limit: 5,
        });
        countSellRefund(user.id);
        notifyRefundCancel();
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
        wantChangeSell(user && user.id, {
          page: 1,
          limit: 5,
        });
        countWantSell(user && user.id);
        notifyWantCancel();
        break;
      case ACCEPT_EXCHANGE_SUCCESS:
        wantChangeSell(user && user.id, {
          page: 1,
          limit: 5,
        });
        countWantSell(user && user.id);
        notifyWant();
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
      <div
        style={{
          textAlign: 'center',
          background: 'linear-gradient(to right, #02aab0, #00cdac)',
        }}
      >
        <h3 style={{ color: '#fff', fontSize: 23 }}>Đơn bán hàng</h3>
      </div>
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

const mapStateToProps = ({ order, exchange, mapping }) => {
  return {
    type: order && order.type,
    exchangeType: exchange && exchange.type,
    mappingType: mapping && mapping.type,
  };
};

const mapDispatchToProps = {
  sellRequest,
  countSell,
  resetOrderType,
  wantChangeSell,
  countWantSell,
  resetExchangeType,
  resetMappingType,
  sellRefundRequest,
  countSellRefund,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonAuto);
