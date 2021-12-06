import { useState } from 'react';

export function openInNewTab(url) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
}

export function useLocalStorage(key) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item && JSON.parse(item);
    } catch (error) {
      // If error also return initialValue
    }
  });
  return [storedValue];
}
