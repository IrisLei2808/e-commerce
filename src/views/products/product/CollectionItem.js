import React from "react";
import Card from "react-bootstrap/Card";

const CollectionItem = ({ product }) => {
  const defaultImage =
    "https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg";
  return (
    <>
      <Card
        style={{
          width: "300px",
          marginLeft: "40px",
          height: "170px",
          border: "1px solid black",
        }}
      >
        <Card.Text
          style={{ marginLeft: "50px", color: "orange", cursor: "pointer" }}
        >
          {product.name}
        </Card.Text>
        <Card.Text style={{ marginLeft: "100px" }}>
          {product.quantity} quantities
        </Card.Text>
        <div className="img-product">
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px", marginLeft: "20px" }}
            src={
              product && product.Images[0]
                ? product.Images[0].address
                : defaultImage
            }
          />
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px", marginLeft: "20px" }}
            src={
              product && product.Images[1]
                ? product.Images[1].address
                : defaultImage
            }
          />
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px", marginLeft: "20px" }}
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
