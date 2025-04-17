import { Button, Input, Select, SelectItem, Slider, Checkbox } from '@heroui/react'
import React from 'react'

// Currency formatter - Changed to CAD for Canadian real estate
const currencyFormatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Percentage formatter
const percentFormatter = new Intl.NumberFormat('en-CA', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Canadian provinces and territories
const provinces = [
    { key: 'bc', label: 'British Columbia' },
    { key: 'on', label: 'Ontario' },
    { key: 'ab', label: 'Alberta' },
    { key: 'mb', label: 'Manitoba' },
    { key: 'nb', label: 'New Brunswick' },
    { key: 'nl', label: 'Newfoundland and Labrador' },
    { key: 'ns', label: 'Nova Scotia' },
    { key: 'nt', label: 'Northwest Territories' },
    { key: 'nu', label: 'Nunavut' },
    { key: 'pe', label: 'Prince Edward Island' },
    { key: 'qc', label: 'Quebec' },
    { key: 'sk', label: 'Saskatchewan' },
    { key: 'yt', label: 'Yukon' },
];

interface CalculationOutputs {
    purchasePrice: number;
    downPayment: number;
    downPaymentPercent: number;
    landTransferTax: number;
    landTransferTaxRebate: number;
    torontoLTT: number;
    torontoLTTRebate: number;
    legalFees: number;
    titleInsurance: number;
    propertyInsurance: number;
    appraisalFee: number;
    mortgageInsurancePST: number;
    totalClosingCosts: number;
}

const ClosingCostCalculatorComp = () => {
    const [purchasePrice, setPurchasePrice] = React.useState(0)
    const [downPayment, setDownPayment] = React.useState(0)
    const [province, setProvince] = React.useState('ab')
    const [isFirstTimeBuyer, setIsFirstTimeBuyer] = React.useState(false)
    const [isInToronto, setIsInToronto] = React.useState(false)
    const [legalFees, setLegalFees] = React.useState(500)
    const [titleInsurance, setTitleInsurance] = React.useState(150)
    const [propertyInsurance, setPropertyInsurance] = React.useState(500)
    const [appraisalFee, setAppraisalFee] = React.useState(300)
    const [mortgageInsurancePST, setMortgageInsurancePST] = React.useState(0)
    const [outputs, setOutputs] = React.useState<CalculationOutputs | null>(null)

    // Calculate Ontario Land Transfer Tax
    const calculateOntarioLTT = (price: number) => {
        let tax = 0;
        
        if (price <= 55000) {
            tax = price * 0.005;
        } else if (price <= 250000) {
            tax = 55000 * 0.005 + (price - 55000) * 0.01;
        } else if (price <= 400000) {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (price - 250000) * 0.015;
        } else if (price <= 2000000) {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (price - 400000) * 0.02;
        } else {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (2000000 - 400000) * 0.02 + (price - 2000000) * 0.025;
        }
        
        return tax;
    }
    
    // Calculate Toronto Municipal Land Transfer Tax
    const calculateTorontoLTT = (price: number) => {
        let tax = 0;
        
        if (price <= 55000) {
            tax = price * 0.005;
        } else if (price <= 250000) {
            tax = 55000 * 0.005 + (price - 55000) * 0.01;
        } else if (price <= 400000) {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (price - 250000) * 0.015;
        } else if (price <= 2000000) {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (price - 400000) * 0.02;
        } else if (price <= 3000000) {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (2000000 - 400000) * 0.02 + (price - 2000000) * 0.025;
        } else if (price <= 10000000) {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (2000000 - 400000) * 0.02 + (3000000 - 2000000) * 0.025 + (price - 3000000) * 0.035;
        } else if (price <= 20000000) {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (2000000 - 400000) * 0.02 + (3000000 - 2000000) * 0.025 + (10000000 - 3000000) * 0.035 + (price - 10000000) * 0.065;
        } else {
            tax = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (2000000 - 400000) * 0.02 + (3000000 - 2000000) * 0.025 + (10000000 - 3000000) * 0.035 + (20000000 - 10000000) * 0.065 + (price - 20000000) * 0.075;
        }
        
        return tax;
    }
    
    // Calculate British Columbia Land Transfer Tax
    const calculateBCLTT = (price: number) => {
        let tax = 0;
        
        if (price <= 200000) {
            tax = price * 0.01;
        } else if (price <= 2000000) {
            tax = 200000 * 0.01 + (price - 200000) * 0.02;
        } else if (price <= 3000000) {
            tax = 200000 * 0.01 + (2000000 - 200000) * 0.02 + (price - 2000000) * 0.03;
        } else {
            tax = 200000 * 0.01 + (2000000 - 200000) * 0.02 + (3000000 - 2000000) * 0.03 + (price - 3000000) * 0.05;
        }
        
        return tax;
    }
    
    // Calculate Alberta Land Title Transfer Fee
    const calculateAlbertaFee = (price: number) => {
        // Base fee + additional fee for every $5,000 of the property value
        const baseFee = 50;
        const additionalFee = Math.ceil(price / 5000) * 2;
        return baseFee + additionalFee;
    }
    
    // Calculate Quebec Land Transfer Tax (Welcome Tax)
    const calculateQuebecLTT = (price: number) => {
        let tax = 0;
        
        if (price <= 51700) {
            tax = price * 0.005;
        } else if (price <= 258600) {
            tax = 51700 * 0.005 + (price - 51700) * 0.01;
        } else if (price <= 517100) {
            tax = 51700 * 0.005 + (258600 - 51700) * 0.01 + (price - 258600) * 0.015;
        } else if (price <= 1034200) {
            tax = 51700 * 0.005 + (258600 - 51700) * 0.01 + (517100 - 258600) * 0.015 + (price - 517100) * 0.02;
        } else {
            tax = 51700 * 0.005 + (258600 - 51700) * 0.01 + (517100 - 258600) * 0.015 + (1034200 - 517100) * 0.02 + (price - 1034200) * 0.025;
        }
        
        return tax;
    }
    
    // Calculate Manitoba Land Transfer Tax
    const calculateManitobaTax = (price: number) => {
        let tax = 0;
        
        if (price <= 30000) {
            tax = 0;
        } else if (price <= 90000) {
            tax = (price - 30000) * 0.005;
        } else if (price <= 150000) {
            tax = (90000 - 30000) * 0.005 + (price - 90000) * 0.01;
        } else if (price <= 200000) {
            tax = (90000 - 30000) * 0.005 + (150000 - 90000) * 0.01 + (price - 150000) * 0.015;
        } else {
            tax = (90000 - 30000) * 0.005 + (150000 - 90000) * 0.01 + (200000 - 150000) * 0.015 + (price - 200000) * 0.02;
        }
        
        return tax;
    }
    
    // Calculate New Brunswick Land Transfer Tax
    const calculateNBTax = (price: number) => {
        // 1% of the assessed value
        return price * 0.01;
    }
    
    // Calculate Nova Scotia Land Transfer Tax
    const calculateNSTax = (price: number) => {
        // Up to 1.5% depending on municipality, using 1.5% for Halifax
        return price * 0.015;
    }
    
    // Calculate PEI Land Transfer Tax
    const calculatePEITax = (price: number) => {
        // 1% of the purchase price or assessed value, whichever is greater
        return price * 0.01;
    }
    
    // Calculate Saskatchewan Land Title Transfer Fee
    const calculateSaskatchewanFee = (price: number) => {
        // 0.3% of property value
        return price * 0.003;
    }
    
    // Calculate land transfer tax and rebate based on province
    const calculateLandTransferTax = (price: number, province: string, isFirstTimeBuyer: boolean) => {
        let tax = 0;
        let rebate = 0;
        
        switch (province) {
            case 'on':
                tax = calculateOntarioLTT(price);
                // Ontario rebate: Full rebate up to $4,000 for first-time buyers
                if (isFirstTimeBuyer) {
                    rebate = Math.min(tax, 4000);
                }
                break;
            case 'bc':
                tax = calculateBCLTT(price);
                // BC rebate: Full rebate up to $8,000 for first-time buyers on properties up to $500,000
                if (isFirstTimeBuyer && price <= 500000) {
                    rebate = Math.min(tax, 8000);
                }
                break;
            case 'ab':
                tax = calculateAlbertaFee(price);
                // Alberta doesn't have land transfer tax, just registration fees
                break;
            case 'qc':
                tax = calculateQuebecLTT(price);
                // No provincial rebate for first-time buyers in Quebec
                break;
            case 'mb':
                tax = calculateManitobaTax(price);
                // No provincial rebate for first-time buyers in Manitoba
                break;
            case 'nb':
                tax = calculateNBTax(price);
                // No provincial rebate for first-time buyers in New Brunswick
                break;
            case 'ns':
                tax = calculateNSTax(price);
                // No provincial rebate for first-time buyers in Nova Scotia
                break;
            case 'pe':
                tax = calculatePEITax(price);
                // PEI rebate: No tax for first-time buyers if property value is below $200,000
                if (isFirstTimeBuyer && price < 200000) {
                    rebate = tax;
                }
                break;
            case 'sk':
                tax = calculateSaskatchewanFee(price);
                // Saskatchewan has no specific rebate
                break;
            default:
                // Default for territories and other provinces: estimate 1% as a placeholder
                tax = price * 0.01;
        }
        
        return { tax, rebate };
    }
    
    // Calculate Toronto land transfer tax and rebate
    const calculateTorontoTax = (price: number, isFirstTimeBuyer: boolean) => {
        const tax = calculateTorontoLTT(price);
        // Toronto rebate: Up to $4,475 for first-time buyers
        const rebate = isFirstTimeBuyer ? Math.min(tax, 4475) : 0;
        
        return { tax, rebate };
    }
    
    // Check if form is valid to enable calculation
    const isFormValid = () => {
        return purchasePrice > 0;
    }

    const calculate = () => {
        // Calculate land transfer tax based on province
        const { tax: landTransferTax, rebate: landTransferTaxRebate } = calculateLandTransferTax(purchasePrice, province, isFirstTimeBuyer);
        
        // Calculate Toronto municipal land transfer tax if applicable
        const { tax: torontoLTT, rebate: torontoLTTRebate } = isInToronto ? calculateTorontoTax(purchasePrice, isFirstTimeBuyer) : { tax: 0, rebate: 0 };
        
        // Calculate down payment percentage
        const downPaymentPercent = purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0;
        
        // Calculate total closing costs (land transfer taxes plus additional fees)
        const totalClosingCosts = landTransferTax - landTransferTaxRebate + 
                                  torontoLTT - torontoLTTRebate +
                                  legalFees + titleInsurance + 
                                  propertyInsurance + appraisalFee + 
                                  mortgageInsurancePST;
        
        setOutputs({
            purchasePrice,
            downPayment,
            downPaymentPercent,
            landTransferTax,
            landTransferTaxRebate,
            torontoLTT,
            torontoLTTRebate,
            legalFees,
            titleInsurance,
            propertyInsurance,
            appraisalFee,
            mortgageInsurancePST,
            totalClosingCosts
        });
    };

    // Show Toronto option only when Ontario is selected
    const showTorontoOption = province === 'on';

    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-0">Closing Cost Calculator</h2>
            <p className="text-center mt-0 text-gray-600">Estimate your closing costs including land transfer taxes</p>
            
            <Input
                type="number"
                placeholder="Listing Price"
                label="Listing Price"
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
                min={0}
                step={0.01}
                max={purchasePrice}
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
                ]}
            />
            
            <Select
                className="w-full"
                label="Province/Territory"
                placeholder="Select Province/Territory"
                value={province}
                onChange={(e) => {
                    setProvince(e.target.value);
                    // Reset Toronto option if another province is selected
                    if (e.target.value !== 'on') {
                        setIsInToronto(false);
                    }
                }}
                required
                isRequired
            >
                {provinces.map((prov) => (
                    <SelectItem key={prov.key}>{prov.label}</SelectItem>
                ))}
            </Select>
            
            <div className="flex flex-col gap-3 w-full">
                <Checkbox
                    isSelected={isFirstTimeBuyer}
                    onValueChange={setIsFirstTimeBuyer}
                >
                    First-Time Home Buyer
                </Checkbox>
                
                {showTorontoOption && (
                    <Checkbox
                        isSelected={isInToronto}
                        onValueChange={setIsInToronto}
                    >
                        Property is located in Toronto
                    </Checkbox>
                )}
            </div>
            
            <div className="w-full border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Additional Closing Costs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="number"
                        placeholder="Real Estate Lawyer"
                        label="Real Estate Lawyer"
                        className="w-full"
                        startContent={
                            <span className="">$</span>
                        }
                        value={legalFees.toString()}
                        onChange={(e) => setLegalFees(Number(e.target.value))}
                        min={0}
                        step={0.01}
                    />
                    
                    <Input
                        type="number"
                        placeholder="Title Insurance"
                        label="Title Insurance"
                        className="w-full"
                        startContent={
                            <span className="">$</span>
                        }
                        value={titleInsurance.toString()}
                        onChange={(e) => setTitleInsurance(Number(e.target.value))}
                        min={0}
                        step={0.01}
                    />
                    
                    <Input
                        type="number"
                        placeholder="Property Insurance"
                        label="Property Insurance"
                        className="w-full"
                        startContent={
                            <span className="">$</span>
                        }
                        value={propertyInsurance.toString()}
                        onChange={(e) => setPropertyInsurance(Number(e.target.value))}
                        min={0}
                        step={0.01}
                    />
                    
                    <Input
                        type="number"
                        placeholder="Appraisal"
                        label="Appraisal"
                        className="w-full"
                        startContent={
                            <span className="">$</span>
                        }
                        value={appraisalFee.toString()}
                        onChange={(e) => setAppraisalFee(Number(e.target.value))}
                        min={0}
                        step={0.01}
                    />
                    
                    <Input
                        type="number"
                        placeholder="Mortgage Insurance (PST)"
                        label="Mortgage Insurance (PST)"
                        className="w-full"
                        startContent={
                            <span className="">$</span>
                        }
                        value={mortgageInsurancePST.toString()}
                        onChange={(e) => setMortgageInsurancePST(Number(e.target.value))}
                        min={0}
                        step={0.01}
                    />
                </div>
            </div>
            
            <Button 
                title='Calculate Closing Costs' 
                color='warning' 
                variant='shadow' 
                className="w-full" 
                onPress={calculate} 
                isDisabled={!isFormValid()}
            >
                Calculate Closing Costs
            </Button>

            {outputs && (
                <div className="w-full p-8 border-0 shadow-sm rounded-lg mt-8">
                    <h3 className="text-2xl font-bold mb-6 tracking-tight">Closing Cost Summary</h3>
                    <div className="grid grid-cols-1 gap-y-6">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Listing Price</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.purchasePrice)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Down Payment</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.downPayment)} ({percentFormatter.format(outputs.downPaymentPercent / 100)})</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Provincial Land Transfer Tax</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.landTransferTax)}</span>
                        </div>
                        
                        {outputs.landTransferTaxRebate > 0 && (
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-md">Provincial Tax Rebate (First-Time Buyer)</span>
                                <span className="text-lg font-medium text-green-600">- {currencyFormatter.format(outputs.landTransferTaxRebate)}</span>
                            </div>
                        )}
                        
                        {isInToronto && (
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-md">Toronto Municipal Land Transfer Tax</span>
                                <span className="text-lg font-medium">{currencyFormatter.format(outputs.torontoLTT)}</span>
                            </div>
                        )}
                        
                        {isInToronto && outputs.torontoLTTRebate > 0 && (
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-md">Toronto Tax Rebate (First-Time Buyer)</span>
                                <span className="text-lg font-medium text-green-600">- {currencyFormatter.format(outputs.torontoLTTRebate)}</span>
                            </div>
                        )}
                        
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Real Estate Lawyer</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.legalFees)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Title Insurance</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.titleInsurance)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Property Insurance</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.propertyInsurance)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Appraisal</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.appraisalFee)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-md">Mortgage Insurance (PST)</span>
                            <span className="text-lg font-medium">{currencyFormatter.format(outputs.mortgageInsurancePST)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-lg font-bold">Total Closing Costs</span>
                            <span className="text-2xl font-bold text-amber-500">{currencyFormatter.format(outputs.totalClosingCosts)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ClosingCostCalculatorComp