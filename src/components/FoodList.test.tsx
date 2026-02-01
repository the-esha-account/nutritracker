import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoodList } from './FoodList';
import type { Food } from '../types.js';

describe('FoodList', () => {
  const mockFoods: Food[] = [
    { id: '1', name: 'Apple', calories: 95, timestamp: Date.now() },
    { id: '2', name: 'Banana', calories: 105, timestamp: Date.now() },
  ];

  it('displays total calories correctly', () => {
    render(<FoodList foods={mockFoods} onDelete={vi.fn()} />);
    
    expect(screen.getByText(/total: 200 cal/i)).toBeInTheDocument();
  });

  it('renders all food items', () => {
    render(<FoodList foods={mockFoods} onDelete={vi.fn()} />);
    
    expect(screen.getByText(/apple/i)).toBeInTheDocument();
    expect(screen.getByText(/banana/i)).toBeInTheDocument();
    expect(screen.getByText(/95 cal/i)).toBeInTheDocument();
    expect(screen.getByText(/105 cal/i)).toBeInTheDocument();
  });

  it('shows empty state when no foods', () => {
    render(<FoodList foods={[]} onDelete={vi.fn()} />);
    
    expect(screen.getByText(/no foods logged yet/i)).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();
    
    render(<FoodList foods={mockFoods} onDelete={mockOnDelete} />);
    
    const deleteButtons = screen.getAllByText(/delete/i);
    await user.click(deleteButtons[0]);
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});
