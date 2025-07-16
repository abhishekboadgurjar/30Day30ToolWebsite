import InvoiceGenerator from '@/components/invoice/InvoiceGenerator';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <InvoiceGenerator />
    </main>
  );
}