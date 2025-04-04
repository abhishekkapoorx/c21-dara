"use client";
import HomeBuyers from '@/components/get-advice/HomeBuyers';
import { Heading } from '@/components/TextComps';
import { Tab, Tabs } from '@heroui/tabs';
import React from 'react'

const GetAdvice = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <Heading title='Get Advice'/>

            <Tabs color='warning' fullWidth={true} className="w-full">
                <Tab title="Home Buyers" className="w-full">
                    <HomeBuyers/>
                </Tab>
                <Tab title="Home Sellers" className="w-full">
                </Tab>
                <Tab title="Free Home Evaluation" className="w-full">
                </Tab>
            </Tabs>
        </div>
    )
}

export default GetAdvice;