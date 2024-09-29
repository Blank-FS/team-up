import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string;
  textColor?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, bgColor, textColor, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border shadow-sm",
        bgColor || "bg-card",
        textColor || "text-card-foreground",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

interface TextColorProps {
  textColor?: string;
}

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TextColorProps
>(({ className, textColor, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", textColor, className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & TextColorProps
>(({ className, textColor, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      textColor,
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & TextColorProps
>(({ className, textColor, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm", textColor || "text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TextColorProps
>(({ className, textColor, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", textColor, className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TextColorProps
>(({ className, textColor, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", textColor, className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }