import { Body, Column, Container, Head, Html, Img, Link, Preview, Row, Section, Tailwind } from "@react-email/components";


export interface BaseTempProps {
    title: string;
    preview: string;
    children: React.ReactNode;
}

export function BaseEmailTemplate(props: BaseTempProps) {
    const { title, preview, children } = props;
    return (
        <>
            <Preview>{preview}</Preview>
            <Html lang="en">
                <Head>
                    <title>{title}</title>
                </Head>
                <Body className="w-full rounded-xl">
                    <Tailwind>
                        <Container className='text-gray-300 w-full rounded-xl bg-black'>
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

                            {children}

                        </Container>
                    </Tailwind>

                </Body>
            </Html>
        </>
    );
}

export default BaseEmailTemplate;