import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export default function ConfirmModal(props) {
  const {
    open,
    setOpen,
    handleClickOpen,
    handleClose,
    accept,
    reportAdmin,
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
        <DialogTitle id="alert-dialog-title">Gửi khiếu nại</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Yêu cầu đổi trả của bạn đã bị từ chối bởi người bán, bạn có chắc
            muốn tiếp tục khiếu nại lên hệ thống ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Không
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={reportAdmin}
            disabled={loading}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
