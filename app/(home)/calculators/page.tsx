"use client"
import ClosingCostCalComp from '@/components/calculators/closing-cost-calculator'
import MortgageCalculatorComp from '@/components/calculators/mortgage-calculator'
import PurchaseCalComp from '@/components/calculators/purchase-calculator'
import { Heading } from '@/components/TextComps'
import { Tab, Tabs } from '@heroui/tabs'
import React from 'react'

const CalculatorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <Heading title='Calculators'/>

            <Tabs color='warning' fullWidth={true} className="w-full">
                <Tab title="Mortgage Calculator" className="w-full">
                    <MortgageCalculatorComp/>
                </Tab>
                <Tab title="Purchase Calculator" className="w-full">
                    <PurchaseCalComp/>
                </Tab>
                <Tab title="Closing Cost Calculator" className="w-full">
                    <ClosingCostCalComp />
                </Tab>
            </Tabs>
        </div>
  )
}

export default CalculatorPage