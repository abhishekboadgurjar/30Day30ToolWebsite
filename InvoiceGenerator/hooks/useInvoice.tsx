"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

import type { Client, Company, Metadata, LineItem, Invoice } from "@/types/invoice";

type InvoiceContextType = {
  invoice: Invoice;
  updateClient: (updates: Partial<Client>) => void;
  updateCompany: (updates: Partial<Company>) => void;
  updateMetadata: (updates: Partial<Metadata>) => void;
  addItem: () => void;
  updateItem: (id: string, updates: Partial<LineItem>) => void;
  removeItem: (id: string) => void;
  isValid: boolean;
  reset: () => void;
};

const defaultInvoice: Invoice = {
  client: {
    name: "",
    email: "",
    address: "",
    phone: "",
  },
  company: {
    name: "BOAD Technologies",
    address: "",
    logo: null,
    phone: "",
    email: "",
    website: "",
  },
  metadata: {
    invoiceNumber: "INV-" + new Date().toISOString().slice(0, 10).replace(/-/g, ""),
    issueDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    currency: "USD",
    notes: "",
  },
  items: [],
  totals: {
    subtotal: 0,
    total: 0,
  },
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<Invoice>(defaultInvoice);
  
  // Try to load from localStorage on initial load
  useEffect(() => {
    const savedInvoice = localStorage.getItem("invoice");
    if (savedInvoice) {
      try {
        const parsed = JSON.parse(savedInvoice);
        
        // Convert date strings back to Date objects
        if (parsed.metadata.issueDate) {
          parsed.metadata.issueDate = new Date(parsed.metadata.issueDate);
        }
        if (parsed.metadata.dueDate) {
          parsed.metadata.dueDate = new Date(parsed.metadata.dueDate);
        }
        
        setInvoice(parsed);
      } catch (error) {
        console.error("Failed to parse saved invoice:", error);
      }
    }
  }, []);
  
  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("invoice", JSON.stringify(invoice));
  }, [invoice]);
  
  // Recalculate totals when items change
  useEffect(() => {
    const subtotal = invoice.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    
    setInvoice((prev) => ({
      ...prev,
      totals: {
        subtotal,
        total: subtotal, // For now, total is same as subtotal (no taxes or discounts)
      },
    }));
  }, [invoice.items]);
  
  // Check if the invoice has all required fields filled
  const isValid = Boolean(
    invoice.client.name &&
    invoice.company.name &&
    invoice.metadata.invoiceNumber &&
    invoice.metadata.issueDate &&
    invoice.metadata.dueDate &&
    invoice.items.length > 0 &&
    invoice.items.every(item => 
      item.description && 
      item.quantity > 0 && 
      item.unitPrice >= 0
    )
  );
  
  const updateClient = (updates: Partial<Client>) => {
    setInvoice((prev) => ({
      ...prev,
      client: { ...prev.client, ...updates },
    }));
  };
  
  const updateCompany = (updates: Partial<Company>) => {
    setInvoice((prev) => ({
      ...prev,
      company: { ...prev.company, ...updates },
    }));
  };
  
  const updateMetadata = (updates: Partial<Metadata>) => {
    setInvoice((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...updates },
    }));
  };
  
  const addItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substring(2, 9),
      description: "",
      quantity: 1,
      unitPrice: 0,
    };
    
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };
  
  const updateItem = (id: string, updates: Partial<LineItem>) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => 
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };
  
  const removeItem = (id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };
  
  const reset = () => {
    setInvoice(defaultInvoice);
  };
  
  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        updateClient,
        updateCompany,
        updateMetadata,
        addItem,
        updateItem,
        removeItem,
        isValid,
        reset,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};