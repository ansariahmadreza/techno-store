import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MSWProvider from '@/components/MSWProvider';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <MSWProvider>
          {children}
        </MSWProvider>
      </body>
    </html>
  );
} 