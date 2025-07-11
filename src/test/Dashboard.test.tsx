import { renderForTest } from './test-utils';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Dashboard Page', () => {
  it('should render the Annecy location card', async () => {
    // <-- Add async here
    renderForTest('/');

    // Use waitFor to give the router a moment to render
    await waitFor(() => {
      expect(screen.getByText('Annecy')).toBeInTheDocument();
    });

    // We can also assert the second card is there
    expect(screen.getByText('Trento')).toBeInTheDocument();
  });
});
