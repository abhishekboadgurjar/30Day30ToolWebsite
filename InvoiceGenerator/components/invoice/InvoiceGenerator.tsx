"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";
import { useInvoice } from "@/hooks/useInvoice";
import { generatePdf } from "@/lib/generatePdf";

export default function InvoiceGenerator() {
  const { toast } = useToast();
  const { invoice, isValid } = useInvoice();
  const [activeTab, setActiveTab] = useState("form");
  
  const handleExport = async () => {
    if (!isValid) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields before exporting.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await generatePdf(invoice);
      toast({
        title: "Success!",
        description: "Your invoice has been exported as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was a problem exporting your invoice.",
        variant: "destructive",
      });
    }
  };

  const handleSwitchToPreview = () => {
    if (!isValid) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields before previewing.",
        variant: "destructive",
      });
      return;
    }
    setActiveTab("preview");
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Invoice Generator</h1>
        <p className="text-muted-foreground mt-2">
          Create, preview, and export professional invoices with ease
        </p>
      </div>

      <div className="hidden md:flex md:flex-row md:gap-8 md:h-full">
        <div className="w-1/2 overflow-y-auto pr-4">
          <InvoiceForm />
        </div>
        <div className="w-1/2 overflow-y-auto pl-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Preview</h2>
            <Button onClick={handleExport}>Export PDF</Button>
          </div>
          <InvoicePreview />
        </div>
      </div>

      <div className="md:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="mt-0">
            <InvoiceForm />
            <div className="flex justify-end mt-6">
              <Button onClick={handleSwitchToPreview}>Preview Invoice</Button>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="mt-0">
            <InvoicePreview />
            <div className="flex justify-end mt-6">
              <Button onClick={handleExport}>Export PDF</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}