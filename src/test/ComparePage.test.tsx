// src/test/ComparePage.test.tsx

import { screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderForTest } from './test-utils';
import { type DataSet } from '../components/MultiLineChart';

vi.mock('../components/MultiLineChart', () => ({
  MultiLineChart: ({ datasets }: { datasets: DataSet[] }) => (
    <div
      data-testid="mock-chart"
      aria-label={datasets.map((d) => d.label).join(', ')}
    >
      <pre>{JSON.stringify(datasets.map((d) => d.data))}</pre>
    </div>
  ),
}));

describe('Compare Page', () => {
  it('should render the main heading and the location legend', async () => {
    renderForTest('/compare');

    const heading = await screen.findByRole('heading', {
      name: /location comparison/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();

    // 1. Find the legend's container first.
    const legend = await screen.findByTestId('location-legend');

    // 2. Now, search for the names *only within* the legend container.
    const { getByText: getByTextInLegend } = within(legend);
    expect(getByTextInLegend('Annecy')).toBeInTheDocument();
    expect(getByTextInLegend('Trento')).toBeInTheDocument();
    expect(getByTextInLegend('Lucerne')).toBeInTheDocument();
  });

  it('should display the correct data for Cost of Living and Internet Speed', async () => {
    renderForTest('/compare');
    await screen.findByText('115.2');

    const costCard = screen
      .getByRole('heading', { name: /Cost of Living/i })
      .closest('div');
    const { getByText: getByTextInCost } = within(costCard!);
    expect(getByTextInCost('85.4')).toBeInTheDocument();
    expect(getByTextInCost('78.9')).toBeInTheDocument();
    expect(getByTextInCost('115.2')).toBeInTheDocument();

    const speedCard = screen
      .getByRole('heading', { name: /Internet Speed/i })
      .closest('div');
    const { getByText: getByTextInSpeed } = within(speedCard!);
    expect(getByTextInSpeed('750')).toBeInTheDocument();
    expect(getByTextInSpeed('680')).toBeInTheDocument();
    expect(getByTextInSpeed('810')).toBeInTheDocument();
  });

  it('should pass the correct datasets to the line charts', async () => {
    renderForTest('/compare');

    // 1. Find the unique parent card for each chart using its h2 title.
    const tempCard = (
      await screen.findByRole('heading', { name: /Avg. Monthly Temperature/i })
    ).closest('div');
    const sunnyCard = (
      await screen.findByRole('heading', { name: /Sunny Days \/ Month/i })
    ).closest('div');

    // 2. Find the mock chart *only within* the temperature card.
    const tempMockChart = within(tempCard!).getByTestId('mock-chart');
    const { getByText: getByTextInTemp } = within(tempMockChart);

    // 3. Now this assertion is unambiguous and will pass.
    expect(
      getByTextInTemp(
        /\[\[-1,1,5,9,14,18,20,19,15,10,4,0\],\[0,2,7,11,16,20,22,21,17,12,5,1\],\[-2,-1,3,7,12,16,18,17,13,8,2,-1\]\]/
      )
    ).toBeInTheDocument();

    // 4. Do the same for the sunny days chart.
    const sunnyMockChart = within(sunnyCard!).getByTestId('mock-chart');
    const { getByText: getByTextInSunny } = within(sunnyMockChart);
    expect(
      getByTextInSunny(
        /\[\[5,7,10,12,15,18,20,18,15,11,6,4\],\[6,8,11,13,16,19,22,20,16,12,7,5\],\[3,5,8,11,13,15,17,16,13,9,4,2\]\]/
      )
    ).toBeInTheDocument();
  });
});
