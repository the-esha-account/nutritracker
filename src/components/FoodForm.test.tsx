import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoodForm } from './FoodForm';

describe('FoodForm', () => {
  it('renders form with inputs and button', () => {
    render(<FoodForm onAdd={vi.fn()} />);
    
    expect(screen.getByLabelText(/food name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/calories/i)).toBeInTheDocument();
    expect(screen.getByText(/add food/i)).toBeInTheDocument();
  });

  it('calls onAdd with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    
    render(<FoodForm onAdd={mockOnAdd} />);
    
    await user.type(screen.getByLabelText(/food name/i), 'Banana');
    await user.type(screen.getByLabelText(/calories/i), '105');
    await user.click(screen.getByText(/add food/i));
    
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Banana',
        calories: 105,
      })
    );
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    
    render(<FoodForm onAdd={vi.fn()} />);
    
    const nameInput = screen.getByLabelText(/food name/i) as HTMLInputElement;
    const calorieInput = screen.getByLabelText(/calories/i) as HTMLInputElement;
    
    await user.type(nameInput, 'Apple');
    await user.type(calorieInput, '95');
    await user.click(screen.getByText(/add food/i));
    
    expect(nameInput.value).toBe('');
    expect(calorieInput.value).toBe('');
  });

  it('shows error for invalid input', async () => {
    const user = userEvent.setup();
    
    render(<FoodForm onAdd={vi.fn()} />);
    
    await user.click(screen.getByText(/add food/i));
    
    expect(screen.getByText(/please enter a valid food name/i)).toBeInTheDocument();
  });

  it('formats food name correctly', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    
    render(<FoodForm onAdd={mockOnAdd} />);
    
    await user.type(screen.getByLabelText(/food name/i), 'APPLE');
    await user.type(screen.getByLabelText(/calories/i), '95');
    await user.click(screen.getByText(/add food/i));
    
    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Apple',
      })
    );
  });
});
