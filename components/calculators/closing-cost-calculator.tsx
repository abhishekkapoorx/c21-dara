import { Button, Input, Select, SelectItem, Slider } from '@heroui/react'
import React from 'react'
import { paymentTerms } from './mortgage-calculator';

interface CalculationOutputs {
    loanAmount: number;
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    downPaymentPercent: number;
}

const MortgageCalculatorComp = () => {

    const [PurchasePrice, setPurchasePrice] = React.useState(0)
    const [downPayment, setDownPayment] = React.useState(0)
    const [paymentTerm, setPaymentTerm] = React.useState(30)
    const [interestRate, setInterestRate] = React.useState(0)
    const [outputs, setOutputs] = React.useState<CalculationOutputs | null>(null)

    // Check if all required fields are filled
    const isFormValid = () => {
        return PurchasePrice > 0 && downPayment >= 0 && paymentTerm > 0 && interestRate > 0;
    }

    const calculate = () => {

        // Basic calculations
        const loanAmount = PurchasePrice - downPayment;
        const downPaymentPercent = (downPayment / PurchasePrice) * 100;

        // Monthly payment calculation
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = paymentTerm * 12;
        const monthlyPayment = loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Total costs
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;
        const totalCost = totalPayment + downPayment;

        setOutputs({
            loanAmount,
            monthlyPayment,
            totalInterest,
            totalCost,
            downPaymentPercent,
        });
    };


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
                value={PurchasePrice === 0 ? '' : PurchasePrice.toString()}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
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
                value={downPayment === 0 ? '' : downPayment > PurchasePrice ? PurchasePrice.toString() : downPayment.toString()}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    setDownPayment(value > PurchasePrice ? PurchasePrice : value);
                }}
                min={0.01}
                step={0.01}
                max={PurchasePrice}
                defaultValue='1'
                required
                isRequired
            />
            <Slider
                className="w-full"
                color="warning"
                defaultValue={downPayment / PurchasePrice * 100}
                label="Select Down Payment Percentage"
                value={PurchasePrice ? (downPayment / PurchasePrice * 100) : 0}
                onChange={(value) => setDownPayment(PurchasePrice * (Number(value) / 100))}
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
                required
                isRequired
                onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <Button title='Calculate' color='warning' variant='shadow' className="w-full" onPress={calculate} isDisabled={!isFormValid()}>Calculate</Button>

            {outputs && (
                <div className="w-full p-8 border-0 shadow-sm rounded-lg mt-8">
                    <h3 className="text-2xl font-bold mb-6 tracking-tight">Summary</h3>
                    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-12">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Loan Amount</span>
                            <span className="text-2xl font-medium">${outputs.loanAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Monthly Payment</span>
                            <span className="text-2xl font-medium">${outputs.monthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Interest</span>
                            <span className="text-2xl font-medium">${outputs.totalInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Total Cost</span>
                            <span className="text-2xl font-medium">${outputs.totalCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-amber-500 mb-1">Down Payment Percent</span>
                            <span className="text-2xl font-medium">{outputs.downPaymentPercent.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%</span>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default MortgageCalculatorComp