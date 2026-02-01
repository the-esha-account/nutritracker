import type { Food } from '../types.js';

export const getTotalCalories = (foods: Food[]): number => {
  return foods.reduce((total, food) => total + food.calories, 0);
};

export const isValidFood = (food: Partial<Food>): boolean => {
  if (!food.name || food.name.trim() === '') return false;
  if (typeof food.calories !== 'number') return false;
  if (isNaN(food.calories)) return false;
  if (food.calories < 0) return false;
  return true;
};

export const formatFoodName = (name: string): string => {
  return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
};
