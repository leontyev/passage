// src/test/setup.ts

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/vitest';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
