import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import CollectionItem from "./CollectionItem";

const ProductCollection = ({ collection }) => {
  let size = 8;
  collection &&
    collection.Categories.find((item) => {
      item.Products.map((product) => {
        console.log("EE: ", product);
      });
    });
  return (
    <>
      <h3>Trending {collection.brandname}</h3>
      <Row>
        {collection &&
          collection.Categories.map(
            (item) =>
              item.Products.map((product) => {
                <h1>{product.idProduct}</h1>;
              })
            // <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
            //   <CollectionItem products={collection.product} />
            // </Col>
          )}
      </Row>
    </>
  );
};

export default ProductCollection;
