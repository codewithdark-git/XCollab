"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/community", label: "Community" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Github className="h-6 w-6" />
          <span className="font-mono text-xl font-bold">XCollab</span>
        </Link>

        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-mono text-sm ${
                pathname === item.href ? "text-foreground" : "text-muted-foreground"
              } hover:text-foreground transition-colors`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="secondary" className="font-mono" asChild>
            <a href="https://chat.whatsapp.com/CuRtWYUySlxFiOwzrb21tg" target="_blank" rel="noopener noreferrer">
              Join Us
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

