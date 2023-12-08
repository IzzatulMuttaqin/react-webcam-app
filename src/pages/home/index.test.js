import { render, screen } from '@testing-library/react';
import Home from '.';

describe('Test Home Page', () => {
  test('render page properly', () => {
    render(<Home />);
    expect(screen.getByText(/Take a Selfie/i)).toBeInTheDocument();
  });
});
