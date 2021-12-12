import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProductCategory from '../../../components/layout-components/ProductCategory';
import Loader from '../../../components/shared-components/Spinner';
import {
  fetchProductByCategory,
  countProductByCategory,
  fetchCategoryByBrand,
  fetchCategoryName,
  resetProductType,
} from '../../../redux/actions/Product';
import { PRODUCT_BY_CATEGORY_SUCCESS } from '../../../redux/constants/Product';
import ViewMoreButton from '../../../components/shared-components/ViewMoreButton';

const CategoryScreen = (props) => {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState(null);
  const {
    fetchProductByCategory,
    fetchCategoryByBrand,
    productList,
    loading,
    match,
    type,
    categories,
    resetProductType,
    fetchCategoryName,
    categoryName,
    count,
    countProductByCategory,
  } = props;

  const [visible, setVisible] = useState(12);
  const [viewLoading, setViewLoading] = useState(false);
  console.log('F: ', count);
  const showMoreItems = () => {
    setViewLoading(true);
    setTimeout(() => {
      setVisible((prevValue) => prevValue + 12);
      setViewLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchCategoryName(match && match.params.id);
  }, [match]);

  useEffect(() => {
    fetchProductByCategory(match && match.params.id, {
      page: page,
      limit: limit,
    });
  }, [match]);

  useEffect(() => {
    countProductByCategory(match && match.params.id);
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
        <>
          <h2>{categoryName && categoryName}</h2>
          <Row>
            {product &&
              product.slice(0, visible).map((pro) => (
                <Col sm={12} md={6} lg={4} xl={3}>
                  <ProductCategory product={pro} />
                </Col>
              ))}
          </Row>
          <ViewMoreButton
            count={count && count}
            page={page}
            setPage={setPage}
            limit={limit}
            purchaseRequest={fetchProductByCategory}
            id={match && match.params.id}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    productList: product.list,
    loading: product.isLoading,
    type: product.type,
    categoryName: product.categoryName,
    count: product.countProductCategory,
  };
};

const mapDispatchToProps = {
  fetchProductByCategory,
  fetchCategoryByBrand,
  resetProductType,
  fetchCategoryName,
  countProductByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
