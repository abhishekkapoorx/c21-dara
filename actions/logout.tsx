"use server"

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { signOut } from "@/auth"

export default async function logout() {
    try {
        await signOut();
    } catch (error) {
        console.log(error)
        // throw new Error("Error signing out")
    }
    revalidateTag('/')
    redirect("/")
}