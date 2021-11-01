import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../../components/layout-components/FormContainer";
import Message from "../../components/shared-components/ErrorMessage";
import Loader from "../../components/shared-components/Spinner";
import { resetAuthType, signIn } from "../../redux/actions/Auth";
import { USER_LOGIN_SUCCESS } from "../../redux/constants/Auth";

const LoginScreen = (props) => {
  const {
    signIn,
    resetAuthType,
    type,
    loading,
    error,
    user,
    location,
    history,
  } = props;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    signIn(username, password);
  };

  useEffect(() => {
    switch (type) {
      case USER_LOGIN_SUCCESS:
        history.push(redirect);
        break;
    }
    resetAuthType();
  }, [type]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && (
        <Message variant="danger">Invalid username or password</Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          block
          className="mt-4"
          size="lg"
        >
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
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
  };
};

const mapDispatchToProps = {
  signIn,
  resetAuthType,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
