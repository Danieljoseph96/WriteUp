import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the dark landing page', () => {
  render(<App />);
  expect(screen.getByText(/shape a focused, cinematic page/i)).toBeInTheDocument();
});
