import { Button, Input, Select, SelectItem, Slider } from '@heroui/react'
import React, { useState } from 'react'

// Currency formatter
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Percentage formatter
const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
});

export const paymentTerms = [
    { key: 10, label: '10 years' },
    { key: 15, label: '15 years' },
    { key: 20, label: '20 years' },
    { key: 25, label: '25 years' },
    { key: 30, label: '30 years' },
]
const MortgageCalculatorComp = () => {

    const [homePrice, setHomePrice] = React.useState(0)
    const [downPayment, setDownPayment] = React.useState(0)
    const [paymentTerm, setPaymentTerm] = React.useState(30)
    const [interestRate, setInterestRate] = React.useState(0)

    interface CalculationOutputs {
        principal: number;
        termInMonths: number;
        monthlyInterestRate: number;
        monthlyPayment: number;
        totalPayment: number;
        totalInterest: number;
    }

    const [outputs, setOutputs] = useState<CalculationOutputs | null>(null)

    // Check if all required fields are filled
    const isFormValid = () => {
        return homePrice > 0 && downPayment > 0 && paymentTerm > 0 && interestRate > 0;
    }

    const calculate = () => {
        const principal = homePrice - downPayment;
        const termInMonths = paymentTerm * 12;
        const monthlyInterestRate = (interestRate / 100) / 12;
        const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -termInMonths));
        const totalPayment = monthlyPayment * termInMonths;
        const totalInterest = totalPayment - principal;

        setOutputs({
            principal: principal,
            termInMonths: termInMonths,
            monthlyInterestRate: monthlyInterestRate,
            monthlyPayment: monthlyPayment,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
        });
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <Input
                type="number"
                placeholder="Home Price"
                label="Home Price"
                className="w-full"
                startContent={
                    <span className="">$</span>
                }
                value={homePrice === 0 ? '' : homePrice.toString()}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                min={0.01}
                step={0.01}
                defaultValue='1'
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
                value={downPayment === 0 ? '' : downPayment > homePrice ? homePrice.toString() : downPayment.toString()}
                onChange={(e) => { setDownPayment(Number(e.target.value)) }}
                min={0.01}
                step={0.01}
                defaultValue='1'
                max={homePrice}
                required
                isRequired
            />
            <Slider
                className="w-full"
                color="warning"
                defaultValue={downPayment / homePrice * 100}
                label="Select Down Payment Percentage"
                value={homePrice ? (downPayment / homePrice * 100) : 0}
                onChange={(value) => setDownPayment(homePrice * (Number(value) / 100))}
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
            // size="sm"
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
                placeholder="Interest Rate"
                label="Interest Rate"
                className="w-full"
                endContent={
                    <span className="">%</span>
                }
                value={interestRate === 0 ? '' : interestRate.toString()}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                required
                isRequired
                min={0.01}
                step={0.01}
            />
            <Button title='Calculate' color='warning' variant='shadow' className="w-full" onPress={calculate} isDisabled={!isFormValid()}>Calculate</Button>

            {outputs && (
                <div className="w-full p-8 border-0 shadow-sm rounded-lg mt-8">
                    <h3 className="text-2xl font-bold mb-6 tracking-tight">Summary</h3>
                    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-12">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Monthly Payment</span>
                            <span className="text-2xl font-medium">{currencyFormatter.format(outputs.monthlyPayment)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Payment</span>
                            <span className="text-2xl font-medium">{currencyFormatter.format(outputs.totalPayment)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Interest</span>
                            <span className="text-2xl font-medium">{currencyFormatter.format(outputs.totalInterest)}</span>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default MortgageCalculatorComp