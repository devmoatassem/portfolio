import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  beforeIcon?: React.ReactElement | React.ReactNode
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, beforeIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {beforeIcon && (
          <div className="absolute   w-6 h-6 mt-2 flex items-center justify-center">
            {beforeIcon}
          </div>
        )}
        <input
          className={cn(
            'flex h-10  w-full border bg-[var(--theme-elevation-50)] px-3 py-2 text-sm  ring-offset-background file:border-0 file:bg-transparent file:text-sm  file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 outline-none border-[var(--theme-elevation-200)] hover:border-[var(--theme-elevation-300)] focus:border-[var(--theme-elevation-600)] border-solid',
            className,
            beforeIcon && 'pl-6',
          )}
          ref={ref}
          type={type}
          {...props}
        />
      </div>
    )
  },
)
InputWithIcon.displayName = 'InputWithIcon'

export { InputWithIcon }
