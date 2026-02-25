import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CoursesDashboard from '../CoursesDashboard';
import '@testing-library/jest-dom';

// Mock alert
window.alert = vi.fn();

describe('CoursesDashboard', () => {
  it('renders correctly with default active tab', () => {
    render(<CoursesDashboard />);
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toHaveClass('active');
  });

  it('changes active tab when clicked', () => {
    render(<CoursesDashboard />);
    const completedTab = screen.getByText('Completed');
    fireEvent.click(completedTab);
    expect(completedTab).toHaveClass('active');
    expect(screen.getByText('In progress')).not.toHaveClass('active');
  });

  it('filters courses based on tab', () => {
    render(<CoursesDashboard />);
    // Default is "In progress"
    expect(screen.getByText('Cloud Computing')).toBeInTheDocument();
    expect(screen.queryByText('Marketing Strategy')).not.toBeInTheDocument();

    const completedTab = screen.getByText('Completed');
    fireEvent.click(completedTab);
    expect(screen.queryByText('Cloud Computing')).not.toBeInTheDocument();
    expect(screen.getByText('Marketing Strategy')).toBeInTheDocument();
  });
});
