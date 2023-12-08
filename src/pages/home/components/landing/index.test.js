import { fireEvent, render, screen } from '@testing-library/react';
import Landing from '.';

describe('Test Landing Component', () => {
    test('should click button properly', () => {
        const mockFn = jest.fn();
        render(<Landing turnOnWebcamApp={mockFn} />);
        const button = screen.getByText(/Take a Selfie/i);

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
