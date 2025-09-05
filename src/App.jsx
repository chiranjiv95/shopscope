import "./App.css";
import { products } from "./data.js";

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "8px",
        margin: "4px",
        width: "180px",
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
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;
