"use client"
import NewsLetterSignUp from '@/actions/NewsLetterSignUpAction'
import { Heading } from '@/components/TextComps'
import { addToast, Button, Checkbox, Form, Input } from '@heroui/react'
import { useActionState, useEffect } from 'react'
import { useFormState } from 'react-dom'

const NeweletterPage = () => {
    
    const [state, formAction, isPending] = useFormState(NewsLetterSignUp, null)
    useEffect(() => {
        if (state && state.success) {
            console.log("Success")
            addToast({
                title: "Thank You for Subscribing",
                description: state.message,
                color: "success",
            })
        } else if (state && !state.success) {
            console.log("Error")
            addToast({
                title: "Failed to Subscribe",
                description: state.message,
                color: "danger",
            })
        }
    }, [state])
    
    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <Heading title='Subscribe Newsletter' />

            <div className="flex md:flex-row flex-col items-center justify-center gap-4 max-w-2xl w-full">
                <h2 className="text-lg font-light md:text-xl text-warning text-center md:text-left">Stay Updated with Real Estate Insights</h2>
                <p className="text-base md:text-md text-center md:text-left">Subscribe to our newsletter for the latest market trends, tips, and exclusive property listings.</p>
            </div>

            <Form action={formAction} className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
                <Input
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    label="Full Name"
                    className="w-full"
                    required
                    isRequired
                />
                <Input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    label="Email Address"
                    className="w-full"
                    required
                    isRequired
                />
                <Input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    label="Phone Number"
                    className="w-full"
                    required
                    isRequired
                />
                <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Checkbox
                        type="checkbox"
                        className="w-full"
                        defaultSelected={true}
                        name='marketUpdates'
                        color={"warning"}
                    >Market Updates</Checkbox>
                    <Checkbox
                        type="checkbox"
                        className="w-full"
                        defaultSelected={true}
                        name='propertyListings'
                        color={"warning"}
                    >Property Listings</Checkbox>
                    <Checkbox
                        type="checkbox"
                        className="w-full"
                        name='tipsAdvice'
                        defaultSelected={true}
                        color={"warning"}
                    >Tips & Advice</Checkbox>
                </div>
                


                <Button color='warning' variant='shadow' type='submit' isDisabled={isPending} isLoading={isPending}>Subscribe</Button>
            </Form>


        </div>
    )
}

export default NeweletterPage