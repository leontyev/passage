// src/test/LocationDetail.test.tsx

import { renderForTest } from './test-utils';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Location Detail Page', () => {
  it('should fetch and display data for Annecy from MSW', async () => {
    renderForTest('/locations/annecy');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /annecy/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/A beautiful town/i)).toBeInTheDocument();
  });
});
