import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Financial Planner on initial load', () => {
  render(<App />);
  const headingElement = screen.getByText(/Financial Planner/i);
  expect(headingElement).toBeInTheDocument();
});