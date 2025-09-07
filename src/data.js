export const products = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000),
  description:
    "This is a demo description that is deliberately long to simulate heavy DOM.",
  // image: `https://picsum.photos/seed/${i}/200/200`,
  image: `https://placehold.co/200x200?text=Product${i + 1}`,
}));

export const faqs = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}`,
  answer: `Answer ${i + 1}`,
}));
