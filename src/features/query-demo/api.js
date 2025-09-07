export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: (Math.random() * 1000).toFixed(2),
        description: `This is the description for product ${i + 1}`,
        image: `https://placehold.co/200x200?text=Product${i + 1}`,
      }));

      resolve(products);
    }, 1000); // Simulate 1 second network delay
  });
};
