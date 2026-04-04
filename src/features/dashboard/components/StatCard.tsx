import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  variant?: "default" | "gold" | "success" | "warning" | "error"
  className?: string
}

const variantStyles = {
  default: "border-[--color-border] bg-[--color-bg-raised]",
  gold: "border-[--color-border-gold] bg-[--color-bg-raised] stat-card-gold",
  success: "border-[--color-success-border] bg-[--color-success-bg]/30",
  warning: "border-[--color-warning-border] bg-[--color-warning-bg]/30",
  error: "border-[--color-error-border] bg-[--color-error-bg]/30"
};
 const changeColors = {
   positive: "text-[--color-success]",
   negative: "text-[--color-error]",
   neutral: "text-[--color-text-sub]"
 };

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  variant = "default",
  className,
}: StatCardProps) {

  

 
  return (
    <div
      className={cn(
        "card p-5 flex flex-col gap-2 relative overflow-hidden",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[--color-text-sub] uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="text-[--color-text-muted]">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-[--color-text] tracking-tight">
          {value}
        </span>
        {change && (
          <span className={cn("text-sm font-medium", changeColors[changeType])}>
            {change}
          </span>
        )}
      </div>
    </div>
  )
}
