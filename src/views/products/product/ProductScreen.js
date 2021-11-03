import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ProductCollection from "./ProductCollection";
import {
  fetchProductList,
  resetProductType,
} from "../../../redux/actions/Product";
import "./products.module.css";
import Loader from "../../../components/shared-components/Spinner";
import { PRODUCT_LIST_SUCCESS } from "../../../redux/constants/Product";

const CollectionsComponent = (props) => {
  const [product, setProduct] = useState(null);
  const { fetchProductList, productList, loading, type, resetProductType } =
    props;

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    switch (type) {
      case PRODUCT_LIST_SUCCESS:
        setProduct(productList);
        break;
      default:
        break;
    }
    return function cleanup() {
      resetProductType();
    };
  }, [type]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ padding: "0px 20px" }}>
          <Slide easing="ease">
            <div className="each-slide">
              <img
                src="https://icms-image.slatic.net/images/ims-web/944bd03d-d056-40c3-a1e3-d011e3c27b1b.jpg"
                alt=""
              />
            </div>
            <div className="each-slide">
              <img
                src="https://icms-image.slatic.net/images/ims-web/0363fda9-2679-4199-9a13-b88a71346eac.jpg"
                alt=""
              />
            </div>
            <div className="each-slide">
              <img
                src="https://icms-image.slatic.net/images/ims-web/400f5904-113b-4953-a7ba-0c726900b46b.jpg"
                alt=""
              />
            </div>
            <div className="each-slide">
              <img
                src="https://icms-image.slatic.net/images/ims-web/402e3c85-6d4f-45ca-b8ff-f1dc23551eb0.jpg"
                alt=""
              />
            </div>
            <div className="each-slide">
              <img
                src="https://icms-image.slatic.net/images/ims-web/944bd03d-d056-40c3-a1e3-d011e3c27b1b.jpg"
                alt=""
              />
            </div>
            <div className="each-slide">
              <img
                src="https://icms-image.slatic.net/images/ims-web/e6301d5b-fb4f-4f01-951a-ddc8941ccf99.jpg"
                alt=""
              />
            </div>
          </Slide>
          {product &&
            product.map((item) => (
              <ProductCollection key={item.id} collection={item} />
            ))}
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    productList: product.list,
    loading: product.isLoading,
    type: product.type,
  };
};

const mapDispatchToProps = {
  fetchProductList,
  resetProductType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsComponent);
