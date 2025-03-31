import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const POST = auth(() => {
    return NextResponse.json({ message: 'Project created' })
})