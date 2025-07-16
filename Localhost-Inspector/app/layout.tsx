import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LocalStorage Inspector – Manage Your Browser Storage Easily',
  description: 'A free web-based localStorage inspector to view, edit, and delete localStorage data with ease. Perfect for developers and web enthusiasts.',
  keywords: 'localStorage inspector, browser storage, localStorage viewer, web storage manager, JavaScript tools, developer tools, web development',
  authors: [{ name: 'BOAD Technologies' }],
  creator: 'BOAD Technologies',
  publisher: 'BOAD Technologies',
  robots: 'index, follow',
  openGraph: {
    title: 'LocalStorage Inspector – Manage Your Browser Storage Easily',
    description: 'A free web-based localStorage inspector to view, edit, and delete localStorage data with ease.',
    type: 'website',
    url: 'https://localstorage-inspector.vercel.app',
    siteName: 'LocalStorage Inspector',
    images: [
      {
        url: 'https://localstorage-inspector.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LocalStorage Inspector Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocalStorage Inspector – Manage Your Browser Storage Easily',
    description: 'A free web-based localStorage inspector to view, edit, and delete localStorage data with ease.',
    images: ['https://localstorage-inspector.vercel.app/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}