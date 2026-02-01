import { useState, useEffect } from 'react';
import type { Food } from './types.js';
import { FoodForm } from './components/FoodForm.js';
import { FoodList } from './components/FoodList.js';
import { loadFoods, saveFoods } from './utils/storage.js';

function App() {
  const [foods, setFoods] = useState<Food[]>(() => loadFoods());

  useEffect(() => {
    saveFoods(foods);
  }, [foods]);

  const handleAddFood = (food: Food) => {
    setFoods([...foods, food]);
  };

  const handleDeleteFood = (id: string) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🍎 NutriTracker
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FoodForm onAdd={handleAddFood} />
          <FoodList foods={foods} onDelete={handleDeleteFood} />
        </div>
      </div>
    </div>
  );
}

export default App;
