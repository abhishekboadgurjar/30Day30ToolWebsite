import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Profile Viewer – Explore GitHub Stats by Username',
  description: 'A powerful GitHub profile viewer to explore public user data, repositories, and contributions using the GitHub API.',
  keywords: 'GitHub profile viewer, GitHub stats, GitHub username search, GitHub repositories viewer, GitHub API tools, developer tools, open source',
  authors: [{ name: 'BOAD Technologies' }],
  creator: 'BOAD Technologies',
  publisher: 'BOAD Technologies',
  robots: 'index, follow',
  openGraph: {
    title: 'GitHub Profile Viewer – Explore GitHub Stats by Username',
    description: 'A powerful GitHub profile viewer to explore public user data, repositories, and contributions using the GitHub API.',
    type: 'website',
    url: 'https://github-profile-viewer.vercel.app',
    siteName: 'GitHub Profile Viewer',
    images: [
      {
        url: 'https://github-profile-viewer.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitHub Profile Viewer Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Profile Viewer – Explore GitHub Stats by Username',
    description: 'A powerful GitHub profile viewer to explore public user data, repositories, and contributions using the GitHub API.',
    images: ['https://github-profile-viewer.vercel.app/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0969da' },
    { media: '(prefers-color-scheme: dark)', color: '#58a6ff' },
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
        <meta name="msapplication-TileColor" content="#0969da" />
        <meta name="theme-color" content="#0969da" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}