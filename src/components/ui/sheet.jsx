import * as React from 'react'
import { cn } from '@/lib/utils'

const Sheet = ({ open, onOpenChange, ...props }) => (
  <div data-state={open ? 'open' : 'closed'} {...props} />
)

const SheetPortal = ({ ...props }) => <div {...props} />

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

const SheetContent = React.forwardRef(
  ({ side = 'right', className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-side={side}
      className={cn(
        'fixed inset-y-0 z-50 h-full w-3/4 border-r bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        side === 'right' &&
          'right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        side === 'left' && 'left-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
)

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

export { Sheet, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle }
