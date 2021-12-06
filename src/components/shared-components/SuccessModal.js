import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({
  show,
  handleClose,
  goToDetail,
  message,
  title,
  goToPurchase,
}) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
          <i
            className="fas fa-check-circle mr-2"
            style={{ color: 'green', fontSize: 25 }}
          ></i>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={goToDetail}>
            Quay về trang gợi ý
          </Button>
          <Button variant="primary" onClick={goToPurchase}>
            Xem đơn trao đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SuccessModal;
