'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from "@/utilities/ui"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'bg-[var(--theme-elevation-150)] w-[20px] h-[20px] rounded-full shadow-black hover:bg-violet3  outline-none border-[var(--theme-elevation-200)] hover:border-[var(--theme-elevation-300)] focus:border-[var(--theme-elevation-600)] border-solid cursor-default border-[1px]',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:absolute after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-[var(--theme-elevation-800)]">
        {/* <Circle className="h-2.5 w-2.5 fill-current text-current" /> */}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
