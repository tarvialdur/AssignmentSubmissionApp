import { render, screen } from 'react-router-dom';
import App from './App.js';

test('renders learn react link', () => {
  render (<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
