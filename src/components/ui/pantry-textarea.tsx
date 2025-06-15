
import * as React from "react"
import { cn } from "@/lib/utils"

export interface PantryTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'low-stock' | 'expiring'
}

const PantryTextarea = React.forwardRef<HTMLTextAreaElement, PantryTextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: "bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500 focus-visible:ring-stone-500",
      'low-stock': "bg-red-50 border-red-300 text-red-900 placeholder:text-red-500 focus-visible:ring-red-500",
      'expiring': "bg-yellow-50 border-yellow-300 text-yellow-900 placeholder:text-yellow-500 focus-visible:ring-yellow-500"
    }
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
PantryTextarea.displayName = "PantryTextarea"

export { PantryTextarea }
