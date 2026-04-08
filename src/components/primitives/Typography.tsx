'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  'display-lg': 'text-[3.5rem] font-bold tracking-tight font-display',
  'title-xl': 'text-[2rem] font-semibold font-display',
  'title-lg': 'text-[1.5rem] font-semibold font-display',
  'title-md': 'text-[1.25rem] font-semibold font-display',
  'body-lg': 'text-[1.125rem] font-normal',
  'body-md': 'text-[0.875rem] font-normal',
  'body-sm': 'text-[0.75rem] font-normal',
  'label-lg': 'text-[0.875rem] font-medium',
  'label-md': 'text-[0.75rem] font-medium',
  'label-sm': 'text-[0.625rem] font-medium',
} as const

type TypographyVariant = keyof typeof variants

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TypographyVariant
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant = 'body-md', as: Component = 'p', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(variants[variant], 'text-[#00201d]', className)}
        {...props}
      />
    )
  }
)
Typography.displayName = 'Typography'

export { Typography, variants }
export type { TypographyProps, TypographyVariant }