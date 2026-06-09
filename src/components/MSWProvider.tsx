// components/MSWProvider.tsx
'use client';

import { useEffect, useState } from 'react';

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (process.env.NODE_ENV === 'development') {
        try {
          const { worker } = await import('../../mocks/browser');
          await worker.start({
            onUnhandledRequest: 'bypass', // درخواست‌های بدون هندلر را نادیده بگیر
            // یا می‌توانید از 'warn' استفاده کنید تا در کنسول اخطار دهد
          });
          setIsReady(true);
        } catch (error) {
          setIsReady(true); // حتی اگر MSW شروع نشد، برنامه را اجرا کن
        }
      } else {
        setIsReady(true); // در محیط production بدون MSW اجرا کن
      }
    };

    initMSW();
  }, []);

  if (!isReady) {
    // می‌توانید یک لودینگ نمایش دهید
    return null;
  }

  return <>{children}</>;
}