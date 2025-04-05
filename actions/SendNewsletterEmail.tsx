"use server";
import { resend } from "@/utils/lib/ResendMail/resend";

interface NewsletterFormvalues {
    fullName: string;
    email: string;
    phone: string;
    marketUpdates: boolean;
    propertyListings: boolean;
    tipsAdvice: boolean;
}

interface EmailResponse {
    success: boolean;
    message?: string;
}

export default async function SendNewsletterEmail(values: NewsletterFormvalues): Promise<EmailResponse> {
    try {
        const emailSent = await resend.batch.send([
            {
                from: 'Dara Dream Realty <onboarding@resend.dev>',
                to: values.email,
                subject: `Thank You ${values.fullName} for Subscribing to our Newsletter`,
                react: <div>Thank you for subscribing to our newsletter. We&apos;ll keep you updated with the latest news and updates.</div>,
                text: `Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and updates.`
            },
            {
                from: 'Dara Dream Realty <onboarding@resend.dev>',
                to: process.env.ADMIN_EMAIL as string,
                subject: `${values.fullName} subscribed to our newsletter`,
                react: <div>Contact Details: <br />Name: {values.fullName} <br />Email: {values.email}<br />Phone: {values.phone}<br />Market Updates: {values.marketUpdates ? 'Yes' : 'No'}<br />Property Listings: {values.propertyListings ? 'Yes' : 'No'}<br />Tips & Advice: {values.tipsAdvice ? 'Yes' : 'No'}</div>,
                text: `Contact Details: \nName: ${values.fullName} \nEmail: ${values.email}\nPhone: ${values.phone}\nMarket Updates: ${values.marketUpdates ? 'Yes' : 'No'}\nProperty Listings: ${values.propertyListings ? 'Yes' : 'No'}\nTips & Advice: ${values.tipsAdvice ? 'Yes' : 'No'}`
            }
        ])

        if (!emailSent) {
            console.log("Email not sent")
            return { success: false, message: "Failed to Send Email" }
        }
        console.log(values);
    } catch (error) {
        console.log("Error Subscribing to Newsletter: ", error)
        return { success: false, message: "Error Subscribing to Newsletter" }

    }

    return { success: true, message: "Newsletter Subscription Successful" }
}