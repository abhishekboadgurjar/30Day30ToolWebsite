"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import ClientInfo from "./ClientInfo";
import CompanyInfo from "./CompanyInfo";
import InvoiceMetadata from "./InvoiceMetadata";
import LineItems from "./LineItems";
import { useInvoice } from "@/hooks/useInvoice";

export default function InvoiceForm() {
  const { addItem, removeItem } = useInvoice();

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <CompanyInfo />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Client Information</h3>
          <ClientInfo />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
          <InvoiceMetadata />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Line Items</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addItem()}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </div>
          <Separator className="mb-4" />
          <LineItems />
        </CardContent>
      </Card>
    </div>
  );
}