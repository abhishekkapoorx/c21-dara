import React, { useState } from 'react'
import { Heading } from '../TextComps'
import { Button, Input, Select, SelectItem, Textarea } from '@heroui/react'
import { timeframes } from './HomeBuyers'


const HomeSeller = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [propertyAddress, setPropertyAddress] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [squareFeet, setSquareFeet] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log({
      fullName,
      email,
      phone,
      propertyAddress,
      bedrooms,
      bathrooms,
      squareFeet,
      timeframe,
      additionalInfo
    })
    
    // Show success message
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
      {/* <Heading title='Home Seller Consultations'/> */}
      
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
          
          <Input
            type="text"
            placeholder="123 Main Street, City, State, ZIP"
            label="Property Address"
            className="w-full"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            required
            isRequired
          />
          
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Property Details</label>
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Bedrooms"
                aria-label="Bedrooms"
                className="w-full"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                min={0}
              />
              
              <Input
                type="number"
                placeholder="Bathrooms"
                aria-label="Bathrooms"
                className="w-full"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                min={0}
              />
              
              <Input
                type="number"
                placeholder="Square Feet"
                aria-label="Square Feet"
                className="w-full"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
                min={0}
                step={0.01}
              />
            </div>
          </div>
          
          <Select
            className="w-full"
            label="When do you plan to sell?"
            placeholder="Select Timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {timeframes.map((time) => (
              <SelectItem key={time.key}>{time.label}</SelectItem>
            ))}
          </Select>
          
          <Textarea
            label="Additional Information"
            placeholder="Tell us more about your property and selling goals..."
            className="w-full"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
          
          <Button 
            title='Submit Request' 
            color='warning' 
            variant='solid' 
            className="w-full" 
            onPress={handleSubmit}
          >
            Submit Request
          </Button>
        </>
      ) : (
        <div className="w-full p-8 border-0 shadow-sm rounded-lg mt-8 text-center">
          <h3 className="text-2xl font-bold mb-6 tracking-tight">Thank You!</h3>
          <p className="text-lg mb-4">Your home selling consultation request has been submitted.</p>
          <p>A real estate professional will contact you shortly to discuss your property and selling strategy.</p>
          <Button
            title='Submit Another Request'
            color='warning'
            variant='light'
            className="mt-8"
            onPress={() => {
              setFullName('')
              setEmail('')
              setPhone('')
              setPropertyAddress('')
              setBedrooms('')
              setBathrooms('')
              setSquareFeet('')
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

export default HomeSeller