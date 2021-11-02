import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import CollectionItem from "./CollectionItem";

const ProductCollection = ({ collection }) => {
  return (
    <>
      <h3>Trending {collection.brandname}</h3>
      <Row>
        {collection &&
          collection.Products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
              <CollectionItem product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ProductCollection;
