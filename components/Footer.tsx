import Link from "next/link"
import { Github, Linkedin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-background to-secondary/5 py-12 border-t border-secondary/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-mono text-2xl font-bold gradient-text">Xcollab</h3>
            <p className="text-muted-foreground">
              Empowering developers to create, collaborate, and innovate together.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/xcollab" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com/company/xcollab-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://chat.whatsapp.com/CuRtWYUySlxFiOwzrb21tg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-lg font-bold mb-4 gradient-text">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-lg font-bold mb-4 gradient-text">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Stay updated with our latest news and projects.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 bg-secondary/10 rounded-md border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-secondary/20 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Xcollab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

