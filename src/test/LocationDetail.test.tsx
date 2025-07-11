import { renderForTest } from './test-utils';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Location Detail Page', () => {
  it('should fetch and display data for Annecy from MSW', async () => {
    renderForTest('/locations/annecy'); // <-- Render the detail page route

    // We no longer need to check for the loading state first,
    // waitFor will handle it.
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /annecy/i })
      ).toBeInTheDocument();
    });

    // A better way to find text that might be in different elements
    expect(screen.getByText(/A beautiful town/i)).toBeInTheDocument();
  });
});
