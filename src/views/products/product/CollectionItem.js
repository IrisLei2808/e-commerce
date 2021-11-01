import React from "react";
import Card from "react-bootstrap/Card";

const CollectionItem = () => {
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
          Iphone 12 Pro Max 128GB
        </Card.Text>
        <Card.Text style={{ marginLeft: "100px" }}>5 quantities</Card.Text>
        <div className="img-product">
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px", marginLeft: "20px" }}
            src="https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg"
          />
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px", marginLeft: "20px" }}
            src="https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg"
          />
          <Card.Img
            variant="top"
            style={{ height: "67px", width: "67px", marginLeft: "20px" }}
            src="https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg"
          />
        </div>
      </Card>
    </>
  );
};

export default CollectionItem;
