"use client";
import { Tab, Tabs } from '@heroui/tabs';
import React from 'react'

const GetAdvice = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <h1 className="text-4xl font-light">Get Advice</h1>

            <Tabs color='warning' fullWidth={true} className="w-full">
                <Tab title="Buyers" className="w-full">
                </Tab>
                <Tab title="Sellers" className="w-full">
                </Tab>
                <Tab title="Free Home Evaluation" className="w-full">
                </Tab>
            </Tabs>
        </div>
    )
}

export default GetAdvice;