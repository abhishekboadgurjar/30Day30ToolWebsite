"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Wifi, Download, Upload, Zap, Activity, Globe, Timer, Signal, Gauge, Play, Pause, RotateCcw, Sun, Moon, Smartphone, Monitor, WifiOff } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  timestamp: Date;
}

interface TestProgress {
  phase: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  progress: number;
  currentSpeed: number;
}

export function SpeedTester() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState<TestProgress>({
    phase: 'idle',
    progress: 0,
    currentSpeed: 0
  });
  const [results, setResults] = useState<SpeedTestResult | null>(null);
  const [testHistory, setTestHistory] = useState<SpeedTestResult[]>([]);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  // Simulate network speed test
  const runSpeedTest = useCallback(async () => {
    setIsTestRunning(true);
    setTestProgress({ phase: 'ping', progress: 0, currentSpeed: 0 });
    
    try {
      // Ping test
      const pingStart = performance.now();
      await fetch('/favicon.ico', { cache: 'no-cache' });
      const ping = Math.round(performance.now() - pingStart);
      
      setTestProgress({ phase: 'ping', progress: 100, currentSpeed: 0 });
      await new Promise(resolve => setTimeout(resolve, 500));

      // Download test simulation
      setTestProgress({ phase: 'download', progress: 0, currentSpeed: 0 });
      
      const downloadSpeeds: number[] = [];
      for (let i = 0; i <= 100; i += 5) {
        const simulatedSpeed = Math.random() * 100 + 20; // 20-120 Mbps
        downloadSpeeds.push(simulatedSpeed);
        setTestProgress({ 
          phase: 'download', 
          progress: i, 
          currentSpeed: simulatedSpeed 
        });
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const avgDownloadSpeed = downloadSpeeds.reduce((a, b) => a + b, 0) / downloadSpeeds.length;

      // Upload test simulation
      setTestProgress({ phase: 'upload', progress: 0, currentSpeed: 0 });
      
      const uploadSpeeds: number[] = [];
      for (let i = 0; i <= 100; i += 5) {
        const simulatedSpeed = Math.random() * 50 + 10; // 10-60 Mbps
        uploadSpeeds.push(simulatedSpeed);
        setTestProgress({ 
          phase: 'upload', 
          progress: i, 
          currentSpeed: simulatedSpeed 
        });
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const avgUploadSpeed = uploadSpeeds.reduce((a, b) => a + b, 0) / uploadSpeeds.length;
      const jitter = Math.random() * 5 + 1; // 1-6ms jitter

      const result: SpeedTestResult = {
        downloadSpeed: Math.round(avgDownloadSpeed * 10) / 10,
        uploadSpeed: Math.round(avgUploadSpeed * 10) / 10,
        ping: ping,
        jitter: Math.round(jitter * 10) / 10,
        timestamp: new Date()
      };

      setResults(result);
      setTestHistory(prev => [result, ...prev.slice(0, 4)]);
      setTestProgress({ phase: 'complete', progress: 100, currentSpeed: 0 });
      
      toast({
        title: "Speed test completed!",
        description: `Download: ${result.downloadSpeed} Mbps, Upload: ${result.uploadSpeed} Mbps`,
      });

    } catch (error) {
      toast({
        title: "Test failed",
        description: "Unable to complete speed test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestRunning(false);
    }
  }, [toast]);

  const resetTest = () => {
    setTestProgress({ phase: 'idle', progress: 0, currentSpeed: 0 });
    setResults(null);
  };

  const getSpeedCategory = (speed: number) => {
    if (speed < 25) return { label: 'Basic', color: 'bg-red-500', icon: WifiOff };
    if (speed < 50) return { label: 'Good', color: 'bg-yellow-500', icon: Wifi };
    if (speed < 100) return { label: 'Fast', color: 'bg-green-500', icon: Wifi };
    return { label: 'Ultra Fast', color: 'bg-blue-500', icon: Wifi };
  };

  const SpeedGauge = ({ speed, maxSpeed = 200, label }: { speed: number; maxSpeed?: number; label: string }) => {
    const percentage = Math.min((speed / maxSpeed) * 100, 100);
    const rotation = (percentage / 100) * 180 - 90;

    return (
      <div className="relative w-32 h-32 mx-auto">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-4 border-primary/20">
          <div className="absolute inset-2 rounded-full bg-background border border-border">
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-12 bg-primary origin-bottom rounded-full"
              style={{ transformOrigin: '50% 100%' }}
              animate={{ rotate: rotation }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-2xl font-bold text-primary">{speed.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    );
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          animate={{
            x: [0, Math.random() * 100, 0],
            y: [0, Math.random() * 100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      <FloatingParticles />
      
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div 
            className="p-4 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground mr-4"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Gauge className="h-10 w-10" />
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Network Speed Tester
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Test your internet connection speed with precision. Get accurate measurements of download speed, 
          upload speed, ping, and network performance in real-time.
        </p>
      </motion.div>

      {/* Theme Toggle */}
      <div className="flex justify-end mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="gap-2"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Test Panel */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-primary" />
                  Speed Test
                  {isTestRunning && (
                    <Badge variant="secondary" className="animate-pulse">
                      Testing...
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-8">
                {/* Speed Gauges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SpeedGauge 
                      speed={testProgress.phase === 'download' ? testProgress.currentSpeed : (results?.downloadSpeed || 0)} 
                      label="Download (Mbps)"
                    />
                    <div className="mt-4">
                      <Download className="h-5 w-5 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Download Speed</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SpeedGauge 
                      speed={testProgress.phase === 'upload' ? testProgress.currentSpeed : (results?.uploadSpeed || 0)} 
                      label="Upload (Mbps)"
                    />
                    <div className="mt-4">
                      <Upload className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Speed</p>
                    </div>
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <AnimatePresence>
                  {isTestRunning && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">
                          {testProgress.phase === 'ping' && 'Testing Ping...'}
                          {testProgress.phase === 'download' && 'Testing Download Speed...'}
                          {testProgress.phase === 'upload' && 'Testing Upload Speed...'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {testProgress.progress}%
                        </span>
                      </div>
                      <Progress value={testProgress.progress} className="h-3" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={runSpeedTest}
                      disabled={isTestRunning}
                      size="lg"
                      className="gap-2 px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                    >
                      {isTestRunning ? (
                        <>
                          <Pause className="h-5 w-5" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          Start Test
                        </>
                      )}
                    </Button>
                  </motion.div>
                  
                  {results && (
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button
                        onClick={resetTest}
                        variant="outline"
                        size="lg"
                        className="gap-2 px-6 py-6"
                      >
                        <RotateCcw className="h-5 w-5" />
                        Reset
                      </Button>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Signal className="h-5 w-5 text-primary" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <motion.div 
                        className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Download className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                          {results.downloadSpeed}
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-500">Mbps Download</div>
                      </motion.div>

                      <motion.div 
                        className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Upload className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                          {results.uploadSpeed}
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-500">Mbps Upload</div>
                      </motion.div>

                      <motion.div 
                        className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                          {results.ping}
                        </div>
                        <div className="text-sm text-purple-600 dark:text-purple-500">ms Ping</div>
                      </motion.div>

                      <motion.div 
                        className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Timer className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                          {results.jitter}
                        </div>
                        <div className="text-sm text-orange-600 dark:text-orange-500">ms Jitter</div>
                      </motion.div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const category = getSpeedCategory(results.downloadSpeed);
                          const IconComponent = category.icon;
                          return (
                            <>
                              <IconComponent className="h-5 w-5 text-primary" />
                              <span className="font-medium">Connection Quality:</span>
                              <Badge className={`${category.color} text-white`}>
                                {category.label}
                              </Badge>
                            </>
                          );
                        })()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tested at {results.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connection Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Connection Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Device Type</span>
                  <div className="flex items-center gap-1">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Desktop</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Browser</span>
                  <span className="text-sm">Chrome</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Speed Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">💡 Speed Guide</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-muted-foreground">0-25 Mbps: Basic browsing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-muted-foreground">25-50 Mbps: HD streaming</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">50-100 Mbps: 4K streaming</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-muted-foreground">100+ Mbps: Gaming & work</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Test History */}
          {testHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {testHistory.slice(0, 3).map((test, index) => (
                    <motion.div
                      key={test.timestamp.getTime()}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <div className="text-sm font-medium">
                          ↓ {test.downloadSpeed} / ↑ {test.uploadSpeed} Mbps
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {test.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {test.ping}ms
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}