import React from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CollectionItem from "./CollectionItem";

const ProductCollection = ({ collection }) => {
  let history = useHistory();
  return (
    <>
      <h3 onClick={() => history.push(`/brand/${collection.idbrand}`)}>
        Trending {collection && collection.brandname}
      </h3>
      <Row>
        {collection &&
          collection.Products.map((product) => (
            <Col sm={12} md={8} lg={4} xl={3} className="mb-4">
              <CollectionItem product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ProductCollection;
