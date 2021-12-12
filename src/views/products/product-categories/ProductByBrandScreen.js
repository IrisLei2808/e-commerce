import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProductCategory from '../../../components/layout-components/ProductCategory';
import Loader from '../../../components/shared-components/Spinner';
import {
  fetchCategoryByBrand,
  fetchProductByBrand,
  resetProductType,
  countProductByBrand,
} from '../../../redux/actions/Product';
import {
  CATEGORY_BY_BRAND_SUCCESS,
  PRODUCT_BY_BRAND_SUCCESS,
} from '../../../redux/constants/Product';
import ViewMoreButton from '../../../components/shared-components/ViewMoreButton';

const ProductByBrandScreen = (props) => {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(12);
  const [viewLoading, setViewLoading] = useState(false);

  const showMoreItems = () => {
    setViewLoading(true);
    setTimeout(() => {
      setVisible((prevValue) => prevValue + 12);
      setViewLoading(false);
    }, 500);
  };

  const {
    fetchProductByBrand,
    fetchCategoryByBrand,
    productList,
    categoryList,
    loading,
    match,
    type,
    resetProductType,
    brand,
    countProductByBrand,
    count,
  } = props;

  useEffect(() => {
    fetchProductByBrand(match && match.params.id, { page: page, limit: limit });
  }, [match]);

  useEffect(() => {
    countProductByBrand(match && match.params.id);
  }, [match]);

  useEffect(() => {
    switch (type) {
      case PRODUCT_BY_BRAND_SUCCESS:
        setProduct(productList);
        break;
      case CATEGORY_BY_BRAND_SUCCESS:
        setCategory(categoryList);
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
        <>
          <h2>Trending {brand && brand}</h2>
          {product !== null && (
            <Row>
              {product &&
                product.slice(0, visible).map((pro) => (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <ProductCategory product={pro} />
                  </Col>
                ))}
            </Row>
          )}
          {product !== null && (
            <ViewMoreButton
              count={count && count}
              page={page}
              setPage={setPage}
              limit={limit}
              purchaseRequest={fetchProductByBrand}
              id={match && match.params.id}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    productList: product.list,
    categoryList: product && product.categoryList,
    loading: product.isLoading,
    type: product.type,
    brand: product.brand,
    count: product.countProductBrand,
  };
};

const mapDispatchToProps = {
  fetchProductByBrand,
  fetchCategoryByBrand,
  resetProductType,
  countProductByBrand,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductByBrandScreen);
