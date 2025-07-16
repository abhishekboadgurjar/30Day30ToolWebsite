"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useInvoice } from "@/hooks/useInvoice";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

export default function CompanyInfo() {
  const { invoice, updateCompany } = useInvoice();
  const { company } = invoice;
  const [logoPreview, setLogoPreview] = useState<string | null>(company.logo || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 1MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setLogoPreview(result);
      updateCompany({ logo: result });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    updateCompany({ logo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="company-name">Company Name <span className="text-destructive">*</span></Label>
        <Input
          id="company-name"
          value={company.name}
          onChange={(e) => updateCompany({ name: e.target.value })}
          placeholder="Enter company name"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="company-address">Company Address</Label>
        <Textarea
          id="company-address"
          value={company.address}
          onChange={(e) => updateCompany({ address: e.target.value })}
          placeholder="Enter company address"
          rows={3}
        />
      </div>
      
      <div className="grid gap-2">
        <Label>Company Logo</Label>
        <div className="flex flex-col gap-4">
          {logoPreview && (
            <div className="relative w-40 h-40 border rounded-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={logoPreview} 
                alt="Company logo" 
                className="w-full h-full object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={removeLogo}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {!logoPreview && (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or SVG (MAX. 1MB)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="company-phone">Phone</Label>
        <Input
          id="company-phone"
          value={company.phone}
          onChange={(e) => updateCompany({ phone: e.target.value })}
          placeholder="Enter phone number"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="company-email">Email</Label>
        <Input
          id="company-email"
          type="email"
          value={company.email}
          onChange={(e) => updateCompany({ email: e.target.value })}
          placeholder="Enter email address"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="company-website">Website</Label>
        <Input
          id="company-website"
          value={company.website}
          onChange={(e) => updateCompany({ website: e.target.value })}
          placeholder="Enter website"
        />
      </div>
    </div>
  );
}