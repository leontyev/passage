// src/test/test-utils.tsx

import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';

export function renderForTest(
  route: string = '/',
  options: Omit<RenderOptions, 'wrapper'> = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    history: createMemoryHistory({
      initialEntries: [route],
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Wrapper = ({ children: _children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  return render(<div />, { wrapper: Wrapper, ...options });
}
