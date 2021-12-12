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
                src="https://dlcdnwebimgs.asus.com/gain/E55ABADE-0A1A-4C98-8336-49057F2F9614"
                alt=""
                style={{ width: "100%", height: "600px" }}
              />
            </div>
            <div className="each-slide">
              <img
                src="https://about.att.com/ecms/dam/snr/2020/November2020/StoryLevelBanner/11042020_iPhoneProMax_STORY_LEVEL_BANNER_1600x483.jpg"
                alt=""
                style={{ width: "100%", height: "600px" }}
              />
            </div>
            <div className="each-slide">
              <img
                src="https://dlcdnwebimgs.asus.com/gain/F955B4D4-D01F-4290-BF49-909F4A71055B"
                alt=""
                style={{ width: "100%", height: "600px" }}
              />
            </div>
            <div className="each-slide">
              <img
                src="https://cdn.tgdd.vn/Products/Images/44/260171/dell-gaming-g15-5515-r5-p105f004dgr-05.jpg"
                alt=""
                style={{ width: "100%", height: "600px" }}
              />
            </div>
            <div className="each-slide">
              <img
                src="https://thumbs.dreamstime.com/b/vinnytsia-ukraine-september-vector-banner-iphone-vector-illustration-app-web-presentation-design-vector-banner-iphone-230042240.jpg"
                alt=""
                style={{ width: "100%", height: "600px" }}
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
