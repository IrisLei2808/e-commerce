import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../../utils/formatText";
import FeedBackDialog from "../../../../components/layout-components/FeedBackDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
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

const WaitingConfirm = ({ item, status, notify }) => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <ListGroup.Item
        style={{
          marginBottom: 20,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <ListGroup variant="flush" style={{ padding: "0px 20px" }}>
          <>
            <Row
              style={{
                borderBottom: "1px solid #E8E9EB",
                padding: 10,
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={item && item.user && item.user[0] && item.user[0].avatar}
                className={classes.small}
              />
              <span
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                className="ml-2"
              >
                {item && item.user && item.user[0] && item.user[0].fullName}
              </span>
              {status === 2 && (
                <span
                  className="ml-auto d-flex"
                  style={{
                    background: "#2ab7ca",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: 4,
                  }}
                >
                  Đang chờ lấy hàng
                </span>
              )}
              {status === 1 && (
                <span
                  className="ml-auto d-flex"
                  style={{
                    background: "#2ab7ca",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: 4,
                  }}
                >
                  Đang chờ xác nhận
                </span>
              )}
              {status === 4 && (
                <span
                  className="ml-auto d-flex align-items-center"
                  style={{
                    background: "#00A86B",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: 4,
                  }}
                >
                  <i class="fas fa-check mr-2"></i>
                  Đã giao
                </span>
              )}
              {status === 5 && (
                <span
                  className="ml-auto d-flex align-items-center"
                  style={{
                    background: "#D21404",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: 4,
                  }}
                >
                  <i class="fas fa-times mr-2"></i>
                  Đã hủy
                </span>
              )}
            </Row>
            <Row style={{ borderBottom: "1px solid #E8E9EB", padding: 20 }}>
              <Col md={2}>
                <Image
                  src={
                    item &&
                    item.product &&
                    item.product[0] &&
                    item.product[0].Images &&
                    item.product[0].Images[0] &&
                    item.product[0].Images[0].address
                  }
                  fluid
                  rounded
                  style={{ width: 100, height: 100 }}
                />
              </Col>
              <Col>
                <Row>
                  {item &&
                    item.product &&
                    item.product[0] &&
                    item.product[0].name}
                </Row>
                <Row className="mt-2">x{item && item.quantity}</Row>
              </Col>
              <Col md={4} style={{ color: "#d73211" }}>
                {formatMoney(item && item.price)}
              </Col>
            </Row>
            <Row style={{ padding: 20, alignItems: "center" }}>
              {status === 4 && (
                <Col>
                  <a
                    onClickCapture={handleOpenModal}
                    style={{ color: "#00A86B" }}
                  >
                    <i class="far fa-comments mr-2"></i>Đánh giá sản phẩm ?
                  </a>
                </Col>
              )}
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginLeft: "auto" }}
              >
                <i class="fas fa-receipt mr-2 fa-2x"></i>
                Tổng số tiền:
                <span
                  className="ml-2"
                  style={{ fontSize: 20, color: "#d73211" }}
                >
                  {formatMoney(item && item.price)}
                </span>
              </div>
            </Row>
          </>
        </ListGroup>
        <FeedBackDialog
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          open={open}
          item={item}
          notify={notify}
        />
      </ListGroup.Item>
    </>
  );
};

export default WaitingConfirm;
