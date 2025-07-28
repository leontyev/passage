// src/test/Dashboard.test.tsx

import { renderForTest } from './test-utils';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Dashboard Page', () => {
  it('should render the Annecy location card', async () => {
    renderForTest('/');

    await waitFor(() => {
      expect(screen.getByText('Annecy')).toBeInTheDocument();
    });

    expect(screen.getByText('Trento')).toBeInTheDocument();
  });
});
