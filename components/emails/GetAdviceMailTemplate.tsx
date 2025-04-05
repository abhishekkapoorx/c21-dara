import { Hr, Link, Section, Text } from "@react-email/components";
import BaseEmailTemplate from "./BaseEmailTemplate";


export interface GetAdviceMailProps {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export function GetAdviceMailTemplate(props: GetAdviceMailProps) {
    const { name, email, phone, subject, message } = props;
    return (
        <>
            <BaseEmailTemplate title={`${name} contacted through Dara Dream Realty | Dara Dream Realty`} preview={`${subject}`}>
                <Section className="px-[32px] py-[20px]">
                    <Text className="text-2xl font-bold text-white">{name} contacted through Dara Dream Realty</Text>
                    <Hr />
                    <Text className="text-lg">
                        Contact Details:
                    </Text>
                    <Text className="text-lg">Email: <Link href={`mailto:${email}`}>{email}</Link></Text>
                    <Text className="text-lg">Phone: {phone}</Text>
                    <Text className="text-lg">Subject: {subject}</Text>
                    <Text className="text-lg">Message: {message}</Text>
                </Section>
            </BaseEmailTemplate>
        </>
    );
}

export default GetAdviceMailTemplate;