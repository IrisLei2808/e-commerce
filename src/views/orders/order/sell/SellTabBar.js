import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import WaitingConfirm from "./WaitingConfirm";
import WaitingDelivery from "./WaitingDelivery";
import Delivery from "./Delivery";
import CompleteDelivery from "./CompleteDelivery";
import Cancelled from "./Cancelled";
import Return from "./Return";
import { sellRequest } from "../../../../redux/actions/Order";
import { WAITING_FOR_CONFIRM } from "../../../../configs/Constants";

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
  const { sellRequest, purchase } = props;
  const own = JSON.parse(localStorage.getItem("userInfo"));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    sellRequest(own && own.id, WAITING_FOR_CONFIRM);
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
            label="Waiting for confirmation"
            {...a11yProps(0)}
            className={classes.label}
          />
          <Tab
            label="Waiting for delivery"
            {...a11yProps(1)}
            className={classes.label}
          />
          <Tab label="Delivery" {...a11yProps(2)} className={classes.label} />
          <Tab
            label="Completed delivery"
            {...a11yProps(3)}
            className={classes.label}
          />
          <Tab label="Cancelled" {...a11yProps(4)} className={classes.label} />
          <Tab label="Return" {...a11yProps(5)} className={classes.label} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <WaitingConfirm purchase={purchase} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WaitingDelivery />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Delivery />
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
    purchase: order && order.purchase,
  };
};

const mapDispatchToProps = {
  sellRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonAuto);
