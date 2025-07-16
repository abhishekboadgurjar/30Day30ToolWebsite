"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInvoice } from "@/hooks/useInvoice";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function InvoiceMetadata() {
  const { invoice, updateMetadata } = useInvoice();
  const { metadata } = invoice;
  
  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="invoice-number">Invoice Number <span className="text-destructive">*</span></Label>
        <Input
          id="invoice-number"
          value={metadata.invoiceNumber}
          onChange={(e) => updateMetadata({ invoiceNumber: e.target.value })}
          placeholder="INV-001"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="issue-date">Issue Date <span className="text-destructive">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !metadata.issueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {metadata.issueDate ? (
                  format(metadata.issueDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={metadata.issueDate || undefined}
                onSelect={(date) => updateMetadata({ issueDate: date || null })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="due-date">Due Date <span className="text-destructive">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !metadata.dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {metadata.dueDate ? (
                  format(metadata.dueDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={metadata.dueDate || undefined}
                onSelect={(date) => updateMetadata({ dueDate: date || null })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="currency">Currency</Label>
        <Input
          id="currency"
          value={metadata.currency}
          onChange={(e) => updateMetadata({ currency: e.target.value })}
          placeholder="USD"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={metadata.notes}
          onChange={(e) => updateMetadata({ notes: e.target.value })}
          placeholder="Payment terms, bank details, or other notes for the client"
          rows={3}
        />
      </div>
    </div>
  );
}