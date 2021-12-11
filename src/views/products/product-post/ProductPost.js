import { Box, MenuItem, TextField } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import React, { useEffect, useState } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from '../../../components/layout-components/FileUpload';
import LoadingButton from '../../../components/shared-components/LoadingButton';
import ProductModal from '../../../components/shared-components/Modal';
import {
  createProduct,
  fetchCategoryByBrand,
  fetchSuggestPrice,
  getAllCategory,
  imageRemove,
  resetProductType,
} from '../../../redux/actions/Product';
import {
  ALL_CATEGORY_SUCCESS,
  CATEGORY_BY_BRAND_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  IMAGE_REMOVE_SUCCESS,
} from '../../../redux/constants/Product';
import { useLocalStorage } from '../../../utils/utilities';
import { formatMoney } from '../../../utils/formatText';

const currencies = [
  {
    value: 'SELL',
    label: 'BÁN',
  },
  {
    value: 'EXCHANGE',
    label: 'TRAO ĐỔI',
  },
  {
    value: 'BOTH',
    label: 'BÁN HOẶC TRAO ĐỔI',
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
    newProductId,
    loading,
    type,
    fetchSuggestPrice,
    suggestPrice,
  } = props;
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useLocalStorage('userInfo');
  const handleClose = () => history.push('/');
  const goToDetail = () => history.push(`/product/${newProductId}`);

  const [isSuggest, setIsSuggest] = useState(false);
  const [image, setImage] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [brandWantChange, setBrandWantChange] = useState('');
  const [category, setCategory] = useState('');
  const [categoryWantChange, setCategoryWantChange] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryIdWantChange, setCategoryIdWantChange] = useState('');
  const [currency, setCurrency] = useState('');
  const wantChangeStatus = currency === 'EXCHANGE' || currency === 'BOTH';
  const handleStatusChange = (event) => {
    const { value } = event.target;
    setCurrency(event.target.value);
    if (value === 'EXCHANGE' || value === 'BOTH') {
      setQuantity(1);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    createProduct(
      name,
      description,
      quantity,
      price,
      image,
      userId && userId.id,
      currency,
      categoryId,
      categoryIdWantChange
    );
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const handleCategoryChange = (e, value) => {
    setCategoryId(value && value.idcategory);
    if (value) {
      fetchSuggestPrice(value && value.idcategory);
      setIsSuggest(true);
    } else {
      setIsSuggest(false);
    }
  };

  const handleCategoryWantChange = (e, value) => {
    setCategoryIdWantChange(value && value.idcategory);
  };

  const handleBrandChange = (e, value) => {
    if (value) {
      setCategory(value && value.categories);
    } else {
      setCategory(allCategory);
    }
  };

  const handleBrandWantChange = (e, value) => {
    if (value) {
      setCategoryWantChange(value && value.categories);
    } else {
      setCategoryWantChange(allCategory);
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
        setBrandWantChange(categoryList);
        break;
      case ALL_CATEGORY_SUCCESS:
        setCategory(allCategory);
        setCategoryWantChange(allCategory);
        break;
      case CREATE_PRODUCT_SUCCESS:
        setShow(true);
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
        backgroundColor: '#fff',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
        borderRadius: 5,
        padding: '20px 0px',
        justifyContent: 'space-around',
      }}
    >
      <ToastContainer position="top-center" autoClose={5000} />
      <h2 style={{ textAlign: 'center' }}>Đăng sản phẩm</h2>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {image && image.length > 0 && (
          <Row className="w-50 d-flex align-items-center py-3">
            {image.map((item, index) => (
              <Col sm={12} md={8} lg={4} xl={3}>
                <Badge
                  color="secondary"
                  badgeContent={<i class="fas fa-times"></i>}
                  style={{ cursor: 'pointer' }}
                  onClick={() => imageRemove(item && item.cloudinaryId)}
                >
                  <Image
                    key={item.cloudinaryId}
                    src={item.url}
                    style={{ width: 120, height: 100, cursor: 'pointer' }}
                    onClick={() => openInNewTab(item.url)}
                  />
                </Badge>
              </Col>
            ))}
          </Row>
        )}
        <Row className="w-50 d-flex">
          <FileUpload image={image} setImage={setImage} />
        </Row>
        <TextField
          id="outlined-basic"
          label="Tên sản phẩm"
          variant="outlined"
          className="mt-3 w-50"
          required
          onChange={(e) => setName(e.target.value)}
        />
        {brand.length > 0 && (
          <Autocomplete
            id="combo-box-demo"
            options={brand}
            getOptionLabel={(option) => option.brandname}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Tên hãng" variant="outlined" />
            )}
            className="mt-4 w-50"
            onChange={handleBrandChange}
          />
        )}
        {category.length > 0 && (
          <Autocomplete
            id="combo-box-demo"
            options={category}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Loại sản phẩm" variant="outlined" />
            )}
            className="mt-4 w-50"
            onChange={handleCategoryChange}
          />
        )}
        <Form.Control
          as="textarea"
          placeholder="Mô tả"
          style={{ height: '100px' }}
          className="mt-4 w-50"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="number"
          label="Số lượng"
          variant="outlined"
          className="mt-4 w-50"
          required
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: 0 }}
          value={quantity}
          disabled={wantChangeStatus}
        />
        {/* <CurrencyInput
          suffix=" VND"
          id="input-example"
          name="input-name"
          placeholder="Giá *"
          decimalsLimit={2}
          onValueChange={(value, name) => setPrice(value)}
          className="mt-4 w-50"
          style={{
            padding: '16px 14px',
            borderRadius: 5,
            border: '1px solid #bfbfbf',
          }}
          required
        /> */}
        <CurrencyTextField
          variant="standard"
          currencySymbol="VNĐ"
          outputFormat="string"
          variant="outlined"
          className="mt-4 w-50"
          minimumValue="0"
          digitGroupSeparator=","
          decimalPlaces="0"
          placeholder="Giá *"
          required
          onChange={(event, value) => setPrice(value)}
          helperText={
            isSuggest
              ? suggestPrice && suggestPrice !== 0
                ? `Mặt hàng này có giá khoảng ${formatMoney(suggestPrice)}`
                : 'Mặt hàng này chưa có gợi ý giá'
              : ''
          }
        />
        <TextField
          id="outlined-select-currency"
          select
          variant="outlined"
          label="Hình thức"
          value={currency}
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
        {wantChangeStatus &&
          brandWantChange.length > 0 &&
          categoryWantChange.length > 0 && (
            <>
              <Autocomplete
                id="combo-box-demo"
                options={brandWantChange}
                getOptionLabel={(option) => option.brandname}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hãng muốn trao đổi"
                    variant="outlined"
                  />
                )}
                className="mt-4 w-50"
                onChange={handleBrandWantChange}
              />
              <Autocomplete
                id="combo-box-demo"
                options={categoryWantChange}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Loại sản phẩm muốn trao đổi"
                    variant="outlined"
                  />
                )}
                className="mt-4 w-50"
                onChange={handleCategoryWantChange}
              />
            </>
          )}
        <LoadingButton loading={loading} title="Đăng sản phẩm" />
      </Form>
      <ProductModal
        show={show}
        handleClose={handleClose}
        history={history}
        goToDetail={goToDetail}
      />
    </Box>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    type: product.type,
    cloudinaryId: product && product.cloudinaryId,
    categoryList: product && product.categoryList,
    allCategory: product && product.allCategory,
    loading: product && product.loading,
    newProductId:
      product &&
      product.newProductId &&
      product.newProductId.data &&
      product.newProductId.data.idProduct,
    suggestPrice: product && product.suggestPrice,
  };
};

const mapDispatchToProps = {
  imageRemove,
  fetchCategoryByBrand,
  getAllCategory,
  resetProductType,
  createProduct,
  fetchSuggestPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPost);
