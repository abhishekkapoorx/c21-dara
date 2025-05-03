import { Button, Input, Select, SelectItem, Slider } from '@heroui/react'
import React, { useState } from 'react'
import { paymentTerms } from './mortgage-calculator'

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

const PurchaseCalComp = () => {
    const [purchasePrice, setPurchasePrice] = React.useState(0)
    const [downPayment, setDownPayment] = React.useState(0)
    const [paymentTerm, setPaymentTerm] = React.useState(0)
    const [interestRate, setInterestRate] = React.useState(0)
    const [propertyTax, setPropertyTax] = React.useState(0)
    const [insurance, setInsurance] = React.useState(0)

    // Set minimum down payment to 5% when purchase price changes
    React.useEffect(() => {
        if (purchasePrice > 0) {
            const minDownPayment = purchasePrice * 0.05;
            if (downPayment < minDownPayment) {
                setDownPayment(minDownPayment);
            }
        }
    }, [purchasePrice]);

    type CalculationOutputs = {
        principal: number;
        termInMonths: number;
        monthlyInterestRate: number;
        monthlyPayment: number;
        monthlyPrincipal: number;
        monthlyInterest: number;
        monthlyPropertyTax: number;
        monthlyInsurance: number;
        totalPayment: number;
        totalInterest: number;
    }
    const [outputs, setOutputs] = useState<CalculationOutputs | null>(null)

    // Check if all required fields are filled
    const isFormValid = () => {
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
        
        // Calculate first month payment breakdown
        // For the first payment, the interest portion is the loan amount * monthly interest rate
        const monthlyInterest = principal * monthlyInterestRate;
        // Principal portion is the difference between the mortgage payment and interest
        const monthlyPrincipal = mortgagePayment - monthlyInterest;

        // Total monthly payment (PITI - Principal, Interest, Taxes, Insurance)
        const monthlyPayment = mortgagePayment + monthlyPropertyTax + monthlyInsurance;

        const totalPayment = monthlyPayment * termInMonths;
        const totalInterest = (mortgagePayment * termInMonths) - principal;

        setOutputs({
            principal: principal,
            termInMonths: termInMonths,
            monthlyInterestRate: monthlyInterestRate,
            monthlyPayment: monthlyPayment,
            monthlyPrincipal: monthlyPrincipal,
            monthlyInterest: monthlyInterest,
            monthlyPropertyTax: monthlyPropertyTax,
            monthlyInsurance: monthlyInsurance,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
        });
    }
    
    // Calculate the percentage of monthly payment going to each component
    const calculatePercentages = () => {
        if (!outputs) return { 
            principalPercent: 0, 
            interestPercent: 0,
            taxesPercent: 0,
            insurancePercent: 0
        };
        
        const principalPercent = (outputs.monthlyPrincipal / outputs.monthlyPayment) * 100;
        const interestPercent = (outputs.monthlyInterest / outputs.monthlyPayment) * 100;
        const taxesPercent = (outputs.monthlyPropertyTax / outputs.monthlyPayment) * 100;
        const insurancePercent = (outputs.monthlyInsurance / outputs.monthlyPayment) * 100;
        
        return { principalPercent, interestPercent, taxesPercent, insurancePercent };
    }

    const { principalPercent, interestPercent, taxesPercent, insurancePercent } = 
        outputs ? calculatePercentages() : { principalPercent: 0, interestPercent: 0, taxesPercent: 0, insurancePercent: 0 };

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
                    const minDownPayment = purchasePrice * 0.05;
                    setDownPayment(value < minDownPayment ? minDownPayment : (value > purchasePrice ? purchasePrice : value));
                }}
                min={purchasePrice * 0.05}
                step={0.01}
                max={purchasePrice}
                required
                isRequired
            />
            <Slider
                className="w-full"
                color="warning"
                defaultValue={0}
                minValue={5}
                maxValue={100}
                label="Select Down Payment Percentage"
                value={purchasePrice ? (downPayment / purchasePrice * 100) : 5}
                onChange={(value) => setDownPayment(purchasePrice * (Number(value) / 100))}
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
                value={interestRate === 0 ? '' : interestRate.toString()}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0.01}
                step={0.001}
                required
                isRequired
                endContent={
                    <span className="">%</span>
                }
            />
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
                        <div className="flex flex-col col-span-2">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Monthly Payment (PITI)</span>
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
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Property Tax (Monthly)</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.monthlyPropertyTax)}</span>
                            <span className="text-xs text-gray-500">{percentFormatter.format(taxesPercent / 100)} of payment</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Insurance (Monthly)</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.monthlyInsurance)}</span>
                            <span className="text-xs text-gray-500">{percentFormatter.format(insurancePercent / 100)} of payment</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Payment (Life of Loan)</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.totalPayment)}</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Interest (Life of Loan)</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.totalInterest)}</span>
                        </div>
                    </div>
                    
                    {/* Payment Breakdown Visualization */}
                    <div className="mt-8">
                        <h4 className="text-lg font-medium mb-3">Monthly Payment Breakdown</h4>
                        <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden flex">
                            <div className="h-full bg-blue-500" 
                                 style={{ width: `${principalPercent}%` }} 
                                 title={`Principal: ${percentFormatter.format(principalPercent / 100)}`}>
                            </div>
                            <div className="h-full bg-amber-500" 
                                 style={{ width: `${interestPercent}%` }}
                                 title={`Interest: ${percentFormatter.format(interestPercent / 100)}`}>
                            </div>
                            <div className="h-full bg-green-500" 
                                 style={{ width: `${taxesPercent}%` }}
                                 title={`Property Tax: ${percentFormatter.format(taxesPercent / 100)}`}>
                            </div>
                            <div className="h-full bg-purple-500" 
                                 style={{ width: `${insurancePercent}%` }}
                                 title={`Insurance: ${percentFormatter.format(insurancePercent / 100)}`}>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between mt-3 text-sm">
                            <div className="flex items-center mr-4 mb-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                                <span>Principal: {percentFormatter.format(principalPercent / 100)}</span>
                            </div>
                            <div className="flex items-center mr-4 mb-2">
                                <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                                <span>Interest: {percentFormatter.format(interestPercent / 100)}</span>
                            </div>
                            <div className="flex items-center mr-4 mb-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                                <span>Property Tax: {percentFormatter.format(taxesPercent / 100)}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                                <span>Insurance: {percentFormatter.format(insurancePercent / 100)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-4">
                        Note: The principal and interest amounts shown are for the first month's payment. 
                        As your loan is paid down, more of your payment will go toward principal and less toward interest.
                        Property tax and insurance amounts remain constant (unless adjusted for inflation or reassessment).
                    </div>
                </div>
            )}
        </div>
    )
}

export default PurchaseCalComp