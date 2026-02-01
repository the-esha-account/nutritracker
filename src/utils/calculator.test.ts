import { describe, it, expect } from 'vitest';
import { getTotalCalories, isValidFood, formatFoodName } from './calculator';
import type { Food } from '../types.js';

describe('getTotalCalories', () => {
  it('calculates total calories correctly', () => {
    const foods: Food[] = [
      { id: '1', name: 'Apple', calories: 95, timestamp: Date.now() },
      { id: '2', name: 'Banana', calories: 105, timestamp: Date.now() },
    ];
    expect(getTotalCalories(foods)).toBe(200);
  });

  it('returns 0 for empty array', () => {
    expect(getTotalCalories([])).toBe(0);
  });

  it('handles single food item', () => {
    const foods: Food[] = [
      { id: '1', name: 'Apple', calories: 95, timestamp: Date.now() },
    ];
    expect(getTotalCalories(foods)).toBe(95);
  });
});

describe('isValidFood', () => {
  it('returns true for valid food', () => {
    expect(isValidFood({ name: 'Apple', calories: 95 })).toBe(true);
  });

  it('returns false for empty name', () => {
    expect(isValidFood({ name: '', calories: 95 })).toBe(false);
  });

  it('returns false for whitespace-only name', () => {
    expect(isValidFood({ name: '   ', calories: 95 })).toBe(false);
  });

  it('returns false for negative calories', () => {
    expect(isValidFood({ name: 'Apple', calories: -50 })).toBe(false);
  });

  it('returns false for non-number calories', () => {
    expect(isValidFood({ name: 'Apple', calories: NaN })).toBe(false);
  });
});

describe('formatFoodName', () => {
  it('capitalizes first letter', () => {
    expect(formatFoodName('apple')).toBe('Apple');
  });

  it('lowercases rest of string', () => {
    expect(formatFoodName('APPLE')).toBe('Apple');
  });

  it('trims whitespace', () => {
    expect(formatFoodName('  apple  ')).toBe('Apple');
  });

  it('handles mixed case', () => {
    expect(formatFoodName('aPpLe')).toBe('Apple');
  });
});
