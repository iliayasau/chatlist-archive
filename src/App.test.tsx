import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Messaging text', () => {
  render(<App />);
  const linkElement = screen.getByText(/messaging/i);
  expect(linkElement).toBeInTheDocument();
});
