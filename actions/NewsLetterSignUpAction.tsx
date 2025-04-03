"use server";

import prisma from "@/prisma";
import { resend } from "@/utils/lib/ResendMail/resend";

interface NewsletterFormData {
    fullName: string;
    email: string;
    phone: string;
    marketUpdates: boolean;
    propertyListings: boolean;
    tipsAdvice: boolean;
}

interface SignUpResponse {
    success: boolean;
    message?: string;
}

export default async function NewsLetterSignUp(prevState: any, formdata: FormData): Promise<SignUpResponse> {
    const data: NewsletterFormData = {
        fullName: formdata.get("fullName") as string,
        email: formdata.get("email") as string,
        phone: formdata.get("phone") as string,
        marketUpdates: formdata.get("marketUpdates") === "on",
        propertyListings: formdata.get("propertyListings") === "on",
        tipsAdvice: formdata.get("tipsAdvice") === "on"
    };

    // check if user is already subscribed
    try {
        const newsLetter = await prisma.newsletterSubscription.findFirst({
            where: {
                email: data.email
            }
        })
        if (newsLetter) {
            console.log("User already subscribed")
            return { success: false, message: "User already subscribed" }
        }

        // create new subscription
        await prisma.newsletterSubscription.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                marketUpdates: data.marketUpdates,
                propertyListings: data.propertyListings,
                tipsAdvice: data.tipsAdvice
            }
        })

        // send email to user
        const emailSent = await resend.batch.send([
            {
                from: 'Dara Dream Realty <onboarding@resend.dev>',
                to: data.email,
                subject: `Thank You ${data.fullName} for Subscribing to our Newsletter`,
                react: <div>Thank you for subscribing to our newsletter. We&apos;ll keep you updated with the latest news and updates.</div>,
                text: `Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and updates.`
            },
            {
                from: 'Dara Dream Realty <onboarding@resend.dev>',
                to: process.env.ADMIN_EMAIL as string,
                subject: `${data.fullName} subscribed to our newsletter`,
                react: <div>Contact Details: <br />Name: {data.fullName} <br />Email: {data.email}<br />Phone: {data.phone}<br />Market Updates: {data.marketUpdates ? 'Yes' : 'No'}<br />Property Listings: {data.propertyListings ? 'Yes' : 'No'}<br />Tips & Advice: {data.tipsAdvice ? 'Yes' : 'No'}</div>,
                text: `Contact Details: \nName: ${data.fullName} \nEmail: ${data.email}\nPhone: ${data.phone}\nMarket Updates: ${data.marketUpdates ? 'Yes' : 'No'}\nProperty Listings: ${data.propertyListings ? 'Yes' : 'No'}\nTips & Advice: ${data.tipsAdvice ? 'Yes' : 'No'}`
            }
        ])

        if (!emailSent) {
            console.log("Email not sent")
            return { success: false, message: "Failed to Send Email" }
        }
        console.log(data);
    } catch (error) {
        console.log("Error Subscribing to Newsletter: ", error)
        return { success: false, message: "Error Subscribing to Newsletter" }

    }

    return { success: true, message: "Newsletter Subscription Successful" }
    // Perform your API call or further processing here
}