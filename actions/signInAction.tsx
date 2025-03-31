"use server";

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { signIn } from '@/auth';
import { connect } from '@/utils/lib/db/connectDb'



const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(5, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password should be minimum of 8 chars" })
});

export async function signInAction(initialState: any, formData: FormData) {
  try {
    const connection = await connect();

    console.log(formData)
    const requestJson = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const safeRes = signInSchema.safeParse(requestJson)

    if (!safeRes.success) {
      const err = safeRes.error.errors.map(err => err.message).join(", ")

      // return NextResponse.json({message: err, success: false}, {status: 400})
      return { message: err, success: false }
    }

    await signIn('credentials', {
      redirect: false,
      callbackUrl: "/",
      email: safeRes.data.email,
      password: safeRes.data.password
    })

    // redirect("/")
    revalidatePath('/');
    // redirect("/")
    // return {success: true, message: "Sign In Successful"}
    // return NextResponse.json({success: true, message: "Sign In Successful"})
  } catch (error) {
    console.log(error)

    return { message: "Error creating signin please try again! Please check all field are filled correctly", success: false };
    // return NextResponse.json({message: "Error creating signin please try again! Please check all field are filled correctly", success: false}, {status: 400})
  }
  redirect("/");

}