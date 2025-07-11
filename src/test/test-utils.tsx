import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';

// This is our new, more robust test utility
export function renderForTest(
  // Optional route to start on. Defaults to the homepage.
  route: string = '/',
  // Standard render options from Testing Library
  options: Omit<RenderOptions, 'wrapper'> = {}
) {
  // Create a fresh QueryClient for every test to prevent cache leakage
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // crucial for tests: turn off retries
        retry: false,
      },
    },
  });

  // Create a fresh router instance for every test
  const router = createRouter({
    routeTree,
    // Provide the query client to the router's context
    context: {
      queryClient,
    },
    // Use an in-memory history that starts at our desired route
    history: createMemoryHistory({
      initialEntries: [route],
    }),
  });

  // The wrapper that provides all the necessary context
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  // We don't need to pass a UI, the RouterProvider handles it all.
  return render(<div />, { wrapper: Wrapper, ...options });
}
