'use client';
import { useEffect, useState } from 'react';

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // فقط در development اجرا شود
    if (process.env.NODE_ENV !== 'development') {
      setReady(true);
      return;
    }

    let mounted = true;

    const init = async () => {
      try {
        const { worker } = await import('../../mocks/browser');

        await worker.start({
          onUnhandledRequest: 'bypass',
        });

        if (mounted) {
          console.log('[MSW] started');
          setReady(true);
        }
      } catch (err) {
        console.warn('[MSW] failed to start:', err);
        if (mounted) setReady(true);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return null; // یا loading spinner
  }

  return <>{children}</>;
}