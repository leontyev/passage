import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
// The "export" keyword is crucial here!
export const worker = setupWorker(...handlers);
