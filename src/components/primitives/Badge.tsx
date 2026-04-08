'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          {
            'bg-[#c5fff5] text-[#006b2c]': variant === 'default',
            'bg-[#dcfce7] text-[#16a34a]': variant === 'success',
            'bg-[#fef3c7] text-[#d97706]': variant === 'warning',
            'bg-[#fee2e2] text-[#dc2626]': variant === 'error',
            'border border-[#006b2c] text-[#006b2c]': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }