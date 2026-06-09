import { setupWorker } from 'msw/browser';
import { handlers } from './handler';

// فقط در browser اجرا شود
export const worker = setupWorker(...handlers);

// تابع start جدا برای کنترل بهتر
export const startMSW = async () => {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV !== 'development') return;

  await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass', // جلوگیری از error برای routeهای ناشناخته
  });

  console.log('[MSW] Worker started');
};