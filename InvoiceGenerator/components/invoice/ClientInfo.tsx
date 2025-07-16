"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInvoice } from "@/hooks/useInvoice";

export default function ClientInfo() {
  const { invoice, updateClient } = useInvoice();
  const { client } = invoice;
  
  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="client-name">Client Name <span className="text-destructive">*</span></Label>
        <Input
          id="client-name"
          value={client.name}
          onChange={(e) => updateClient({ name: e.target.value })}
          placeholder="Enter client name"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="client-email">Client Email</Label>
        <Input
          id="client-email"
          type="email"
          value={client.email}
          onChange={(e) => updateClient({ email: e.target.value })}
          placeholder="Enter client email"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="client-address">Client Address</Label>
        <Textarea
          id="client-address"
          value={client.address}
          onChange={(e) => updateClient({ address: e.target.value })}
          placeholder="Enter client address"
          rows={3}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="client-phone">Client Phone</Label>
        <Input
          id="client-phone"
          value={client.phone}
          onChange={(e) => updateClient({ phone: e.target.value })}
          placeholder="Enter client phone"
        />
      </div>
    </div>
  );
}