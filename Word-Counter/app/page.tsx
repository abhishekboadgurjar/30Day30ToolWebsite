import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Component from "../word-counter"

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Component />
      <Toaster />
    </ThemeProvider>
  )
}
