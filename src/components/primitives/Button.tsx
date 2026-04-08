'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b2c] disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#006b2c] text-white hover:bg-[#005524] rounded-full': variant === 'primary',
            'bg-[#fed7aa] text-[#9a4a1e] hover:bg-[#fec996] rounded-full': variant === 'secondary',
            'border border-[#006b2c] text-[#006b2c] hover:bg-[#e4fff9] rounded-full': variant === 'outline',
            'text-[#006b2c] hover:bg-[#e4fff9]/50 rounded-full': variant === 'ghost',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-5 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }