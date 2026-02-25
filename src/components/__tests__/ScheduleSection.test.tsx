import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ScheduleSection from '../ScheduleSection';
import '@testing-library/jest-dom';

// Mock alert
window.alert = vi.fn();

describe('ScheduleSection', () => {
  it('renders the schedule grid', () => {
    render(<ScheduleSection />);
    expect(screen.getByText('Current week schedule')).toBeInTheDocument();
  });

  it('shows instructor card when clicking an event cell', () => {
    const { container } = render(<ScheduleSection />);

    // Find a cell with an event (e.g. Tuesday at 14:00)
    // Sarah Johnson is there.
    const eventCells = container.querySelectorAll('.schedule-cell.has-event');
    expect(eventCells.length).toBeGreaterThan(0);

    fireEvent.click(eventCells[0]);

    // Check if instructor card is visible
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText(/Contact Sarah/i)).toBeInTheDocument();
  });

  it('closes instructor card when clicking overlay', () => {
    const { container } = render(<ScheduleSection />);
    const eventCells = container.querySelectorAll('.schedule-cell.has-event');

    fireEvent.click(eventCells[0]);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();

    const overlay = container.querySelector('.schedule-overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);

    expect(screen.queryByText('Sarah Johnson')).not.toBeInTheDocument();
  });
});
