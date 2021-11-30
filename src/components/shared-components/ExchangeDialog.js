import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ExchangeDialog = ({ show, setShow, handleClose, message }) => {
  return (
    <div>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu trao đổi</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
          {/* <i
            className="fas fa-check-circle mr-2"
            style={{ color: "green", fontSize: 25 }}
          ></i> */}
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Quay lại trang chủ
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExchangeDialog;
