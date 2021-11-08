import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./views/products/product/HomeScreen";
import Header from "./components/layout-components/Header";
import Footer from "./components/layout-components/Footer";
import LoginScreen from "./views/auth/LoginScreen";
import RegisterScreen from "./views/auth/RegisterScreen";
import DetailScreen from "./views/products/product-categories/DetaIlScreen";
import CategoryScreen from "./views/products/product-categories/CategoryScreen";
import ProductByBrandScreen from "./views/products/product-categories/ProductByBrandScreen";
import CardScreen from "./views/products/cart/CartScreen";
import PostScreen from "./views/products/product-post/PostScreen";
import PlaceOrderScreen from "./views/products/cart/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <main
        className="py-3"
        style={{
          background: "linear-gradient(to right, #e9defa, #fbfcdb)",
        }}
      >
        <Route path="/" component={HomeScreen} exact />
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={DetailScreen} />
          <Route path="/category/:id" component={CategoryScreen} />
          <Route path="/brand/:id" component={ProductByBrandScreen} />
          <Route path="/cart/:id?" component={CardScreen} />
          <Route path="/post" component={PostScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
