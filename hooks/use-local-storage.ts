"use client";

import { useState, useEffect } from 'react';

export interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  price: number;
  purchaseDate: string;
  laboratory: string;
  expiry: string;
}

export interface ExpiringItem {
  id: number;
  name: string;
  stock: number;
  expiry: string;
  purchaseDate: string;
  daysLeft: number;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state with a function to avoid unnecessary initial calculations
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Only update localStorage when storedValue changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}