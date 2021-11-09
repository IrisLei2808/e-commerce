import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { avatarUpload, resetAuthType } from "../../redux/actions/Auth";
import Resizer from "react-image-file-resizer";

const AvatarUpload = (props) => {
  const { avatarUpload, resetAuthType, preview, setPreview } = props;
  const [src, setSrc] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onFileLoad = (files) => {
    Resizer.imageFileResizer(
      files,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        setPreview(uri);
      },
      "base64"
    );
  };

  const onCrop = (preView) => {
    setPreview(preView);
  };

  return (
    <Row className="d-flex">
      <Col>
        <Avatar
          className="avatar"
          width={260}
          height={200}
          onCrop={onCrop}
          onClose={onClose}
          onFileLoad={onFileLoad}
          src={src}
        />
      </Col>
      <Col>
        {preview !== null && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: 120, height: 120 }}
            className="preview ml-5"
          />
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    type: auth && auth.type,
    imageFile: auth && auth.fileList,
  };
};

const mapDispatchToProps = {
  avatarUpload,
  resetAuthType,
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUpload);
