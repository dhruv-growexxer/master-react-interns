import { render, screen, fireEvent } from '@testing-library/react';
import CounterReducer from '../CounterReducer';
import { ThemeProvider } from '../../../contexts';
import React from 'react';
import '@testing-library/jest-dom';

describe('CounterReducer Component', () => {
  const renderWithContext = (component: React.ReactNode) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('renders initial counter value', () => {
    renderWithContext(<CounterReducer />);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  it('increments counter when increment button is clicked', () => {
    renderWithContext(<CounterReducer />);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
  });

  it('decrements counter when decrement button is clicked', () => {
    renderWithContext(<CounterReducer />);
    fireEvent.click(screen.getByText('Decrement'));
    expect(screen.getByText('Counter: -1')).toBeInTheDocument();
  });

  it('resets counter when reset button is clicked', () => {
    renderWithContext(<CounterReducer />);
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  it('handles multiple operations correctly', () => {
    renderWithContext(<CounterReducer />);
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Decrement'));
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
  });
});
