import React, { useContext } from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProductOverview from "./pages/ProductOverview";
import { ThemeContext } from "./State Management/Contexts/NewContexts";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route
          path="/product/:id"
          element={<ProductOverview theme={theme} />}
        />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
