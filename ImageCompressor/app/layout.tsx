import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://imagecompressor.boad.tech'),
  title: 'ImageCompressor - Smart Image Size Reducer | Boad Technologies',
  description: 'Reduce image file size without losing quality. Free online image compression tool by Boad Technologies. Fast, simple, secure.',
  keywords: 'image compressor, compress images online, reduce image size, compress jpg, compress png, free image compressor tool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imagecompressor.boad.tech',
    title: 'ImageCompressor - Smart Image Size Reducer | Boad Technologies',
    description: 'Reduce image file size without losing quality. Free online image compression tool by Boad Technologies.',
    siteName: 'ImageCompressor',
    images: [
      {
        url: 'https://boadtechnologies.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ImageCompressor by Boad Technologies'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageCompressor - Smart Image Size Reducer',
    description: 'Reduce image file size without losing quality. Free online image compression tool.',
    images: ['https://boadtechnologies.com/og-image.jpg']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Toaster position="bottom-right" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}