import { render, screen, within } from '@testing-library/react';
import App from './App.jsx';

test('renders navigation links', () => {
  render(<App />);

  // App is a portfolio, so assert stable top-level nav items instead of CRA placeholder text.
  const nav = screen.getByRole('navigation');
  const navQueries = within(nav);

  expect(navQueries.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(navQueries.getByRole('link', { name: /about/i })).toBeInTheDocument();
  expect(navQueries.getByRole('link', { name: /skills/i })).toBeInTheDocument();
  expect(navQueries.getByRole('link', { name: /projects/i })).toBeInTheDocument();
  expect(navQueries.getByRole('link', { name: /contact/i })).toBeInTheDocument();
});
