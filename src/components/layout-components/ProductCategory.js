import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../layout-components/Rating";
import { formatText, formatMoney } from "../../utils/formatText";

const ProductCategory = (props) => {
  const { product } = props;
  const defaultImage =
    "https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg";
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product && product.idProduct}`}>
        <Card.Img
          src={
            product && product.Images && product.Images[0]
              ? product.Images[0].address
              : defaultImage
          }
          variant="top"
          style={{ height: 200 }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product && product.idProduct}`}>
          <Card.Title as="div" style={{ minHeight: 50, textAlign: "center" }}>
            <strong>{formatText(product && product.name)}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={5} text={`${5} reviews`} />
          </div>
        </Card.Text>
        <Card.Text as="h4">{formatMoney(product && product.price)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCategory;
