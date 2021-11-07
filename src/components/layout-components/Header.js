import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { signOut } from "../../redux/actions/Auth";
import { formatMoney } from "../../utils/formatText";

const Header = (props) => {
  const { userInfoFromStorage, signOut } = props;
  return (
    <header>
      <img
        class="image"
        src="//icms-image.slatic.net/images/ims-web/26e000f2-824d-4717-b539-f7bdce8224ef.jpg"
        alt="10.7"
        data-spm-anchor-id="a2o4n.home.0.i0.68b4e1826jx3lr"
        style={{ height: "94px", width: "100%", cursor: "pointer" }}
      />
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <LinkContainer to="/">
              <NavDropdown.Item>Old Stuff Exchange</NavDropdown.Item>
            </LinkContainer>
          </Navbar.Brand>
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
                  <NavDropdown.Item
                    style={{ color: "#02aab0", fontWeight: "bold" }}
                    disabled={true}
                  >
                    {userInfoFromStorage.balance
                      ? formatMoney(userInfoFromStorage.balance)
                      : formatMoney(0)}
                  </NavDropdown.Item>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
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
