import { FAQAccordion } from "../../features/faq/FAQAccordion.jsx";
import { useRenderCount } from "../../hooks/useRenderCount.js";
export const Support = () => {
  useRenderCount("Support");
  return (
    <div>
      <h2>Support</h2>
      {/* FAQ */}
      <>
        <FAQAccordion />
      </>
    </div>
  );
};
