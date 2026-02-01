import type { Food } from '../types.js';

const STORAGE_KEY = 'nutritracker-foods';

export const loadFoods = (): Food[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFoods = (foods: Food[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
};
