import "./App.css";
import React, { useState } from "react";
import { products } from "./data.js";
import { useRenderCount } from "./hooks/useRenderCount.js";

const ProductCardComponent = ({ product }) => {
  // logs render counts
  useRenderCount(`ProductCard ${product.id}`);

  // handler lives inside the card — it won't break memoization because
  // the card itself won't re-render unless its props change.
  const handleClick = () => {
    alert(`Clicked ${product.name}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={product.image} alt={product.name} width="160" height="160" />
      <h4>{product.name}</h4>
      <p>₹ {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

// memoize the card so it only re-renders when `product` changes
const ProductCard = React.memo(ProductCardComponent);

function App() {
  const [theme, setTheme] = useState("light");
  return (
    // theme applied to wrapper via class (CSS variables used inside .product-card)
    <div className={theme === "dark" ? "app-theme--dark" : "app-theme--light"}>
      <button
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        Toggle Theme
      </button>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
