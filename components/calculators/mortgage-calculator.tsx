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
        monthlyPrincipal: number;
        monthlyInterest: number;
        totalPayment: number;
        totalInterest: number;
    }

    const [outputs, setOutputs] = useState<CalculationOutputs | null>(null)

    // Set minimum down payment to 5% when home price changes
    React.useEffect(() => {
        if (homePrice > 0) {
            const minDownPayment = homePrice * 0.05;
            if (downPayment < minDownPayment) {
                setDownPayment(minDownPayment);
            }
        }
    }, [homePrice]);

    // Check if all required fields are filled
    const isFormValid = () => {
        return homePrice > 0 && downPayment > 0 && paymentTerm > 0 && interestRate > 0;
    }

    const calculate = () => {
        const principal = homePrice - downPayment;
        const termInMonths = paymentTerm * 12;
        const monthlyInterestRate = (interestRate / 100) / 12;
        const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -termInMonths));
        
        // Calculate first month payment breakdown
        // For the first payment, the interest portion is the loan amount * monthly interest rate
        const firstMonthInterest = principal * monthlyInterestRate;
        // Principal portion is the difference between the monthly payment and interest
        const firstMonthPrincipal = monthlyPayment - firstMonthInterest;
        
        const totalPayment = monthlyPayment * termInMonths;
        const totalInterest = totalPayment - principal;

        setOutputs({
            principal: principal,
            termInMonths: termInMonths,
            monthlyInterestRate: monthlyInterestRate,
            monthlyPayment: monthlyPayment,
            monthlyPrincipal: firstMonthPrincipal,
            monthlyInterest: firstMonthInterest,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
        });
    }

    // Calculate the percentage of monthly payment going to principal and interest
    const calculatePercentages = () => {
        if (!outputs) return { principalPercent: 0, interestPercent: 0 };
        
        const principalPercent = (outputs.monthlyPrincipal / outputs.monthlyPayment) * 100;
        const interestPercent = (outputs.monthlyInterest / outputs.monthlyPayment) * 100;
        
        return { principalPercent, interestPercent };
    }

    const { principalPercent, interestPercent } = outputs ? calculatePercentages() : { principalPercent: 0, interestPercent: 0 };

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
                onChange={(e) => { 
                    const value = Number(e.target.value);
                    const minDownPayment = homePrice * 0.05;
                    setDownPayment(value < minDownPayment ? minDownPayment : (value > homePrice ? homePrice : value));
                }}
                min={homePrice * 0.05}
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
                minValue={5}
                maxValue={100}
                label="Select Down Payment Percentage"
                value={homePrice ? (downPayment / homePrice * 100) : 5}
                onChange={(value) => setDownPayment(homePrice * (Number(value) / 100))}
                marks={[
                    {
                        value: 5,
                        label: "5%",
                    },
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
                        <div className="flex flex-col col-span-2">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Monthly Payment</span>
                            <span className="text-2xl font-medium">{currencyFormatter.format(outputs.monthlyPayment)}</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Principal (First Month)</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.monthlyPrincipal)}</span>
                            <span className="text-xs text-gray-500">{percentFormatter.format(principalPercent / 100)} of payment</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Interest (First Month)</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.monthlyInterest)}</span>
                            <span className="text-xs text-gray-500">{percentFormatter.format(interestPercent / 100)} of payment</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Payment</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.totalPayment)}</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Interest</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.totalInterest)}</span>
                        </div>
                    </div>
                    
                    {/* Payment Breakdown Visualization */}
                    <div className="mt-8">
                        <h4 className="text-lg font-medium mb-3">First Month Payment Breakdown</h4>
                        <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-600" 
                                 style={{ width: `${principalPercent}%` }}>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                                <span>Principal: {percentFormatter.format(principalPercent / 100)}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                                <span>Interest: {percentFormatter.format(interestPercent / 100)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-4">
                        Note: The principal and interest amounts shown are for the first month&apos;s payment. 
                        As time passes, more of your payment will go toward principal and less toward interest.
                    </div>
                </div>
            )}
        </div>
    )
}

export default MortgageCalculatorComp