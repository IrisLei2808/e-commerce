import React, { useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { connect } from "react-redux";
import { imageUpload, resetProductType } from "../../redux/actions/Product";
import { IMAGE_UPLOAD_SUCCESS } from "../../redux/constants/Product";

const FileUpload = (props) => {
  const { image, setImage, imageUpload, resetProductType, type, imageFile } =
    props;
  console.log("D: ", image);
  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("image", files[i]);
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            imageUpload(formData);
          },
          "base64"
        );
      }
    }
  };
  useEffect(() => {
    switch (type) {
      case IMAGE_UPLOAD_SUCCESS:
        setImage([...image, imageFile && imageFile]);
        break;
      default:
        break;
    }
    return function cleanup() {
      resetProductType();
    };
  }, [type]);

  return (
    <label className="btn btn-info mt-3" style={{ display: "inline-block" }}>
      <i className="fas fa-images mr-2"></i>Chọn hình ảnh
      <input
        type="file"
        multiple
        hidden
        accept="images/*"
        onChange={fileUploadAndResize}
      />
    </label>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    type: product && product.type,
    imageFile: product && product.fileList,
  };
};

const mapDispatchToProps = {
  imageUpload,
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
