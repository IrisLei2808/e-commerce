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
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", alignItems: "center" }}>
          <i
            className="fas fa-check-circle mr-2"
            style={{ color: "green", fontSize: 25 }}
          ></i>
          Create Product Successful!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Go back to home page
          </Button>
          <Button variant="primary" onClick={goToDetail}>
            View product's details
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductModal;
