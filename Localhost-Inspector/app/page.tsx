'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Copy, Download, Upload, Moon, Sun, Database, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Head from 'next/head';

interface StorageItem {
  key: string;
  value: string;
  size: number;
}

export default function LocalStorageInspector() {
  const [storageItems, setStorageItems] = useState<StorageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingItem, setEditingItem] = useState<StorageItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const { toast } = useToast();

  // Load localStorage data
  const loadStorageData = () => {
    const items: StorageItem[] = [];
    let size = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key) || '';
        const itemSize = new Blob([key + value]).size;
        items.push({ key, value, size: itemSize });
        size += itemSize;
      }
    }
    
    setStorageItems(items);
    setTotalSize(size);
  };

  // Initialize and set up theme
  useEffect(() => {
    loadStorageData();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Filter items based on search term
  const filteredItems = storageItems.filter(item => 
    item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new item
  const addItem = () => {
    if (!newKey.trim()) {
      toast({
        title: "Error",
        description: "Key cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (localStorage.getItem(newKey)) {
      toast({
        title: "Error",
        description: "Key already exists",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem(newKey, newValue);
    loadStorageData();
    setNewKey('');
    setNewValue('');
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Item added successfully",
    });
  };

  // Edit item
  const editItem = () => {
    if (!editingItem) return;

    if (editingItem.key !== newKey) {
      localStorage.removeItem(editingItem.key);
    }
    
    localStorage.setItem(newKey, newValue);
    loadStorageData();
    setEditingItem(null);
    setNewKey('');
    setNewValue('');
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Item updated successfully",
    });
  };

  // Delete item
  const deleteItem = (key: string) => {
    localStorage.removeItem(key);
    loadStorageData();
    
    toast({
      title: "Success",
      description: "Item deleted successfully",
    });
  };

  // Clear all items
  const clearAllItems = () => {
    localStorage.clear();
    loadStorageData();
    
    toast({
      title: "Success",
      description: "All items cleared successfully",
    });
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  // Export data
  const exportData = () => {
    const data = Object.fromEntries(
      storageItems.map(item => [item.key, item.value])
    );
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localStorage-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Data exported successfully",
    });
  };

  // Import data
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, String(value));
        });
        loadStorageData();
        
        toast({
          title: "Success",
          description: "Data imported successfully",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Invalid JSON file",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Open edit dialog
  const openEditDialog = (item: StorageItem) => {
    setEditingItem(item);
    setNewKey(item.key);
    setNewValue(item.value);
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <Head>
        <title>LocalStorage Inspector – Manage Your Browser Storage Easily</title>
        <meta name="description" content="A free web-based localStorage inspector to view, edit, and delete localStorage data with ease. Perfect for developers and web enthusiasts." />
        <meta name="keywords" content="localStorage inspector, browser storage, localStorage viewer, web storage manager, JavaScript tools, developer tools, web development" />
        <meta name="author" content="BOAD Technologies" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="LocalStorage Inspector – Manage Your Browser Storage Easily" />
        <meta property="og:description" content="A free web-based localStorage inspector to view, edit, and delete localStorage data with ease." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://localstorage-inspector.vercel.app" />
        <meta property="og:image" content="https://localstorage-inspector.vercel.app/og-image.png" />
        <meta property="og:site_name" content="LocalStorage Inspector" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LocalStorage Inspector – Manage Your Browser Storage Easily" />
        <meta name="twitter:description" content="A free web-based localStorage inspector to view, edit, and delete localStorage data with ease." />
        <meta name="twitter:image" content="https://localstorage-inspector.vercel.app/og-image.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "LocalStorage Inspector",
              "description": "A free web-based localStorage inspector to view, edit, and delete localStorage data with ease.",
              "url": "https://localstorage-inspector.vercel.app",
              "applicationCategory": "DeveloperTool",
              "operatingSystem": "Web Browser",
              "author": {
                "@type": "Organization",
                "name": "BOAD Technologies"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://localstorage-inspector.vercel.app" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LocalStorage Inspector
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              View, manage, and inspect your browser's localStorage data with this powerful, client-side tool.
              Perfect for developers and web enthusiasts.
            </p>
          </header>

          {/* Stats and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <Card className="flex-1 backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  Storage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Items:</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {storageItems.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Size:</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    {formatSize(totalSize)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button
                  onClick={toggleTheme}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDarkMode ? 'Light' : 'Dark'}
                </Button>
                <Button
                  onClick={loadStorageData}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button
                  onClick={exportData}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Import
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Add Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search keys and values..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>
                      Add a new key-value pair to localStorage
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="key">Key</Label>
                      <Input
                        id="key"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        placeholder="Enter key"
                      />
                    </div>
                    <div>
                      <Label htmlFor="value">Value</Label>
                      <Textarea
                        id="value"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Enter value"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addItem}>Add Item</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {storageItems.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="shadow-lg">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear All LocalStorage</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all localStorage data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearAllItems} className="bg-red-600 hover:bg-red-700">
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>

          {/* Items Display */}
          {filteredItems.length === 0 ? (
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl">
              <CardContent className="py-12 text-center">
                <Database className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  {storageItems.length === 0 ? 'No localStorage data found' : 'No items match your search'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {storageItems.length === 0 
                    ? 'Add some data to localStorage to get started' 
                    : 'Try adjusting your search terms'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredItems.map((item) => (
                <Card key={item.key} className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Key</Label>
                            <Badge variant="outline" className="text-xs">
                              {formatSize(item.size)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md text-sm font-mono text-slate-800 dark:text-slate-200 break-all">
                              {item.key}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(item.key, 'Key')}
                              className="shrink-0"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Value</Label>
                          <div className="flex items-start gap-2">
                            <pre className="flex-1 p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all max-h-32 overflow-y-auto">
                              {item.value}
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(item.value, 'Value')}
                              className="shrink-0"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex lg:flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(item)}
                          className="flex items-center gap-2"
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive" className="flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Item</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the key "{item.key}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteItem(item.key)} className="bg-red-600 hover:bg-red-700">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogDescription>
                  Modify the key-value pair
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-key">Key</Label>
                  <Input
                    id="edit-key"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="Enter key"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-value">Value</Label>
                  <Textarea
                    id="edit-value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Enter value"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editItem}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Designed and Developed by{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  BOAD Technologies
                </span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                A powerful, client-side localStorage management tool for developers
              </p>
            </div>
          </div>
        </footer>

        <Toaster />
      </main>
    </>
  );
}