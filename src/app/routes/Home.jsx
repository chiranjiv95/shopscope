import React, { useMemo, useState, useDeferredValue, forwardRef } from "react";
import { products } from "../../data.js";
import { useRenderCount } from "../../hooks/useRenderCount.js";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import { VirtuosoGrid } from "react-virtuoso";

const gridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        padding: "0.5rem",
        width: "20%", // dynamically control based on your design
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  ),
};

function Home() {
  const [theme, setTheme] = useState("light");
  const [minPrice, setMinPrice] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  // Use hook: automatically debounces searchInput
  const query = useDebouncedValue(searchInput, 500);
  const deferredQuery = useDeferredValue(query);

  // logs render counts
  useRenderCount(`Home ${minPrice}`);

  // 🔹 useMemo prevents recalculation on unrelated renders (like theme toggle)
  const filteredProducts = useMemo(() => {
    console.log("Filtering products for minPrice:", minPrice, deferredQuery);
    return products.filter(
      (p) =>
        p.price >= minPrice &&
        p.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [minPrice, deferredQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
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

      <div style={{ height: "600px" }}>
        <VirtuosoGrid
          style={{ height: "100%" }}
          totalCount={filteredProducts.length}
          components={gridComponents}
          itemContent={(index) => {
            const product = filteredProducts[index];
            return <ProductCard key={product.id} product={product} />;
          }}
        />
      </div>
    </div>
  );
}

export default Home;
