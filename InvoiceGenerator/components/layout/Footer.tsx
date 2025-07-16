import Link from 'next/link';
import { FileInput as FileInvoice } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileInvoice className="h-6 w-6 text-primary" />
              <a >
                Invoice Generator
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by BOAD Technologies
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              BOAD Technologies builds practical tools and web solutions that empower freelancers and businesses worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary/80 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-sm hover:text-primary/80 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-sm hover:text-primary/80 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="text-sm hover:text-primary/80 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
        <p className="text-sm text-muted-foreground">
  &copy; {new Date().getFullYear()}{' '}
  <a
    href="https://www.boadtechnologies.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline"
  >
    BOAD Technologies
  </a>. All rights reserved.
</p>

        </div>
      </div>
    </footer>
  );
}