import React from "react";
import { Modal, Button } from "react-bootstrap";

const PlaceOrderModal = ({ show, handleClose, goToHomePage, message }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Place order</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", alignItems: "center" }}>
          {/* <i
            className="fas fa-check-circle mr-2"
            style={{ color: "green", fontSize: 25 }}
          ></i> */}
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Xem đơn mua hàng
          </Button>
          <Button variant="primary" onClick={goToHomePage}>
            Quay lại trang chủ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlaceOrderModal;
