import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AvatarUpload from '../../components/layout-components/AvatarUpload';
import FormContainer from '../../components/layout-components/FormContainer';
import Message from '../../components/shared-components/ErrorMessage';
import {
  avatarUpload,
  register,
  resetAuthType,
} from '../../redux/actions/Auth';
import {
  AVATAR_UPLOAD_SUCCESS,
  USER_REGISTER_SUCCESS,
} from '../../redux/constants/Auth';

const RegisterScreen = (props) => {
  const {
    register,
    loading,
    resetAuthType,
    error,
    type,
    location,
    history,
    avatarUpload,
    fileList,
  } = props;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const [preview, setPreview] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('female');
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const [message, setMessage] = useState('');
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const finalDate = (date) => {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };
  finalDate(selectedDate);

  const submitHandler = (e) => {
    e.preventDefault();
    avatarUpload(preview);
  };

  useEffect(() => {
    switch (type) {
      case USER_REGISTER_SUCCESS:
        history.push(redirect);
      case AVATAR_UPLOAD_SUCCESS:
        if (password !== confirmPassword) {
          setMessage('Passwords do not match');
        } else {
          register(
            name,
            password,
            address,
            phone,
            fullName,
            value,
            finalDate(selectedDate),
            fileList && fileList.url
          );
        }
        break;
    }
    resetAuthType();
  }, [type]);

  return (
    <FormContainer color={'red'}>
      <h1>Đăng ký</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error && error.message}</Message>}
      <Form onSubmit={submitHandler}>
        <AvatarUpload preview={preview} setPreview={setPreview} />
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="input"
            placeholder="Nhập tên tài khoản"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Xác nhận lại mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu xác nhận"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="input"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="input"
            placeholder="Nhập họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Giới tính</Form.Label>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            row
            defaultValue="female"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
          </RadioGroup>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Ngày sinh</Form.Label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="flex-start">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Chọn ngày sinh"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Form.Group>
        <button
          className="btn btn-primary btn-block btn-lg"
          type="submit"
          disabled={loading}
        >
          <span
            className={loading ? 'spinner-border spinner-border-sm' : ''}
            role="status"
            aria-hidden="true"
          ></span>
          {loading ? 'Loading...' : 'Đăng ký'}
        </button>
      </Form>
      <Row className="py-3">
        <Col>
          Chưa có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    type: auth && auth.type,
    loading: auth && auth.loading,
    error: auth && auth.error,
    user: auth && auth.user,
    fileList: auth && auth.fileList,
  };
};

const mapDispatchToProps = {
  register,
  avatarUpload,
  resetAuthType,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
