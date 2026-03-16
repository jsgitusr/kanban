import { render, screen } from '@testing-library/react';
import { Board } from '@/components/Board';

describe('Board page', () => {
  it('renders initial columns and cards', () => {
    render(<Board />);

    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('Define MVP scope')).toBeInTheDocument();
  });
  
  it('renders exactly five columns', () => {
    render(<Board />);
    const columns = screen.getAllByTestId('kanban-column');
    expect(columns).toHaveLength(5);
  });
});

