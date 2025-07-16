"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, FileText, Download, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdvancedOptions } from "./components/advanced-options";
import { FilePreview } from "./components/file-preview";
import { MergeStats } from "./components/merge-stats";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PDFFile {
  file: File;
  id: string;
  name: string;
  size: string;
}

interface MergeOptions {
  addBookmarks: boolean;
  preserveMetadata: boolean;
  optimizeSize: boolean;
  pageRanges: Record<string, string>;
}

export default function PDFMerger() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [mergeOptions, setMergeOptions] = useState({
    addBookmarks: true,
    preserveMetadata: true,
    optimizeSize: false,
    pageRanges: {} as Record<string, string>,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: PDFFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type === "application/pdf") {
        newFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: formatFileSize(file.size),
        });
      }
    });

    setPdfFiles((prev) => [...prev, ...newFiles]);
    setError(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (id: string) => {
    setPdfFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const moveFile = (id: string, direction: "up" | "down") => {
    setPdfFiles((prev) => {
      const index = prev.findIndex((file) => file.id === id);
      if (index === -1) return prev;

      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newFiles = [...prev];
      const [movedFile] = newFiles.splice(index, 1);
      newFiles.splice(newIndex, 0, movedFile);
      return newFiles;
    });
  };

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      setError("Please select at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < pdfFiles.length; i++) {
        const pdfFile = pdfFiles[i];
        setProgress((i / pdfFiles.length) * 90);

        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      setProgress(95);
      const pdfBytes = await mergedPdf.save();
      setProgress(100);

      // Create download link
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged-document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        "Failed to merge PDFs. Please ensure all files are valid PDF documents."
      );
      console.error("PDF merge error:", err);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PDF Merger Pro
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              by boad technologies
            </p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional PDF merging tool with advanced features. Merge, organize,
          and customize your PDFs with enterprise-grade security - all processed
          locally in your browser.
        </p>
      </div>

      {/* File Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Select PDF Files
          </CardTitle>
          <CardDescription>
            Choose multiple PDF files to merge. You can drag and drop files or
            click to browse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop PDF files here</p>
              <p className="text-sm text-muted-foreground">or</p>
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Files */}
      {pdfFiles.length > 0 && (
        <>
          <FilePreview
            files={pdfFiles}
            onRemove={removeFile}
            onMove={moveFile}
            showPreview={previewMode}
            onTogglePreview={() => setPreviewMode(!previewMode)}
          />

          <MergeStats
            fileCount={pdfFiles.length}
            totalSize={pdfFiles.reduce((sum, file) => sum + file.file.size, 0)}
            estimatedTime={Math.ceil(pdfFiles.length * 0.5)}
          />
        </>
      )}

      {/* Advanced Options */}
      {pdfFiles.length > 0 && (
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-transparent"
            >
              Advanced Options
              {showAdvanced ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <AdvancedOptions
              options={mergeOptions}
              onOptionsChange={setMergeOptions}
              files={pdfFiles}
            />
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Processing Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Merging PDFs...</span>
                <span className="text-sm text-muted-foreground">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Merge Button */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={mergePDFs}
          disabled={pdfFiles.length < 2 || isProcessing}
          size="lg"
          className="min-w-[250px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Processing {pdfFiles.length} files...
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Merge {pdfFiles.length} PDFs
            </>
          )}
        </Button>

        {pdfFiles.length > 0 && !isProcessing && (
          <p className="text-sm text-muted-foreground text-center">
            Ready to merge {pdfFiles.length} files • Estimated time: ~
            {Math.ceil(pdfFiles.length * 0.5)} seconds
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t pt-8 mt-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Privacy Notice */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-green-800 mb-2">
                    🔒 Privacy Protected
                  </p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    All PDF processing happens locally in your browser using
                    advanced WebAssembly technology. Your files never leave your
                    device, ensuring complete privacy and security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About boad technologies */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">B</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-800 mb-2">
                    boad technologies
                  </p>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Professional document processing tools built with
                    cutting-edge web technologies. Trusted by thousands of users
                    worldwide for secure, efficient PDF management.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            © 2025 boad technologies. Built with ❤️ for document productivity.
          </p>
        </div>
      </div>
    </div>
  );
}
