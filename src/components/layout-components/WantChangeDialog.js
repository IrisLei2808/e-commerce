import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from 'react-bootstrap';

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

const WantChangeDialog = ({
  open,
  handleClose,
  handleAccept,
  handleDeny,
  loading,
  accept,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>
        {accept ? 'Đồng ý trao đổi' : 'Hủy yêu cầu trao đổi'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {accept
            ? 'Bạn có chắc muốn đồng ý trao đổi ?'
            : 'Bạn có chắc muốn hủy yêu cầu trao đổi ?'}
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
            className={loading ? 'spinner-border spinner-border-sm' : ''}
            role="status"
            aria-hidden="true"
          ></span>
          {loading ? 'Loading...' : accept ? 'Xác nhận' : 'Hủy trao đổi'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WantChangeDialog;
