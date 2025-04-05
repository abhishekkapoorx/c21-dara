import { Column, Hr, Link, Row, Section, Text } from "@react-email/components";
import BaseEmailTemplate from "./BaseEmailTemplate";


export interface NewsLetterAdminProps {
    name: string;
    email: string;
    phone: string;
}

export function NewsLetterAdminTemplate(props: NewsLetterAdminProps) {
    const { name, email, phone } = props;
    return (
        <>
            <BaseEmailTemplate title={`${name.toUpperCase()} signed up for Dara Dream Realty Newsletter | Dara Dream Realty`} preview={`${name.toUpperCase()} signed up for Dara Dream Realty Newsletter`}>
                <Section className="px-[32px] py-[20px]">
                    <Text className="text-2xl font-bold text-white">{name.toUpperCase()} signed up for Dara Dream Realty Newsletter</Text>
                    <Hr />
                    <Text className="text-lg">
                        Contact Details:
                    </Text>
                    <Section style={{ marginBottom: "20px" }}>
                        {[name, email, phone].map((item, index) => (
                            <Row key={index} className="flex justify-between items-center w-full">
                                <Column className="w-[80%]">
                                    <Text className="text-lg">{index === 0 ? "Name" : index === 1 ? "Email" : "Phone"}:</Text>
                                </Column>
                                <Column className="w-[20%]">
                                    <Text className="text-lg">{item}</Text>
                                </Column>
                                {index !== 2 && <Hr style={{ width: "100%", margin: "10px 0" }} />}
                            </Row>
                        ))}
                    </Section>
                </Section>
            </BaseEmailTemplate>
        </>
    );
}

export default NewsLetterAdminTemplate;