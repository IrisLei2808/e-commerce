import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import ProductCategory from "../../../components/layout-components/ProductCategory";
import Loader from "../../../components/shared-components/Spinner";
import {
  fetchProductByCategory,
  resetProductType,
} from "../../../redux/actions/Product";
import { PRODUCT_BY_CATEGORY_SUCCESS } from "../../../redux/constants/Product";

const CategoryScreen = (props) => {
  const [product, setProduct] = useState(null);
  const {
    fetchProductByCategory,
    productList,
    loading,
    match,
    type,
    resetProductType,
  } = props;
  useEffect(() => {
    fetchProductByCategory(match && match.params.id);
  }, [match]);

  useEffect(() => {
    switch (type) {
      case PRODUCT_BY_CATEGORY_SUCCESS:
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
            product.map((pro) => (
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
  fetchProductByCategory,
  resetProductType,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
