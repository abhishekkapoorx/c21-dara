"use client"
import { Button, ButtonGroupProps } from "@heroui/react"
import { useRouter } from "next/navigation"

interface ClientButtonProps { 
    children: React.ReactNode, 
    link: string, 
    className?: string, 
    color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined
}
export const ClientButton = ({ children, link, className, color }: ClientButtonProps) => {
    const router = useRouter()
    return <Button color={color ? color : 'primary'} variant="flat" onPress={() => router.push(link)} className={className}>{children}</Button>
}