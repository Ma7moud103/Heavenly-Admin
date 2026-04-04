import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "error" | "info" | "gold" | "purple"
  className?: string
}
const variants = {
  default:
    "bg-[--color-bg-subtle] text-[--color-text-sub] border-[--color-border]",
  success: "badge-available",
  warning: "badge-reserved",
  error: "badge-occupied",
  info: "badge-checkout",
  gold: "badge-gold",
  purple: "badge-maintenance"
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  

  return (
    <span
      className={cn(
        "badge",
        variants[variant],
        className
      )}
    >
    
      {children}
    </span>
  )
}
