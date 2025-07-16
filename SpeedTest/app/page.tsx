import { SpeedTester } from '@/components/speed-tester';
import { Toaster } from '@/components/ui/toaster';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 pointer-events-none" />
      
      <SpeedTester />
      <Toaster />
      
      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                © 2024 Network Speed Tester Tool
              </p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <span className="text-muted-foreground">Designed and Developed by</span>
              <span className="font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                BOAD Technologies
              </span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
              <div>
                <h4 className="font-medium mb-3 text-foreground">Features</h4>
                <ul className="space-y-2">
                  <li>• Real-time speed testing</li>
                  <li>• Download & upload measurement</li>
                  <li>• Ping and jitter analysis</li>
                  <li>• Connection quality assessment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-foreground">Use Cases</h4>
                <ul className="space-y-2">
                  <li>• Internet troubleshooting</li>
                  <li>• ISP performance monitoring</li>
                  <li>• Gaming connection testing</li>
                  <li>• Streaming quality check</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-foreground">Benefits</h4>
                <ul className="space-y-2">
                  <li>• 100% free to use</li>
                  <li>• No registration required</li>
                  <li>• Accurate measurements</li>
                  <li>• Mobile-friendly design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}