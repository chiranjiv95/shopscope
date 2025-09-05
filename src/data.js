export const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000),
  description:
    "This is a demo description that is deliberately long to simulate heavy DOM.",
  image: `https://picsum.photos/seed/${i}/200/200`,
}));
