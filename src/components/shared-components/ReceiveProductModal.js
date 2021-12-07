import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export default function ReceiveProductModal(props) {
  const {
    open,
    setOpen,
    handleClickOpen,
    handleClose,
    accept,
    joinExchange,
    loading,
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Nhận sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn hài lòng với sản phẩm đã nhận? Nếu có, vui lòng chọn "Đồng ý" để
            xác nhận đơn hàng thành công
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Không
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={joinExchange}
            disabled={loading}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
