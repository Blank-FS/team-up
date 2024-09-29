import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

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
        bgColor || "bg-[#CFC096] dark:bg-[#9A3324]",
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

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, TextColorProps {
  user?: {
    picture?: string;
    name?: string;
    nickname?: string;
  };
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, textColor, user, children, ...props }, ref) => {
    const router = useRouter()

    return (
      <div
        ref={ref}
        className={cn("flex items-start space-x-4 p-6", textColor, className)}
        {...props}
      >
        {user && (
          <Avatar className="hover:cursor-pointer" onClick={() => router.push("/home")}>
            <AvatarImage
              src={user.picture ?? ""}
              alt={user.name ?? "User"}
            />
            <AvatarFallback>{user.nickname}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)
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