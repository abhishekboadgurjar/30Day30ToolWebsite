export type Client = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

export type Company = {
  name: string;
  address: string;
  logo: string | null;
  phone: string;
  email: string;
  website: string;
};

export type Metadata = {
  invoiceNumber: string;
  issueDate: Date | null;
  dueDate: Date | null;
  currency: string;
  notes: string;
};

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  client: Client;
  company: Company;
  metadata: Metadata;
  items: LineItem[];
  totals: {
    subtotal: number;
    total: number;
  };
};
