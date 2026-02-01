import { useState } from 'react';
import type { Food } from '../types.js';
import { isValidFood, formatFoodName } from '../utils/calculator.js';

interface FoodFormProps {
  onAdd: (food: Food) => void;
}

export const FoodForm = ({ onAdd }: FoodFormProps) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const calorieNum = parseInt(calories);
    const foodData = { name, calories: calorieNum };

    if (!isValidFood(foodData)) {
      setError('Please enter a valid food name and positive calorie value');
      return;
    }

    const newFood: Food = {
      id: Date.now().toString(),
      name: formatFoodName(name),
      calories: calorieNum,
      timestamp: Date.now(),
    };

    onAdd(newFood);
    setName('');
    setCalories('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Log Food</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="food-name" className="block text-gray-700 font-medium mb-2">
          Food Name
        </label>
        <input
          id="food-name"
          type="text"
          data-testid="food-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Apple"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="calories" className="block text-gray-700 font-medium mb-2">
          Calories
        </label>
        <input
          id="calories"
          type="number"
          data-testid="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 95"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Add Food
      </button>
    </form>
  );
};
