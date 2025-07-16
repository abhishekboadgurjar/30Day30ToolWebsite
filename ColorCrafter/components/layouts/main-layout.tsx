import { ReactNode } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}