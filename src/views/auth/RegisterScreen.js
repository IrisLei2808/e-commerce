import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../../components/layout-components/FormContainer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Message from "../../components/shared-components/ErrorMessage";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  resetAuthType,
  register,
  avatarUpload,
} from "../../redux/actions/Auth";
import Loader from "../../components/shared-components/Spinner";
import AvatarUpload from "../../components/layout-components/AvatarUpload";
import {
  AVATAR_UPLOAD_FAIL,
  AVATAR_UPLOAD_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "../../redux/constants/Auth";

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
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("female");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [message, setMessage] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const finalDate = (date) => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
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
          setMessage("Passwords do not match");
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
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error && error.message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <AvatarUpload preview={preview} setPreview={setPreview} />
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter username"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            row
            defaultValue="female"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Date of birth</Form.Label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="flex-start">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Birthdate picker"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          block
          size="lg"
          className="mt-4"
        >
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account? <Link to="/register">Login</Link>
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
