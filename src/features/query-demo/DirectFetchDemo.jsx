import React, { useEffect, useState } from "react";
import { useRenderCount } from "../../hooks/useRenderCount";
import { fetchProducts } from "./api";

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} width="160" height="160" />
    <h4>{product.name}</h4>
    <p>₹ {product.price}</p>
    <p>{product.description}</p>
  </div>
);

const DirectFetchDemo = () => {
  useRenderCount("Direct Fetch");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading Products...</div>;
  if (isError) return <div>Error Loading Products</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default DirectFetchDemo;
