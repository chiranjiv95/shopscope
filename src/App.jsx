import "./App.css";
import React, { useMemo, useRef, useState, useDeferredValue } from "react";
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
  const [minPrice, setMinPrice] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState(""); // debounced search term

  const debounceTimer = useRef(null);

  const deferredQuery = useDeferredValue(query);

  // logs render counts
  useRenderCount(`App ${minPrice}`);

  // 🔹 useMemo prevents recalculation on unrelated renders (like theme toggle)
  const filteredProducts = useMemo(() => {
    console.log("Filtering products for minPrice:", minPrice, query); // demo log
    return products.filter(
      (p) =>
        p.price >= minPrice &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [minPrice, deferredQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    clearTimeout(debounceTimer.current); // clear previous timer

    // set new timer (500ms delay)
    debounceTimer.current = setTimeout(() => {
      setQuery(value);
    }, 500);
  };

  return (
    // theme applied to wrapper via class (CSS variables used inside .product-card)
    <div className={theme === "dark" ? "app-theme--dark" : "app-theme--light"}>
      <button
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        Toggle Theme
      </button>

      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search by name..."
      />

      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Minimum Price"
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
