import React from "react";
import { useRenderCount } from "../../hooks/useRenderCount";
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
      <img
        src={product.image}
        alt={product.name}
        width="160"
        height="160"
        loading="lazy"
      />
      <h4>{product.name}</h4>
      <p>₹ {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

// memoize the card so it only re-renders when `product` changes
export const ProductCard = React.memo(ProductCardComponent);
