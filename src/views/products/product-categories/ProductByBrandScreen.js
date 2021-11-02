import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchProductByBrand,
  resetProductType,
} from "../../../redux/actions/Product";
import ProductCategory from "../../../components/layout-components/ProductCategory";
import Loader from "../../../components/shared-components/Spinner";
import { PRODUCT_BY_BRAND_SUCCESS } from "../../../redux/constants/Product";

const ProductByBrandScreen = (props) => {
  const [product, setProduct] = useState(null);
  const {
    fetchProductByBrand,
    productList,
    loading,
    match,
    type,
    resetProductType,
  } = props;
  useEffect(() => {
    fetchProductByBrand(match && match.params.id);
  }, [match]);

  useEffect(() => {
    switch (type) {
      case PRODUCT_BY_BRAND_SUCCESS:
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
        <Row>
          {product &&
            product.Products &&
            product.Products.map((pro) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <ProductCategory product={pro} />
              </Col>
            ))}
        </Row>
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
  fetchProductByBrand,
  resetProductType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductByBrandScreen);
