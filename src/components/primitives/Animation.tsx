'use client'

import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

type FadeProps = HTMLMotionProps<'div'> & {
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

const directions = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
  none: {},
}

export function Fade({
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  children,
  ...props
}: FadeProps) {
  return (
    <motion.div
      className={cn('', className)}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type SlideProps = HTMLMotionProps<'div'> & {
  delay?: number
  direction?: 'left' | 'right'
}

export function Slide({
  className,
  delay = 0,
  direction = 'left',
  children,
  ...props
}: SlideProps) {
  const x = direction === 'left' ? -50 : 50
  
  return (
    <motion.div
      className={cn('', className)}
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type ScaleProps = HTMLMotionProps<'div'> & {
  delay?: number
  duration?: number
}

export function Scale({
  className,
  delay = 0,
  duration = 0.3,
  children,
  ...props
}: ScaleProps) {
  return (
    <motion.div
      className={cn('', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  className?: string
  children: React.ReactNode
  stagger?: number
}

export function Stagger({ className, children, stagger = 0.1 }: StaggerProps) {
  return (
    <motion.div
      className={cn('', className)}
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const slideVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}