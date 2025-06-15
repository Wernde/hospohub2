
import * as React from "react"
import { cn } from "@/lib/utils"

export interface PantryInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'low-stock' | 'expiring'
}

const PantryInput = React.forwardRef<HTMLInputElement, PantryInputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: "bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500 focus-visible:ring-stone-500",
      'low-stock': "bg-red-50 border-red-300 text-red-900 placeholder:text-red-500 focus-visible:ring-red-500",
      'expiring': "bg-yellow-50 border-yellow-300 text-yellow-900 placeholder:text-yellow-500 focus-visible:ring-yellow-500"
    }
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
PantryInput.displayName = "PantryInput"

export { PantryInput }
