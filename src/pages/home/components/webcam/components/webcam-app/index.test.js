import { render, screen } from '@testing-library/react';
import WebcamApp from '.';

describe('Test WebcamApp', () => {
    test('render properly', () => {
        render(<WebcamApp />);

        const button = screen.getByText(/Capture photo/i);

        expect(button).toBeInTheDocument();
    });
});
