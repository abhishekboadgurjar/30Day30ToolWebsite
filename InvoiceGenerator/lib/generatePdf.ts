"use client";

import type { Invoice } from "@/types/invoice";

export const generatePdf = async (invoice: Invoice): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    console.log('Starting PDF generation...');
    
    // Dynamically import required libraries
    const [html2canvas, jsPDF] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);
    
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('PDF generation can only be done in the browser');
      }

      console.log('Looking for invoice preview element...');
      const invoiceElement = document.getElementById("invoice-preview");
      
      if (!invoiceElement) {
        throw new Error("Invoice preview element not found. Make sure the element with id='invoice-preview' exists in the DOM.");
      }
      
      console.log('Creating container for PDF generation...');
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '210mm';
      container.style.padding = '20mm';
      container.style.backgroundColor = 'white';
      
      // Clone the invoice element
      const clone = invoiceElement.cloneNode(true) as HTMLElement;
      clone.style.width = '100%';
      clone.style.height = 'auto';
      clone.style.margin = '0';
      clone.style.padding = '0';
      clone.style.boxSizing = 'border-box';
      
      container.appendChild(clone);
      document.body.appendChild(container);
      
      // Wait for any images to load
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Rendering to canvas...');
      const canvas = await html2canvas.default(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: container.scrollWidth,
        windowHeight: container.scrollHeight
      });
      
      console.log('Creating PDF...');
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate the PDF dimensions to maintain aspect ratio
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pdf = new jsPDF.default('p', 'mm', 'a4');
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      const filename = `${invoice.metadata.invoiceNumber.replace(/\s+/g, "_")}.pdf`;
      console.log('Saving PDF:', filename);
      
      pdf.save(filename);
      console.log('PDF generation completed');
      
      // Clean up
      document.body.removeChild(container);
      resolve();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
};