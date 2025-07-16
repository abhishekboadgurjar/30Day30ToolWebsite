import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Network Speed Tester - Free Internet Speed Test Tool | BOAD Technologies',
  description: 'Test your internet connection speed with our free, accurate network speed tester. Check download and upload speeds, ping, and network performance in real-time.',
  keywords: 'speed test, internet speed test, network speed, bandwidth test, download speed, upload speed, ping test, connection test, network performance',
  authors: [{ name: 'BOAD Technologies' }],
  creator: 'BOAD Technologies',
  publisher: 'BOAD Technologies',
  robots: 'index, follow',
  openGraph: {
    title: 'Network Speed Tester - Free Internet Speed Test Tool',
    description: 'Test your internet connection speed with our free, accurate network speed tester. Check download and upload speeds, ping, and network performance in real-time.',
    url: 'https://network-speed-tester.vercel.app',
    siteName: 'Network Speed Tester',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Network Speed Tester Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Network Speed Tester - Free Internet Speed Test Tool',
    description: 'Test your internet connection speed with our free, accurate network speed tester.',
    images: ['/og-image.png'],
    creator: '@boadtech',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
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
        <link rel="canonical" href="https://network-speed-tester.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Network Speed Tester",
              "description": "Test your internet connection speed with our free, accurate network speed tester. Check download and upload speeds, ping, and network performance in real-time.",
              "url": "https://network-speed-tester.vercel.app",
              "applicationCategory": "Utility",
              "operatingSystem": "Any",
              "permissions": "browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "BOAD Technologies"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}