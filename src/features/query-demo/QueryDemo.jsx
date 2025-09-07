import React from "react";
import { useRenderCount } from "../../hooks/useRenderCount";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} width="160" height="160" />
    <h4>{product.name}</h4>
    <p>₹ {product.price}</p>
    <p>{product.description}</p>
  </div>
);

const QueryDemo = () => {
  useRenderCount("QueryDemo");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
  });

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="product-grid">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default QueryDemo;
