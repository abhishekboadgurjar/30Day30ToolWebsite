import Link from 'next/link';
import { FileInput as FileInvoice } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <FileInvoice className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Invoice Generator <span className="font-small">by</span> BOAD Technologies</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className="text-sm font-medium hover:text-primary/80 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="#about" 
                className="text-sm font-medium hover:text-primary/80 transition-colors"
              >
                About
              </Link>
            </div>
            <a
              href="https://www.boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Visit BOAD
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}