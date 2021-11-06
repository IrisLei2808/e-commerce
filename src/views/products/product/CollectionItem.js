import React from "react";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

const CollectionItem = ({ product }) => {
  let history = useHistory();

  const formatText = (text) => {
    if (text.length > 26) {
      const result = text.substring(0, 26) + "...";
      return result;
    } else {
      return text;
    }
  };

  const defaultImage =
    "https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg";
  return (
    <>
      <Card
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          padding: "10px 0px 30px 0px",
        }}
      >
        <Card.Text
          style={{ textAlign: "center", color: "red", cursor: "pointer" }}
          onClick={() =>
            history.push(`/product/${product && product.idProduct}`)
          }
        >
          {formatText(product && product.name)}
        </Card.Text>
        <Card.Text style={{ textAlign: "center" }}>
          {product && product.quantity} quantities
        </Card.Text>
        <div style={{ textAlign: "center" }}>
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px" }}
            src={
              product && product.Images[0]
                ? product.Images[0].address
                : defaultImage
            }
            className="mr-2"
          />
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px" }}
            src={
              product && product.Images[1]
                ? product.Images[1].address
                : defaultImage
            }
            className="mr-2"
          />
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px" }}
            src={
              product && product.Images[2]
                ? product.Images[2].address
                : defaultImage
            }
          />
        </div>
      </Card>
    </>
  );
};

export default CollectionItem;
