import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 max-w-screen-xl">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Boad Technologies. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}