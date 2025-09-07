import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import DirectFetchDemo from "../features/query-demo/DirectFetchDemo";
import QueryDemo from "../features/query-demo/QueryDemo";
const Home = lazy(() => import("./routes/Home"));
const Cart = lazy(() => import("./routes/Cart"));
const ProductDetails = lazy(() => import("./routes/ProductDetails"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/direct-fetch" element={<DirectFetchDemo />} />
          <Route path="/query-fetch" element={<QueryDemo />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
