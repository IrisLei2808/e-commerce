import { Box, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileUpload from "../../../components/layout-components/FileUpload";

const currencies = [
  {
    value: "Sell",
    label: "Sell",
  },
  {
    value: "Exchange",
    label: "Exchange",
  },
  {
    value: "Both",
    label: "Both",
  },
];

export default function ProductPost() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("female");
  const [currency, setCurrency] = useState("EUR");
  console.log("IMG: ", image);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }
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
        <Row className="w-50">
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
          className="mt-4 w-50"
        />
        <TextField
          id="outlined-select-currency"
          select
          variant="outlined"
          label="Brand"
          value={currency}
          color="secondary"
          onChange={handleChange}
          className="mt-4 w-50"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          variant="outlined"
          label="Category"
          value={currency}
          color="secondary"
          onChange={handleChange}
          className="mt-4 w-50"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          color="secondary"
          className="mt-4 w-50"
        />
        <TextField
          id="outlined-basic"
          type="number"
          label="Quantity"
          variant="outlined"
          color="secondary"
          className="mt-4 w-50"
        />
        <TextField
          id="outlined-basic"
          type="number"
          label="Price"
          variant="outlined"
          color="secondary"
          className="mt-4 w-50"
        />
        <TextField
          id="outlined-select-currency"
          select
          variant="outlined"
          label="Status"
          value={currency}
          color="secondary"
          onChange={handleChange}
          className="mt-4 w-50"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="primary" type="submit" className="mt-3">
          Post Product
        </Button>
      </Form>
    </Box>
  );
}
