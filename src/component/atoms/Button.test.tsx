import { render, screen, fireEvent } from '@testing-library/react';
import { CompleteButton } from './Button';

describe('CompleteButton', () => {
  it('renders correctly', () => {
    render(<CompleteButton />);
    expect(screen.getByText('完了')).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<CompleteButton onClick={handleClick} />);
    fireEvent.click(screen.getByText('完了'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});