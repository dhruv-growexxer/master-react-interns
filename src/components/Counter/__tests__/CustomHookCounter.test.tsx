import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../CustomHookCounter';
import '@testing-library/jest-dom';

describe('Counter Custom hook', () => {
  test('renders initial count', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('increments count when increment button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('Count: 6')).toBeInTheDocument();
  });

  it('decrements count when decrement button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Decrement'));
    expect(screen.getByText('Count: 4')).toBeInTheDocument();
  });

  it('resets count when reset button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });
});
