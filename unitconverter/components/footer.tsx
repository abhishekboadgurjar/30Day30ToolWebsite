export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} UnitConverter by Boad Technologies. All rights reserved.</p>
        <p className="mt-2">Works offline. Install on your device for quick access anytime.</p>
        <p className="mt-1">
          <a
            href="https://boadtechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Visit boadtechnologies.com
          </a>
        </p>
      </div>
    </footer>
  )
}
