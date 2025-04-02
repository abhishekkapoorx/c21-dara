import { Body, Column, Container, Head, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from "@react-email/components";
import BaseEmailTemplate from "./BaseEmailTemplate";


export interface ContactEmailProps {
    name: string;
    subject: string;
}

export function ContactMailClient(props: ContactEmailProps) {
    const { name, subject } = props;
    return (
        <>
            <BaseEmailTemplate title="Contact Form Submitted Successfully | Thank You for Contacting Dara Dream Realty | Dara Dream Realty" preview="Thank You for Contacting Dara Dream Realty | Dara Dream Realty">
                <Section className="px-[32px] py-[20px]">
                    <Text className="text-2xl font-bold text-white">Thank You for Contacting Dara Dream Realty</Text>
                    <Hr />
                    <Text className="text-lg">
                        Hi {name},
                    </Text>
                    <Text className="text-base">
                        Thank you for reaching out to us. We're glad you've chosen to contact us about &apos;<em>{subject}</em>&apos;. Your message is important to us, and we'll respond as soon as possible.
                    </Text>
                    <Text className="text-base">
                        Regards,
                    </Text>
                    <Text className="text-lg font-semibold">
                        Dara Dream Realty Team
                    </Text>
                </Section>
            </BaseEmailTemplate>
            {/* <Preview>Thank You for Contacting Dara Dream Realty | Dara Dream Realty</Preview>
            <Html lang="en">
                <Head>
                    <title>Contact Form Submitted Successfully | Thank You for Contacting Dara Dream Realty | Dara Dream Realty</title>
                </Head>
                <Body className="w-full rounded-xl">
                    <Tailwind>
                        <Container className='text-gray-300 w-full rounded-xl bg-gray-900'>
                            <Section className="px-[32px] py-[40px]">
                                <Row className="flex justify-between items-end">
                                    <Column className="w-[80%]">
                                        <Img
                                            alt="Dara Dream Realty Logo"
                                            height="24"
                                            src={`https://illumework.com/500w/Dara Dream Realty_gray_full_white.png`}
                                        />
                                    </Column>
                                    <Column align="right">
                                        <Row align="right">
                                            <Column className="px-[8px]">
                                                <Link className="text-gray-400 [text-decoration:none]" href="https://illumework.com/services">
                                                    Services
                                                </Link>
                                            </Column>
                                            <Column className="px-[8px]">
                                                <Link className="text-gray-400 [text-decoration:none]" href="https://illumework.com/projects">
                                                    Projects
                                                </Link>
                                            </Column>
                                            <Column className="px-[8px]">
                                                <Link className="text-gray-400 [text-decoration:none]" href="https://illumework.com/about">
                                                    About
                                                </Link>
                                            </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            </Section>



                        </Container>
                    </Tailwind>

                </Body>
            </Html> */}
        </>
    );
}

export default ContactMailClient;