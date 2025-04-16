import { Button, Input, Select, SelectItem, Slider } from '@heroui/react'
import React, { useState } from 'react'
import { paymentTerms } from './mortgage-calculator'


const PurchaseCalComp = () => {
    const [purchasePrice, setPurchasePrice] = React.useState(0)
    const [downPayment, setDownPayment] = React.useState(0)
    const [paymentTerm, setPaymentTerm] = React.useState(0)
    const [interestRate, setInterestRate] = React.useState(0)
    const [propertyTax, setPropertyTax] = React.useState(0)
    const [insurance, setInsurance] = React.useState(0)

    type CalculationOutputs = {
        principal: string;
        termInMonths: number;
        monthlyInterestRate: string;
        monthlyPayment: string;
        totalPayment: string;
        totalInterest: string;
    }
    const [outputs, setOutputs] = useState<CalculationOutputs | null>(null)

    // Check if all required fields are filled
    const isFormValid = () => {
        console.log(purchasePrice, downPayment, paymentTerm, interestRate, propertyTax, insurance)
        return purchasePrice > 0 && downPayment >= 0 && paymentTerm > 0 && 
               interestRate > 0 && propertyTax > 0 && insurance > 0;
    }

    const calculate = () => {
        // Ensure we have valid inputs
        if (!purchasePrice || !paymentTerm) return;

        const principal = purchasePrice - downPayment;
        const termInMonths = paymentTerm * 12;
        const monthlyInterestRate = (interestRate / 100) / 12;

        // Calculate mortgage payment (P&I)
        const mortgagePayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -termInMonths));

        // Calculate monthly property tax
        const monthlyPropertyTax = (purchasePrice * (propertyTax / 100)) / 12;

        // Calculate monthly insurance
        const monthlyInsurance = insurance / 12;

        // Total monthly payment (PITI - Principal, Interest, Taxes, Insurance)
        const monthlyPayment = mortgagePayment + monthlyPropertyTax + monthlyInsurance;

        const totalPayment = monthlyPayment * termInMonths;
        const totalInterest = totalPayment - principal;

        setOutputs({
            principal: principal.toFixed(2),
            termInMonths: termInMonths,
            monthlyInterestRate: monthlyInterestRate.toFixed(4),
            monthlyPayment: monthlyPayment.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
        });
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <Input
                type="number"
                placeholder="Purchase Price"
                label="Purchase Price"
                className="w-full"
                startContent={
                    <span className="">$</span>
                }
                value={purchasePrice === 0 ? '' : purchasePrice.toString()}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                min={0.01}
                step={0.01}
                required
                isRequired
            />
            <Input
                type="number"
                placeholder="Down Payment"
                label="Down Payment"
                className="w-full"
                startContent={
                    <span className="">$</span>
                }
                value={downPayment === 0 ? '' : downPayment > purchasePrice ? purchasePrice.toString() : downPayment.toString()}
                onChange={(e) => { 
                    const value = Number(e.target.value);
                    setDownPayment(value > purchasePrice ? purchasePrice : value);
                }}
                min={0.01}
                step={0.01}
                max={purchasePrice}
                required
                isRequired
            />
            <Slider
                className="w-full"
                color="warning"
                defaultValue={0}
                label="Select Down Payment Percentage"
                value={purchasePrice ? (downPayment / purchasePrice * 100) : 0}
                onChange={(value) => setDownPayment(purchasePrice * (Number(value) / 100))}
                marks={[
                    {
                        value: 20,
                        label: "20%",
                    },
                    {
                        value: 50,
                        label: "50%",
                    },
                    {
                        value: 80,
                        label: "80%",
                    },
                ]}
                size="sm"
            />
            <Select
                className="w-full"
                label="Payment Term"
                placeholder="Select Payment Term"
                value={paymentTerm}
                onChange={(e) => setPaymentTerm(Number(e.target.value))}
                required
                isRequired
            >
                {paymentTerms.map((terms) => (
                    <SelectItem key={terms.key}>{terms.label}</SelectItem>
                ))}
            </Select>
            <Input
                type="number"
                placeholder="Annual Property Tax"
                label="Annual Property Tax"
                className="w-full"
                value={propertyTax === 0 ? '' : propertyTax.toString()}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
                required
                isRequired
                endContent={
                    <span className="">%</span>
                }
            />
            <Input
                type="number"
                placeholder="Annual Insurance"
                label="Annual Insurance"
                className="w-full"
                value={insurance === 0 ? '' : insurance.toString()}
                onChange={(e) => setInsurance(Number(e.target.value))}
                required
                isRequired
                startContent={
                    <span className="">$</span>
                }
            />
            <Button
                title='Calculate'
                color='warning'
                variant='shadow'
                className="w-full"
                onPress={calculate}
                isDisabled={!isFormValid()}
            >
                Calculate
            </Button>

            {outputs && (
                <div className="w-full p-8 border-0 shadow-sm rounded-lg mt-8">
                    <h3 className="text-2xl font-bold mb-6 tracking-tight">Summary</h3>
                    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-12">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Principal</span>
                            <span className="text-2xl font-medium">${outputs.principal}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Term In Months</span>
                            <span className="text-2xl font-medium">{outputs.termInMonths} months</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Monthly Interest Rate</span>
                            <span className="text-2xl font-medium">{outputs.monthlyInterestRate}%</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Monthly Payment</span>
                            <span className="text-2xl font-medium">${outputs.monthlyPayment}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Payment</span>
                            <span className="text-2xl font-medium">${outputs.totalPayment}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Interest</span>
                            <span className="text-2xl font-medium">${outputs.totalInterest}</span>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default PurchaseCalComp