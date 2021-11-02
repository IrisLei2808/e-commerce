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

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={DetailScreen} />
          <Route path="/category/:id" component={CategoryScreen} />
          <Route path="/brand/:id" component={ProductByBrandScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
