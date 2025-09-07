import React, { useCallback, useState } from "react";
import { useRenderCount } from "../../hooks/useRenderCount";
import { faqs } from "../../data";

const FAQItemComponent = ({ faq, isOpen, onToggle }) => {
  useRenderCount(`FAQ item ${faq.id} - Unoptimised`);

  return (
    <div onClick={() => onToggle(faq.id)}>
      <p>{faq.question}</p>
      {isOpen && <p>{faq.answer}</p>}
    </div>
  );
};

export const FAQItem = React.memo(FAQItemComponent);

export const FAQAccordion = () => {
  useRenderCount("FAQ - Unoptimised");

  const [openItem, setOpenItem] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback((id) => {
    console.log("handle toggle", id);
    setOpenItem((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div>
      <h2>FAQ - Unoptimized</h2>
      <button onClick={() => setToggle(!toggle)}>test</button>

      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isOpen={openItem === faq.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
