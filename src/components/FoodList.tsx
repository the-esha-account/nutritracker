import type { Food } from '../types.js';
import { getTotalCalories } from '../utils/calculator.js';

interface FoodListProps {
  foods: Food[];
  onDelete: (id: string) => void;
}

export const FoodList = ({ foods, onDelete }: FoodListProps) => {
  const total = getTotalCalories(foods);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Today's Food Log</h2>
        <div className="text-xl font-semibold text-blue-600">
          Total: {total} cal
        </div>
      </div>

      {foods.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No foods logged yet. Add your first meal!</p>
      ) : (
        <ul className="space-y-2">
          {foods.map((food) => (
            <li
              key={food.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <span className="font-medium text-gray-800">{food.name}</span>
                <span className="text-gray-600 ml-2">- {food.calories} cal</span>
              </div>
              <button
                onClick={() => onDelete(food.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
