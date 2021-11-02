import React from "react";
import ProductDetail from "./ProductDetail";

const DetailScreen = ({ match }) => {
  return (
    <>
      <ProductDetail match={match} />
    </>
  );
};

export default DetailScreen;
