import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Wifi, Gauge } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
            <Wifi className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild>
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/" className="gap-2">
                <Gauge className="h-4 w-4" />
                Speed Test
              </Link>
            </Button>
          </div>
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Need help? Visit our speed tester to check your connection.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}