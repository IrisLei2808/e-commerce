import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
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

const OrderDialog = ({
  open,
  handleClose,
  handleAccept,
  handleDeny,
  loading,
  accept,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{accept ? "Xác nhận đơn hàng" : "Hủy đơn hàng"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {accept
            ? "Bạn có chắc muốn xác nhận đơn hàng"
            : "Bạn có chắc muốn hủy đơn hàng"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Không
        </Button>
        <Button
          className="btn btn-primary "
          type="submit"
          disabled={loading}
          onClick={accept ? handleAccept : handleDeny}
          color="primary"
        >
          <span
            className={loading ? "spinner-border spinner-border-sm" : ""}
            role="status"
            aria-hidden="true"
          ></span>
          {loading ? "Loading..." : accept ? "Xác nhận" : "Hủy đơn hàng"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
