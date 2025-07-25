import { renderForTest } from './test-utils';
import { screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as useAnalyticsData from '../hooks/useAnalyticsData';
import { type LocationAnalytics } from '../mocks/handlers'; // Import the type

describe('Compare Page in Production', () => {
  it('should display data from a mocked REAL endpoint', async () => {
    // 1. ARRANGE: We spy on the hook and provide a full, valid mock.
    const mockProductionData: LocationAnalytics[] = [
      {
        locationId: 'annecy',
        locationName: 'Real Data Annecy',
        monthlyTemperature: [1, 2, 3],
        monthlySunnyDays: [10, 11, 12],
        costOfLivingIndex: 100,
        internetSpeedMbs: 1000,
      },
    ];

    vi.spyOn(useAnalyticsData, 'useAnalyticsData').mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockProductionData,
    } as any);

    // 2. ACT: Render the component
    renderForTest('/compare');

    // 3. ASSERT: Now we use scoped queries for precision.

    // First, let's find the legend by its test ID.
    const legend = await screen.findByTestId('location-legend');

    // Now, we assert that the text exists *only within the legend*.
    const { getByText: getByTextInLegend } = within(legend);
    expect(getByTextInLegend('Real Data Annecy')).toBeInTheDocument();

    // Let's do the same for one of the other cards to be sure.
    // Find the parent card by its heading.
    const costCard = screen
      .getByRole('heading', { name: /Cost of Living/i })
      .closest('div');

    // Now search within that card.
    const { getByText: getByTextInCostCard } = within(costCard!);
    expect(getByTextInCostCard('Real Data Annecy')).toBeInTheDocument();
    expect(getByTextInCostCard('100')).toBeInTheDocument();
  });
});
