import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./views/products/HomeScreen";
import Header from "./components/layout-components/Header";
import Footer from "./components/layout-components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
