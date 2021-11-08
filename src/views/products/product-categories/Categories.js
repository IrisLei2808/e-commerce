import React from "react";
import styles from "./product-category.module.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Categories = ({ categories, brandId, brandName }) => {
  return (
    <div>
      <div className={styles.header}>
        <Row className={styles.menu}>
          <Col sm={6} md={6} lg={4} xl={2} className="mb-2">
            <Link to={`/brand/${brandId}`}>Trending {brandName}</Link>
          </Col>
          {categories.map((category) => (
            <Col
              sm={6}
              md={6}
              lg={4}
              xl={2}
              key={category.idcategory}
              className="mb-2"
            >
              <Link to={`/category/${category.idcategory}`}>
                {category.name}
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Categories;
