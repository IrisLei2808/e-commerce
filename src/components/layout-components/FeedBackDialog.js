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
import FileUpload from "../../components/layout-components/FileUpload";
import { imageRemove, resetProductType } from "../../redux/actions/Product";
import { IMAGE_REMOVE_SUCCESS } from "../../redux/constants/Product";

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
  const {
    open,
    handleCloseModal,
    type,
    imageRemove,
    resetProductType,
    cloudinaryId,
  } = props;

  const [image, setImage] = useState([]);
  const classes = useStyles();
  console.log(image);

  useEffect(() => {
    switch (type) {
      case IMAGE_REMOVE_SUCCESS:
        let filteredImages = image.filter(
          (item) => item.cloudinaryId !== cloudinaryId && cloudinaryId
        );
        setImage(filteredImages);
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
        >
          <div>
            <Rating
              name="simple-controlled"
              defaultValue={3}
              style={{ fontSize: 40 }}
              className="mb-2"
            />
          </div>
          <Form.Control
            as="textarea"
            placeholder="Nhập bình luận"
            style={{ height: "150px" }}
            required
            className="mb-2"
          />
          <Row>
            <FileUpload image={image} setImage={setImage} />
          </Row>
          {image && image.length > 0 && (
            <Row className="d-flex align-items-center py-3">
              {image.map((item, index) => (
                <Col sm={12} md={8} lg={4} xl={4}>
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
                    />
                  </Badge>
                </Col>
              ))}
            </Row>
          )}
        </Form>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Không
          </Button>
          <Button onClick={handleCloseModal} color="primary">
            Gửi đánh giá
          </Button>
        </DialogActions>
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
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackDialog);
