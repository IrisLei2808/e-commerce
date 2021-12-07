import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../layout-components/Rating';
import { formatText, formatMoney } from '../../utils/formatText';

const ProductCategory = (props) => {
  const { product } = props;
  const defaultImage =
    'https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg';
  return (
    <Card
      className="my-3 p-3 rounded"
      style={{
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      }}
    >
      <Link
        to={`/product/${product && product.idProduct}`}
        style={{ textAlign: 'center' }}
      >
        <Card.Img
          src={
            product && product.images && product.images[0]
              ? product.images[0].address
              : defaultImage
          }
          variant="top"
          style={{ height: 180, width: 180 }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product && product.idProduct}`}>
          <Card.Title as="div" style={{ minHeight: 50, textAlign: 'center' }}>
            <strong>{formatText(product && product.name)}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as="div">
          <div className="my-3">
            <Rating value={5} text={`${5} reviews`} />
          </div>
        </Card.Text> */}
        <Card.Text as="h4">{formatMoney(product && product.price)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCategory;
