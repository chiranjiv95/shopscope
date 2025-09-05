import "./App.css";
import { useState } from "react";
import { products } from "./data.js";
import { useRenderCount } from "./hooks/useRenderCount.js";

const ProductCard = ({ product, theme }) => {
  useRenderCount(`ProductCard ${product.id}`);

  const bg = theme === "dark" ? "#333" : "#fff";
  const color = theme === "dark" ? "#fff" : "#000";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "8px",
        margin: "4px",
        width: "180px",
        background: bg,
        color,
      }}
    >
      <img src={product.image} alt={product.name} width="160" height="160" />
      <h4>{product.name}</h4>
      <p>₹ {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} theme={theme} />
        ))}
      </div>
    </div>
  );
}

export default App;
