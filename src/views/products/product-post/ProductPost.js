import { Box, MenuItem, TextField } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Form, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileUpload from "../../../components/layout-components/FileUpload";
import CurrencyInput from "react-currency-input-field";
import {
  fetchCategoryByBrand,
  createProduct,
  getAllCategory,
  imageRemove,
  resetProductType,
} from "../../../redux/actions/Product";
import {
  ALL_CATEGORY_SUCCESS,
  CATEGORY_BY_BRAND_SUCCESS,
  IMAGE_REMOVE_SUCCESS,
} from "../../../redux/constants/Product";
import Autocomplete from "@material-ui/lab/Autocomplete";

const currencies = [
  {
    value: "SELL",
    label: "SELL",
  },
  {
    value: "EXCHANGE",
    label: "EXCHANGE",
  },
  {
    value: "BOTH",
    label: "BOTH",
  },
];

const ProductPost = (props) => {
  const {
    fetchCategoryByBrand,
    getAllCategory,
    imageRemove,
    cloudinaryId,
    categoryList,
    allCategory,
    createProduct,
    type,
  } = props;
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [currency, setCurrency] = useState("");
  const wantChangeStatus = currency === "EXCHANGE" || currency === "BOTH";

  const handleStatusChange = (event) => {
    setCurrency(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    createProduct(
      name,
      description,
      quantity,
      price,
      image,
      //own,
      status,
      category
      //categoryChangeID
    );
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleCategoryChange = (e, value) => {
    setCategoryId(value && value.idcategory);
  };

  const handleBrandChange = (e, value) => {
    if (value) {
      setCategory(value && value.Categories);
    } else {
      setCategory(allCategory);
    }
  };

  const images = [];
  image &&
    image.map((item) => {
      images.push(item.url);
    });

  useEffect(() => {
    fetchCategoryByBrand();
  }, []);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    switch (type) {
      case IMAGE_REMOVE_SUCCESS:
        let filteredImages = image.filter(
          (item) => item.cloudinaryId !== cloudinaryId && cloudinaryId
        );
        setImage(filteredImages);
        break;
      case CATEGORY_BY_BRAND_SUCCESS:
        setBrand(categoryList);
        break;
      case ALL_CATEGORY_SUCCESS:
        setCategory(allCategory);
        break;
      default:
        break;
    }
    return function cleanup() {
      resetProductType();
    };
  }, [type]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
        borderRadius: 5,
        padding: "20px 0px",
        justifyContent: "space-around",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Post Product</h2>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {image && image.length > 0 && (
          <Row className="w-50 d-flex align-items-center py-3">
            {image.map((item, index) => (
              <Col sm={12} md={8} lg={4} xl={3}>
                <Badge
                  color="secondary"
                  badgeContent={<i class="fas fa-times"></i>}
                  style={{ cursor: "pointer" }}
                  onClick={() => imageRemove(item && item.cloudinaryId)}
                >
                  <Image
                    key={item.cloudinaryId}
                    src={item.url}
                    style={{ width: 120, height: 100, cursor: "pointer" }}
                    onClick={() => openInNewTab(item.url)}
                  />
                </Badge>
              </Col>
            ))}
          </Row>
        )}
        <Row className="w-50 d-flex">
          <FileUpload
            image={image}
            setImage={setImage}
            setLoading={setLoading}
          />
        </Row>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          color="secondary"
          className="mt-3 w-50"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Autocomplete
          id="combo-box-demo"
          options={brand}
          getOptionLabel={(option) => option.brandname}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Brand" variant="outlined" />
          )}
          className="mt-4 w-50"
          onChange={handleBrandChange}
        />
        <Autocomplete
          id="combo-box-demo"
          options={category}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Category" variant="outlined" />
          )}
          className="mt-4 w-50"
          onChange={handleCategoryChange}
        />
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: "100px" }}
          className="mt-4 w-50"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="number"
          label="Quantity"
          variant="outlined"
          color="secondary"
          className="mt-4 w-50"
          required
          onChange={(e) => setQuantity(e.target.value)}
        />
        <CurrencyInput
          suffix=" VND"
          id="input-example"
          name="input-name"
          placeholder="Price *"
          decimalsLimit={2}
          onValueChange={(value, name) => setPrice(value)}
          className="mt-4 w-50"
          style={{
            padding: "16px 14px",
            borderRadius: 5,
            border: "1px solid #bfbfbf",
          }}
          required
        />

        <TextField
          id="outlined-select-currency"
          select
          variant="outlined"
          label="Status"
          value={currency}
          color="secondary"
          onChange={handleStatusChange}
          className="mt-4 w-50"
          required
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {wantChangeStatus && (
          <>
            <Autocomplete
              id="combo-box-demo"
              options={brand}
              getOptionLabel={(option) => option.brandname}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand want change"
                  variant="outlined"
                />
              )}
              className="mt-4 w-50"
              onChange={handleBrandChange}
            />
            <Autocomplete
              id="combo-box-demo"
              options={category}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category want change"
                  variant="outlined"
                />
              )}
              className="mt-4 w-50"
            />
          </>
        )}
        <Button variant="primary" type="submit" className="mt-3">
          Post Product
        </Button>
      </Form>
    </Box>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    type: product.type,
    cloudinaryId: product && product.cloudinaryId,
    categoryList: product && product.categoryList,
    allCategory: product && product.allCategory,
  };
};

const mapDispatchToProps = {
  imageRemove,
  fetchCategoryByBrand,
  getAllCategory,
  resetProductType,
  createProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPost);
