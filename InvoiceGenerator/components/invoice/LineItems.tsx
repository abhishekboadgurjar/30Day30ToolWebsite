"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

export default function LineItems() {
  const { invoice, updateItem, removeItem } = useInvoice();
  const { items, metadata } = invoice;
  
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No items added yet. Click "Add Item" above to begin.
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="hidden md:grid md:grid-cols-12 gap-4 mb-2 text-sm font-medium text-muted-foreground">
        <div className="col-span-5">Description</div>
        <div className="col-span-2 text-right">Unit Price</div>
        <div className="col-span-2 text-right">Quantity</div>
        <div className="col-span-2 text-right">Total</div>
        <div className="col-span-1"></div>
      </div>
      
      {items.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg">
          <div className="col-span-1 md:hidden flex justify-between items-center mb-2">
            <Label>Item #{index + 1}</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="md:col-span-5 space-y-2">
            <Label className="md:hidden">Description</Label>
            <Input
              placeholder="Item description"
              value={item.description}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="md:hidden">Unit Price</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={item.unitPrice}
              onChange={(e) => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
              className="w-full text-right"
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="md:hidden">Quantity</Label>
            <Input
              type="number"
              placeholder="1"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value, 10) || 0 })}
              className="w-full text-right"
              min="1"
              step="1"
            />
          </div>
          
          <div className="md:col-span-2 flex flex-col justify-center">
            <Label className="md:hidden mb-2">Total</Label>
            <div className="text-right font-medium">
              {formatCurrency(item.unitPrice * item.quantity, metadata.currency)}
            </div>
          </div>
          
          <div className="hidden md:col-span-1 md:flex items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      <div className="flex flex-col items-end space-y-2 pt-4 border-t">
        <div className="flex justify-between w-full md:w-1/3 text-sm">
          <span className="font-medium">Subtotal:</span>
          <span>{formatCurrency(invoice.totals.subtotal, metadata.currency)}</span>
        </div>
        <div className="flex justify-between w-full md:w-1/3 text-lg font-bold">
          <span>Total:</span>
          <span>{formatCurrency(invoice.totals.total, metadata.currency)}</span>
        </div>
      </div>
    </div>
  );
}