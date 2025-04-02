import { NextResponse } from 'next/server';
import { z } from 'zod';

import prisma from '@/prisma';
import { resend } from '@/utils/lib/ResendMail/resend';
import ContactMailClient from '@/emails/ContactMailClient';
import ContactMailAdmin from '@/emails/ContactMailAdmin';


const contactSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).min(5, { message: "Email is required" }),
    phone: z.string().min(9, { message: "Phone no greater than 9 is required" }).max(11, { message: "Phone no smaller than 11 is required" }),
    subject: z.string().min(5, { message: "Subject is required" }).max(50, { message: "Subject should be less than 50 chars" }),
    message: z.string().min(10, { message: "Message should be minimum of 10 chars" }).max(500, { message: "Message should be less than 500 chars" })
});

export async function POST(request: Request) {
    try {
        const requestJson = await request.json();

        const safeRes = contactSchema.safeParse(requestJson)

        if (!safeRes.success) {
            const err = safeRes.error.errors.map(err => err.message).join(", ")

            return NextResponse.json({ message: err, "success": false })
        }


        const contact = await prisma.contacts.create({
            data: {
                ...safeRes.data,
            }
        })

        const mailDataClient = await resend.batch.send([
            {
                from: "Dara Dream Realty Support <support@illumework.com>",
                to: contact.email,
                subject: `Thank You ${contact.name} for Contacting Dara Dream Realty`,
                react: ContactMailClient(contact),
                text: "Thank you for contacting Dara Dream Realty. We'll get back to you as soon as possible.",
                
            },
            {
                from: "Dara Dream Realty Support <support@illumework.com>",
                to: process.env.ADMIN_EMAIL_NOREPLY as string,
                subject: `${contact.name} contacted through Dara Dream Realty`,
                react: ContactMailAdmin(contact),
                text: `Contact Details: \nName: ${contact.name} \nEmail: ${contact.email}\nPhone: ${contact.phone}\nSubject: ${contact.subject}\nMessage: ${contact.message}`
            }
        ])



        if (mailDataClient.error) {
            console.log(mailDataClient.error);
            return NextResponse.json({ message: "Error Contacting the Admin please try again!", "success": false }, { status: 500 })
        }


        return NextResponse.json({ ...contact, "success": true, message: "Contact form submitted successfully" })
    } catch (error) {
        return NextResponse.json({ message: "Error Contacting the Admin please try again!", "success": false }, { status: 400 })
    }

}