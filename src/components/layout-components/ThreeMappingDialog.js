import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ThreeMappingDialog(props) {
  const {
    open,
    setOpen,
    handleClose,
    handleClickOpen,
    index,
    item,
    item1,
    item2,
    item3,
  } = props;
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Thông tin gợi ý trao đổi {index + 1}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <i class="fas fa-users mr-2"></i>Số lượng người trao đổi:{' '}
            <span className="font-weight-bold">
              {item && item.peopleInCircle} người
            </span>
          </Typography>
          <Typography
            gutterBottom
            className="d-flex"
            style={{ flexDirection: 'column' }}
          >
            <span>
              - Bạn sẽ nhận sản phẩm{' '}
              <span className="font-weight-bold">{item2 && item2.name}</span> từ{' '}
              <span className="font-weight-bold">
                {item2 && item2.fullName}
              </span>
            </span>
            <span>
              -{' '}
              <span className="font-weight-bold">
                {item2 && item2.fullName}
              </span>{' '}
              sẽ nhận sản phẩm{' '}
              <span className="font-weight-bold">{item3 && item3.name}</span> từ{' '}
              <span className="font-weight-bold">
                {item3 && item3.fullName}
              </span>
            </span>
            <span>
              -{' '}
              <span className="font-weight-bold">
                {item3 && item3.fullName}
              </span>{' '}
              sẽ nhận sản phẩm{' '}
              <span className="font-weight-bold">{item1 && item1.name}</span> từ
              bạn
            </span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy gợi ý trao đổi
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Tham gia trao đổi nhóm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
