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
      <h1>????ng k??</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error && error.message}</Message>}
      <Form onSubmit={submitHandler}>
        <AvatarUpload preview={preview} setPreview={setPreview} />
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>T??n t??i kho???n</Form.Label>
          <Form.Control
            type="input"
            placeholder="Nh???p t??n t??i kho???n"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>M???t kh???u</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nh???p m???t kh???u"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>X??c nh???n l???i m???t kh???u</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nh???p m???t kh???u x??c nh???n"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>?????a ch???</Form.Label>
          <Form.Control
            type="input"
            placeholder="Nh???p ?????a ch???"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>S??? ??i???n tho???i</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nh???p s??? ??i???n tho???i"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>H??? v?? t??n</Form.Label>
          <Form.Control
            type="input"
            placeholder="Nh???p h??? v?? t??n"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gi???i t??nh</Form.Label>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            row
            defaultValue="female"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="N???" />
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
          </RadioGroup>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Ng??y sinh</Form.Label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="flex-start">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Ch???n ng??y sinh"
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
          {loading ? 'Loading...' : '????ng k??'}
        </button>
      </Form>
      <Row className="py-3">
        <Col>
          Ch??a c?? t??i kho???n? <Link to="/login">????ng nh???p</Link>
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
