"use server";
import BaseEmailTemplate from "@/components/emails/BaseEmailTemplate";
import NewsLetterAdminTemplate from "@/components/emails/NewsLetterAdminMail";
import { resend } from "@/utils/lib/ResendMail/resend";
import { Text } from "@react-email/components";

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
                react: <BaseEmailTemplate title="Thanks for Signing Up for Dara Dream Realty Newsletter" preview="Thanks for Signing Up for Dara Dream Realty Newsletter"><Text className="p-4 text-white">Thank you for subscribing to our newsletter. We&apos;ll keep you updated with the latest news and updates.</Text></BaseEmailTemplate>,
                text: `Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and updates.`
            },
            {
                from: 'Dara Dream Realty <onboarding@resend.dev>',
                to: process.env.ADMIN_EMAIL as string,
                subject: `${values.fullName} subscribed to our newsletter`,
                react: <NewsLetterAdminTemplate name={values.fullName} phone={values.phone} email={values.email}/>,
                text: `Contact Details: \nName: ${values.fullName} \nEmail: ${values.email}\nPhone: ${values.phone}\nMarket Updates: ${values.marketUpdates ? 'Yes' : 'No'}\nProperty Listings: ${values.propertyListings ? 'Yes' : 'No'}\nTips & Advice: ${values.tipsAdvice ? 'Yes' : 'No'}`
            }
        ])

        if (emailSent.data == null) {
            console.log(emailSent.error?.message)
            return { success: false, message: "Failed to Send Email" }
        }
        console.log("emailSent", emailSent)
        console.log("Email Sent Successfully")
        console.log(values);
    } catch (error) {
        console.log("Error Subscribing to Newsletter: ", error)
        return { success: false, message: "Error Subscribing to Newsletter" }

    }

    return { success: true, message: "Newsletter Subscription Successful" }
}