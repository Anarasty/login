import App from './App';
import { render, fireEvent } from '@testing-library/react';
import Book from './components/Book';

describe('Book component', () => {
  test('Book increment', () => {
    const { getByTestId } = render(<Book />);
    const quantityInput = getByTestId('quantity-input');

    fireEvent.change(quantityInput, { target: { value: '10' } });
    expect(quantityInput.value).toBe('10');
  });

  test('Book dicrement', () => {
    const { getByTestId } = render(<Book />);
    const quantityInput = getByTestId('quantity-input');

    fireEvent.change(quantityInput, { target: { value: '2' } });
    expect(quantityInput.value).toBe('2');
  });

  test('Book total', () => {
    const { getByTestId } = render(<Book />);
    const quantityInput = getByTestId('quantity-input');
    const priceInput = getByTestId('price-input');
    const totalCost = getByTestId('total-cost');

    fireEvent.change(priceInput, { target: { value: '10' } });
    fireEvent.change(quantityInput, { target: { value: '2' } });
    expect(totalCost.textContent).toBe('20');
  });
});