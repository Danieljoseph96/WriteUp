import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the WriteUp blog hero', () => {
  render(<App />);
  expect(screen.getByText(/notes, experiments, and engineering write-ups/i)).toBeInTheDocument();
});
