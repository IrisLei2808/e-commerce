import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { signOut } from "../../redux/actions/Auth";

const Header = (props) => {
  const { userInfoFromStorage, signOut } = props;
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>OSE Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart mr-2"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfoFromStorage ? (
                <NavDropdown title={userInfoFromStorage.userName} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    userInfoFromStorage: auth && auth.userInfoFromStorage,
  };
};

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
