import React, { useMemo, useState } from "react";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { signOut } from "../../redux/actions/Auth";
import { fetchCategoryByBrand } from "../../redux/actions/Product";
import { formatMoney } from "../../utils/formatText";
import { getIcon } from "../../utils/iconText";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  let history = useHistory();
  const { userInfoFromStorage, signOut, fetchCategoryByBrand, categoryList } =
    props;
  const [curDropdownID, setCurDropdownID] = useState(null);

  const isOpen = (id) => {
    return curDropdownID === id;
  };

  const toggle = (id) => {
    setCurDropdownID(id);
  };

  useMemo(() => {
    fetchCategoryByBrand();
  }, []);

  return (
    <header>
      {/* <img
        class="image"
        src="//icms-image.slatic.net/images/ims-web/26e000f2-824d-4717-b539-f7bdce8224ef.jpg"
        alt="10.7"
        data-spm-anchor-id="a2o4n.home.0.i0.68b4e1826jx3lr"
        style={{ height: "94px", width: "100%", cursor: "pointer" }}
      /> */}
      <Navbar
        style={{ background: "linear-gradient(to right, #525252, #3d72b4)" }}
        variant="dark"
        expand="lg"
        collapseOnSelec
      >
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
      <Navbar
        expand="lg"
        style={{ background: "linear-gradient(to left, #ff5f6d, #ffc371)" }}
        variant="dark"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "center" }}
        >
          <Nav
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Row
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              {categoryList &&
                categoryList.map((category) => (
                  <Col sm={6} md={6} lg={4} xl={2}>
                    <NavDropdown
                      title={
                        <span
                          onClick={() =>
                            history.push(`/brand/${category.idbrand}`)
                          }
                        >
                          <i
                            className={`${getIcon(
                              category && category.idbrand
                            )} mr-2`}
                          ></i>
                          <span style={{ fontWeight: "bold" }}>
                            {category && category.brandname}
                          </span>
                        </span>
                      }
                      id="basic-nav-dropdown"
                      show={isOpen(category.idbrand)}
                      onMouseEnter={() => toggle(category.idbrand)}
                      onMouseLeave={() => toggle("")}
                      style={{
                        textAlign: "center",
                        width: "70%",
                      }}
                    >
                      {category &&
                        category.Categories &&
                        category.Categories.map((item) => (
                          <NavDropdown.Item
                            onClick={() => {
                              history.push(`/category/${item.idcategory}`);
                            }}
                          >
                            {item.name}
                          </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                  </Col>
                ))}
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

const mapStateToProps = ({ auth, product }) => {
  return {
    userInfoFromStorage: auth && auth.userInfoFromStorage,
    categoryList: product && product.categoryList,
  };
};

const mapDispatchToProps = {
  signOut,
  fetchCategoryByBrand,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
