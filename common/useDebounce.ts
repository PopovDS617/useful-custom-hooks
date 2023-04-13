import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debounceValue, setDevounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDevounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
