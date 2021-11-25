import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "../../components/layout-components/FileUpload";
import {
  feedbackProduct,
  imageRemove,
  resetProductType,
} from "../../redux/actions/Product";
import {
  FEEDBACK_PRODUCT_FAIL,
  FEEDBACK_PRODUCT_SUCCESS,
  IMAGE_REMOVE_SUCCESS,
} from "../../redux/constants/Product";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const FeedBackDialog = (props) => {
  const [image, setImage] = useState([]);
  const [productId, setProductId] = useState();
  const [content, setContent] = useState();
  const [star, setStar] = useState();
  const own = JSON.parse(localStorage.getItem("userInfo"));

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const {
    open,
    handleCloseModal,
    type,
    imageRemove,
    resetProductType,
    cloudinaryId,
    feedbackProduct,
    item,
    notify,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    feedbackProduct(
      item && item.product && item.product[0] && item.product[0].idProduct,
      item && item.idOrderDetail,
      content,
      image,
      star,
      own && own.token
    );
  }

  useEffect(() => {
    switch (type) {
      case IMAGE_REMOVE_SUCCESS:
        let filteredImages = image.filter(
          (item) => item.cloudinaryId !== cloudinaryId && cloudinaryId
        );
        setImage(filteredImages);
        break;
      case FEEDBACK_PRODUCT_SUCCESS:
        handleCloseModal();
        break;
      case FEEDBACK_PRODUCT_FAIL:
        handleCloseModal();
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <i class="far fa-comments mr-2"></i>Đánh giá sản phẩm{" "}
        </DialogTitle>
        <Form
          style={{
            padding: "0px 20px",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <Rating
              name="simple-controlled"
              defaultValue={0}
              style={{ fontSize: 40 }}
              className="mb-2"
              onChange={(event, newValue) => {
                setStar(newValue);
              }}
            />
          </div>
          <Form.Control
            as="textarea"
            placeholder="Nhập bình luận"
            style={{ height: "150px" }}
            required
            className="mb-2"
            onChange={(e) => setContent(e.target.value)}
          />
          <Row>
            <FileUpload image={image} setImage={setImage} />
          </Row>
          {image && image.length > 0 && (
            <Row className="d-flex align-items-center py-3 w-100">
              {image.map((item, index) => (
                <Col sm={12} md={8} lg={4} xl={3}>
                  <Badge
                    color="secondary"
                    badgeContent={<i class="fas fa-times"></i>}
                    style={{ cursor: "pointer" }}
                    onClick={() => imageRemove(item && item.cloudinaryId)}
                  >
                    <Image
                      key={item.cloudinaryId}
                      src={item.url}
                      style={{
                        width: 120,
                        height: 100,
                        cursor: "pointer",
                        marginBottom: 20,
                      }}
                      onClick={() => openInNewTab(item.url)}
                    />
                  </Badge>
                </Col>
              ))}
            </Row>
          )}
          <DialogActions className="ml-auto">
            <Button onClick={handleCloseModal} color="primary">
              Không
            </Button>
            <Button type="submit" color="primary">
              Gửi đánh giá
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    type: product.type,
    cloudinaryId: product && product.cloudinaryId,
  };
};

const mapDispatchToProps = {
  imageRemove,
  feedbackProduct,
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackDialog);
