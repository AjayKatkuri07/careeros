import { useState, useEffect } from "react";
import { getItem, setItem } from "../utils/storage.js";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = getItem(key);
    return stored !== null ? stored : defaultValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}