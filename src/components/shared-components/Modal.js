import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductModal = ({ show, handleClose, goToDetail }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", alignItems: "center" }}>
          <i
            className="fas fa-check-circle mr-2"
            style={{ color: "green", fontSize: 25 }}
          ></i>
          Đăng sản phẩm thành công!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Quay về trang chủ
          </Button>
          <Button variant="primary" onClick={goToDetail}>
            Xem chi tiết sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductModal;
