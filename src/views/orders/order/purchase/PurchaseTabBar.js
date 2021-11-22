import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DELIVERY, DELIVERY_INFO } from "../../../../configs/Constants";
import {
  deliveryInfoRequest,
  deliveryRequest,
  purchaseRequest,
  waitingDeliveryRequest,
} from "../../../../redux/actions/Order";
import Cancelled from "./Cancelled";
import CompleteDelivery from "./CompleteDelivery";
import Delivery from "./Delivery";
import Return from "./Return";
import WaitingConfirm from "./WaitingConfirm";
import WaitingDelivery from "./WaitingDelivery";

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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    textTransform: "none",
  },
}));

const ScrollableTabsButtonAuto = (props) => {
  const { deliveryRequest, delivery, deliveryInfoRequest, deliveryInfo } =
    props;
  const own = JSON.parse(localStorage.getItem("userInfo"));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    deliveryRequest(own && own.id, DELIVERY);
    deliveryInfoRequest(own && own.id, DELIVERY_INFO);
  }, []);

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
            label="Chờ lấy hàng"
            {...a11yProps(1)}
            className={classes.label}
          />
          <Tab label="Đang giao" {...a11yProps(2)} className={classes.label} />
          <Tab label="Đã giao" {...a11yProps(3)} className={classes.label} />
          <Tab label="Đã hủy" {...a11yProps(4)} className={classes.label} />
          <Tab label="Trả hàng" {...a11yProps(5)} className={classes.label} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <WaitingConfirm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WaitingDelivery />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Delivery delivery={delivery} deliveryInfo={deliveryInfo} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CompleteDelivery />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Cancelled />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Return />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = ({ order }) => {
  return {
    waitingDelivery: order && order.waitingDelivery,
    delivery: order && order.delivery,
    deliveryInfo: order && order.deliveryInfo,
  };
};

const mapDispatchToProps = {
  purchaseRequest,
  waitingDeliveryRequest,
  deliveryRequest,
  deliveryInfoRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonAuto);
