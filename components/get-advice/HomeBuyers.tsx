import React, { useState } from 'react'
import { Heading } from '../TextComps'
import { Button, Input, Select, SelectItem, Textarea } from '@heroui/react'

const budgetRanges = [
  { key: 'Under 500000', label: 'Under $500,000' },
  { key: '500-1000000', label: '$500,000 - $1,000,000' },
  { key: '1000000-2000000', label: '$1,000,000 - $2,000,000' },
  { key: '2000000+', label: '2,000,000+' },
]

const propertyTypes = [
  { key: 'condo', label: 'Condo' },
  { key: 'condo-townhouse', label: 'Condo Townhouse' },
  { key: 'townhouse', label: 'Townhouse' },
  { key: 'semi-detached', label: 'Semi-detached' },
  { key: 'detached', label: 'Detached' },
  { key: 'bungalow', label: 'Bungalow' },
]

const timeframes = [
  { key: 'immediate', label: 'Immediately' },
  { key: '1-3months', label: '1-3 months' },
  { key: '3-6months', label: '3-6 months' },
  { key: '6month+', label: '6 months+' },
]

const HomeBuyers = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [budgetRange, setBudgetRange] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [timeframe, setTimeframe] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = () => {
        // Here you would typically send the form data to your backend
        console.log({
            fullName,
            email,
            phone,
            budgetRange,
            propertyType,
            timeframe,
            additionalInfo
        })
        
        // Show success message
        setIsSubmitted(true)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            {/* <Heading title='Home Buyers Consultations'/> */}
            
            {!isSubmitted ? (
                <>
                    <Input
                        type="text"
                        placeholder="Your Full Name"
                        label="Full Name"
                        className="w-full"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        isRequired
                    />
                    
                    <Input
                        type="email"
                        placeholder="your.email@example.com"
                        label="Email Address"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        isRequired
                    />
                    
                    <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        label="Phone Number"
                        className="w-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        isRequired
                    />
                    
                    <Select
                        className="w-full"
                        label="Budget Range"
                        placeholder="Select Your Budget Range"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        required
                        isRequired
                    >
                        {budgetRanges.map((range) => (
                            <SelectItem key={range.key}>{range.label}</SelectItem>
                        ))}
                    </Select>
                    
                    <Select
                        className="w-full"
                        label="Property Type"
                        placeholder="Select Property Type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        required
                        isRequired
                    >
                        {propertyTypes.map((type) => (
                            <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                    </Select>
                    
                    <Select
                        className="w-full"
                        label="When do you plan to buy?"
                        placeholder="Select Timeframe"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        required
                        isRequired
                    >
                        {timeframes.map((time) => (
                            <SelectItem key={time.key}>{time.label}</SelectItem>
                        ))}
                    </Select>
                    
                    <Textarea
                        label="Additional Information"
                        placeholder="Tell us more about what you're looking for..."
                        className="w-full"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                    
                    <Button 
                        title='Submit Request' 
                        color='warning' 
                        variant='shadow' 
                        className="w-full" 
                        onPress={handleSubmit}
                    >
                        Submit Request
                    </Button>
                </>
            ) : (
                <div className="w-full p-8 border-0 shadow-sm rounded-lg mt-8 text-center">
                    <h3 className="text-2xl font-bold mb-6 tracking-tight">Thank You!</h3>
                    <p className="text-lg mb-4">Your home buyer consultation request has been submitted.</p>
                    <p>A real estate professional will contact you shortly to discuss your home buying needs.</p>
                    <Button
                        title='Submit Another Request'
                        color='warning'
                        variant='light'
                        className="mt-8"
                        onPress={() => {
                            setFullName('')
                            setEmail('')
                            setPhone('')
                            setBudgetRange('')
                            setPropertyType('')
                            setTimeframe('')
                            setAdditionalInfo('')
                            setIsSubmitted(false)
                        }}
                    >
                        Submit Another Request
                    </Button>
                </div>
            )}
        </div>
    )
}

export default HomeBuyers