import React, { useState } from 'react'
import { Heading } from '../TextComps'
import { Button, Input, Select, SelectItem, Textarea } from '@heroui/react'
import { propertyTypes } from './HomeBuyers'

const HomeEvaluation = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [propertyAddress, setPropertyAddress] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [squareFeet, setSquareFeet] = useState('')
  const [yearBuilt, setYearBuilt] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log({
      fullName,
      email,
      phone,
      propertyAddress,
      propertyType,
      bedrooms,
      bathrooms,
      squareFeet,
      yearBuilt,
      additionalInfo
    })

    // Show success message
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
      {/* <Heading title='Home Evaluation Request'/> */}

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

          <div className="w-full">
            <div className="block text-sm font-medium mb-2">Property Details</div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Bedrooms"
                aria-label="Bedrooms"
                className="w-full"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                min={0}
                required
                isRequired
              />

              <Input
                type="number"
                placeholder="Bathrooms"
                aria-label="Bathrooms"
                className="w-full"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                min={0}
                required
                isRequired
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
                required
                isRequired
              />
            </div>
          </div>

          <Input
            type="number"
            placeholder="Year Built"
            label="Year Built"
            className="w-full"
            value={Number(yearBuilt) < 1800 || Number(yearBuilt) > new Date().getFullYear() ? new Date().getFullYear().toString() : yearBuilt}
            onChange={(e) => setYearBuilt(e.target.value === '' ? '' : Math.min(new Date().getFullYear(), parseInt(e.target.value) || 0).toString())}
            min={1800}
            max={new Date().getFullYear()}
            required
            isRequired
          />

          <Textarea
            label="Additional Information"
            placeholder="Tell us more about your property, recent upgrades, special features, etc..."
            className="w-full"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />

          <Button
            title='Request Evaluation'
            color='warning'
            variant='solid'
            className="w-full"
            onPress={handleSubmit}
          >
            Request Evaluation
          </Button>
        </>
      ) : (
        <div className="w-full p-8 border-0 shadow-sm rounded-lg mt-8 text-center">
          <h3 className="text-2xl font-bold mb-6 tracking-tight">Thank You!</h3>
          <p className="text-lg mb-4">Your home evaluation request has been submitted.</p>
          <p>A real estate professional will contact you shortly to discuss your property&apos;s market value.</p>
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
              setPropertyType('')
              setBedrooms('')
              setBathrooms('')
              setSquareFeet('')
              setYearBuilt('')
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

export default HomeEvaluation