import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <h2 className="font-mono text-4xl font-bold tracking-tighter mb-4">{title}</h2>
      {subtitle && <p className="text-xl text-muted-foreground font-mono">{subtitle}</p>}
    </div>
  )
}

