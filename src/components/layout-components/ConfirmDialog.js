import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export default function ConfirmDialog(props) {
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
        <DialogTitle id="alert-dialog-title">
          {accept ? 'Tham gia trao đổi nhóm' : 'Từ chối tham gia trao đổi'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {accept
              ? 'Bạn có chắc muốn tham gia trao đổi nhóm ?'
              : 'Từ chối tham gia trao đổi sẽ hủy toàn bộ gợi ý trao đổi trước đó của sản phẩm này, bạn có chắc muốn từ chối ?'}
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
