"use server";
import { render } from '@react-email/render';
import { Resend } from 'resend';
import { RealEstateFormProps, RealEstateFormTemplate } from '@/components/emails/RealEstateFormTemplate';
import BaseEmailTemplate from '@/components/emails/BaseEmailTemplate';
import { Section, Text } from '@react-email/components';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Admin email to receive notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@century21.com';

export async function sendRealEstateFormEmail(formData: RealEstateFormProps) {
    try {
        // Determine subject line based on form type
        let emailSubject = '';

        switch (formData.formType) {
            case 'homeBuyer':
                emailSubject = `New Home Buyer Request - ${formData.fullName}`;
                break;
            case 'homeSeller':
                emailSubject = `New Home Seller Request - ${formData.fullName}`;
                break;
            case 'homeEvaluation':
                emailSubject = `New Home Evaluation Request - ${formData.fullName}`;
                break;
        }

        // Render the email template
        const emailHtml = await render(RealEstateFormTemplate(formData));

        // Send email to admin
        const { data, error } = await resend.emails.send({
            from: 'Dara Dream Realty <onboarding@resend.dev>',
            to: ADMIN_EMAIL,
            subject: emailSubject,
            html: emailHtml,
            text: `New ${formData.formType} request from ${formData.fullName} - ${formData.email}. Please check your email for details.`,
        });

        // Send confirmation email to the client
        await resend.emails.send({
            from: 'Dara Dream Realty <onboarding@resend.dev>',
            to: formData.email,
            subject: `Thank you for your ${formData.formType === 'homeBuyer' ? 'home buying' :
                formData.formType === 'homeSeller' ? 'home selling' :
                    'home evaluation'} inquiry`,
            react: <BaseEmailTemplate title={`Thank You for Submitting ${formData.formType === 'homeBuyer' ? 'home buying' :
                formData.formType === 'homeSeller' ? 'home selling' : 'home evaluation'} request.`} preview={`Thank You for Submitting ${formData.formType === 'homeBuyer' ? 'home buying' :
                    formData.formType === 'homeSeller' ? 'home selling' : 'home evaluation'} request.`}>
                <Section className="p-4">
                    <Text>Dear {formData.fullName.toUpperCase()},</Text>
                    <Text className='text-xl'>Thank you for reaching out to us. We have received your request and will get back to you shortly. If you have any questions, feel free to reply to this email.</Text>
                    <Text>Best regards,</Text>
                    <Text>Dara Dream Realty</Text>
                </Section>
            </BaseEmailTemplate>,
            text: `Dear ${formData.fullName.toUpperCase()},\n\nThank you for reaching out to us. We have received your request and will get back to you shortly. If you have any questions, feel free to reply to this email.\n\nBest regards,\nDara Dream Realty`,
        });

        if (error) {
            console.error('Error sending email:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}