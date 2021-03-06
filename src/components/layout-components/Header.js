import React, { useMemo, useState } from 'react';
import {
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Image,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { signOut } from '../../redux/actions/Auth';
import { fetchCategoryByBrand } from '../../redux/actions/Product';
import { getProfile } from '../../redux/actions/Auth';
import { formatMoney } from '../../utils/formatText';
import { getIcon } from '../../utils/iconText';
import { useHistory } from 'react-router-dom';
import { AVATAR_NO_URL } from '../../configs/Constants';

const Header = (props) => {
  let history = useHistory();
  const {
    userInfoFromStorage,
    signOut,
    fetchCategoryByBrand,
    categoryList,
    getProfile,
    balance,
  } = props;
  const [curDropdownID, setCurDropdownID] = useState(null);
  const own = JSON.parse(localStorage.getItem('userInfo'));
  const isOpen = (id) => {
    return curDropdownID === id;
  };

  const toggle = (id) => {
    setCurDropdownID(id);
  };

  useMemo(() => {
    fetchCategoryByBrand();
  }, []);

  useMemo(() => {
    getProfile(own && own.token);
  }, []);

  const handleLogout = () => {
    signOut();
    history.push('/login');
  };

  return (
    <header>
      <Navbar
        style={{ background: 'linear-gradient(to right, #525252, #3d72b4)' }}
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
              <LinkContainer
                to={
                  userInfoFromStorage ? '/mapping' : '/login?redirect=mapping'
                }
              >
                <Nav.Link>
                  <i class="fas fa-lightbulb mr-2"></i>G???i ?? trao ?????i
                </Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={userInfoFromStorage ? '/post' : '/login?redirect=post'}
              >
                <Nav.Link>
                  <i class="fas fa-cart-plus mr-2"></i>????ng s???n ph???m
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart mr-2"></i>Gi??? h??ng
                </Nav.Link>
              </LinkContainer>
              {userInfoFromStorage ? (
                <>
                  <NavDropdown
                    title={userInfoFromStorage.fullName}
                    id="username"
                    className="ml-3"
                  >
                    <NavDropdown.Item
                      style={{ color: '#02aab0', fontWeight: 'bold' }}
                      disabled={true}
                    >
                      <i
                        className="fas fa-wallet mr-2"
                        style={{ width: 25 }}
                      ></i>
                      {balance ? formatMoney(balance) : formatMoney(0)}
                    </NavDropdown.Item>
                    <LinkContainer to="/purchase">
                      <NavDropdown.Item>
                        <i
                          class="fas fa-shopping-basket mr-2"
                          style={{ width: 25 }}
                        ></i>
                        ????n mua
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/sell">
                      <NavDropdown.Item>
                        <i
                          class="fas fa-cash-register mr-2"
                          style={{ width: 25 }}
                        ></i>
                        ????n b??n
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <i
                          className="fas fa-user-circle mr-2"
                          style={{ width: 25 }}
                        ></i>
                        H??? s?? c?? nh??n
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/transaction">
                      <NavDropdown.Item>
                        <i
                          className="fas fa-hand-holding-usd mr-2"
                          style={{ width: 25 }}
                        ></i>
                        N???p ti???n
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      <i class="fas fa-sign-out-alt mr-2"></i>????ng xu???t
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Image
                    src={
                      userInfoFromStorage.avatar
                        ? userInfoFromStorage.avatar
                        : `${AVATAR_NO_URL}`
                    }
                    style={{ width: 40, height: 40 }}
                  />
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> ????ng nh???p
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar
        expand="lg"
        style={{ background: 'linear-gradient(to left, #ff5f6d, #ffc371)' }}
        variant="dark"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: 'center' }}
        >
          <Nav
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Row
              style={{
                width: '100%',
                justifyContent: 'center',
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
                          <span style={{ fontWeight: 'bold' }}>
                            {category && category.brandname}
                          </span>
                        </span>
                      }
                      id="basic-nav-dropdown"
                      show={isOpen(category.idbrand)}
                      onMouseEnter={() => toggle(category.idbrand)}
                      onMouseLeave={() => toggle('')}
                      style={{
                        textAlign: 'center',
                        width: '70%',
                      }}
                    >
                      {category &&
                        category.categories &&
                        category.categories.map((item) => (
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
    balance: auth && auth.balance,
  };
};

const mapDispatchToProps = {
  signOut,
  fetchCategoryByBrand,
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
