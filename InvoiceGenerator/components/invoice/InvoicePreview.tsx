"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export default function InvoicePreview() {
  const { invoice } = useInvoice();
  const { client, company, metadata, items, totals } = invoice;
  
  return (
    <Card id="invoice-preview" className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 bg-primary text-primary-foreground">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">INVOICE</h2>
              <p className="text-primary-foreground/80 font-medium">{metadata.invoiceNumber}</p>
            </div>
            
            {company.logo && (
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-md p-2 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">From</h3>
              <p className="font-semibold text-lg">{company.name || "Your Company"}</p>
              {company.address && (
                <p className="whitespace-pre-line text-sm">{company.address}</p>
              )}
              {(company.email || company.phone || company.website) && (
                <div className="mt-2 text-sm space-y-1">
                  {company.email && <p>{company.email}</p>}
                  {company.phone && <p>{company.phone}</p>}
                  {company.website && <p>{company.website}</p>}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Bill To</h3>
              <p className="font-semibold text-lg">{client.name || "Client Name"}</p>
              {client.address && (
                <p className="whitespace-pre-line text-sm">{client.address}</p>
              )}
              {(client.email || client.phone) && (
                <div className="mt-2 text-sm space-y-1">
                  {client.email && <p>{client.email}</p>}
                  {client.phone && <p>{client.phone}</p>}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Invoice Number</h3>
              <p>{metadata.invoiceNumber || "INV-001"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Issue Date</h3>
              <p>{metadata.issueDate ? formatDate(metadata.issueDate) : "DD/MM/YYYY"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
              <p>{metadata.dueDate ? formatDate(metadata.dueDate) : "DD/MM/YYYY"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Currency</h3>
              <p>{metadata.currency || "USD"}</p>
            </div>
          </div>
          
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Description</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.description || "Item description"}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unitPrice, metadata.currency)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unitPrice * item.quantity, metadata.currency)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                      No items added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end">
            <div className="w-full md:w-1/3 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(totals.subtotal, metadata.currency)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(totals.total, metadata.currency)}</span>
              </div>
            </div>
          </div>
          
          {metadata.notes && (
            <div className="border-t pt-4 mt-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm whitespace-pre-line">{metadata.notes}</p>
            </div>
          )}
        </div>
        
        <div className="border-t p-6 text-center text-sm text-muted-foreground">
          Thank you for your business!
        </div>
      </CardContent>
    </Card>
  );
}