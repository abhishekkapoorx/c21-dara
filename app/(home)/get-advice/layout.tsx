import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Get Advice | Dara Dream Realty',
    description: 'Receive personalized advice and guidance for your dream property',
};

interface GetAdviceLayoutProps {
    children: React.ReactNode;
}

export default async function GetAdviceLayout({ children }: GetAdviceLayoutProps) {
    return (
        <section className="container flex items-center justify-center py-8">
            {children}
        </section>
    );
}