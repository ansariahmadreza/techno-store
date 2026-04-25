import type { Metadata } from 'next';
import './globals.css';
import MSWProvider from '@/components/MSWProvider';



export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your app description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <MSWProvider>
          {children}
        </MSWProvider>
      </body>
    </html>
  );
} 