import { useState, useEffect } from "react";

/**
 * Returns a debounced version of a value
 * @param value The value to debounce
 * @param delay Delay in ms
 */
export function useDebouncedValue(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // cleanup on value/delay change
  }, [value, delay]);

  return debouncedValue;
}
