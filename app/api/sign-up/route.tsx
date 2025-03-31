"use server";
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';
import { z } from 'zod';

import prisma from '@/prisma';


const saltRounds = 10;

const userSchema = z.object({
  name: z.string().min(4, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }).min(5, { message: "Email is required" }),
  phone: z.string().min(10, { message: "Phone no greater than 10 is required" }).max(11, {message: "Phone no smaller than 11 is required" }),
  password: z.string().min(8, { message: "Password should be minimum of 8 chars" })
});

export async function POST(request: Request) {
    try {
        // const connection = await connect();
        const requestJson = await request.json();

        const safeRes = userSchema.safeParse(requestJson)

        if (!safeRes.success){
            const err = safeRes.error.errors.map(err => err.message).join(", ")

            return NextResponse.json({message: err, success: false}, {status: 400})
        }
        safeRes.data.password = bcrypt.hashSync(safeRes.data.password, saltRounds);

        const user = await prisma.user.create({
            data: {
                name: safeRes.data.name,
                email: safeRes.data.email,
                phone: safeRes.data.phone,
                password: safeRes.data.password
            }
        })
        console.log(user);

        return NextResponse.json({...user, success: true, message: "User Account Made successfully"})
    } catch (error) {
        console.log(error)

        return NextResponse.json({message: "Error creating account please try again! Please check all field are filled correctly", success: false}, {status: 400})
    }

}