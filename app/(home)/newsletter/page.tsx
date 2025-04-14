"use client"
import { Heading } from '@/components/TextComps'
import { addToast, Button, Checkbox, Input } from '@heroui/react'
import { Formik, Form as FormikForm } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'

import SendNewsletterEmail from '@/actions/SendNewsletterEmail'
import { db } from "@/firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { IconBulbFilled, IconGraph, IconHome, IconTrendingUp, IconTrendingUp2, IconTrendingUp3 } from '@tabler/icons-react'

interface NewsletterFormData {
    fullName: string;
    email: string;
    phone: string;
    marketUpdates: boolean;
    propertyListings: boolean;
    tipsAdvice: boolean;
    privacyPolicy: boolean;
}

// Newsletter validation schema
const NewsletterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required').min(2, 'Full name must be at least 2 characters').max(50, 'Full name must be at most 50 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be at most 10 digits'),
    marketUpdates: Yup.boolean(),
    propertyListings: Yup.boolean(),
    tipsAdvice: Yup.boolean(),
    privacyPolicy: Yup.boolean().oneOf([true], 'You must accept the privacy policy')
});

const NeweletterPage = () => {
    const initialValues: NewsletterFormData = {
        fullName: '',
        email: '',
        phone: '',
        marketUpdates: true,
        propertyListings: true,
        tipsAdvice: true,
        privacyPolicy: true
    };

    const handleSubmit = async (values: NewsletterFormData, { resetForm, setSubmitting }: any) => {
        setSubmitting(true);

        try {
            // check if user is already subscribed
            const usersRef = collection(db, "newsletter");
            const q = query(usersRef, where("email", "==", values.email));

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                console.log("User Already Subscribed");
                addToast({
                    title: "User Already Subscribed",
                    description: "You are already subscribed to the newsletter",
                    color: "warning",
                });
                setSubmitting(false);
                return;
            }

            await addDoc(collection(db, "newsletter"), {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                marketUpdates: values.marketUpdates,
                propertyListings: values.propertyListings,
                tipsAdvice: values.tipsAdvice
            });

            await SendNewsletterEmail(values);

            addToast({
                title: "Thank You for Subscribing",
                description: "Newsletter Subscription Successful",
                color: "success",
            });

            resetForm();
        } catch (error) {
            console.log("Error Subscribing to Newsletter: ", error);
            addToast({
                title: "Failed to Subscribe",
                description: "Error Subscribing to Newsletter",
                color: "danger",
            });
        }

        setSubmitting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full mb-12 px-4 max-w-screen-2xl">
            <Heading title='Subscribe Newsletter' />

            <div className="flex md:flex-row flex-col items-center justify-center gap-4 max-w-2xl w-full">
                <h2 className="text-lg font-light md:text-xl text-amber-500 text-center md:text-left">Stay Updated with Real Estate Insights</h2>
                <p className="text-base md:text-md text-center md:text-left">Subscribe to our newsletter for the latest market trends, tips, and exclusive property listings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full place-content-center my-8">
                <div className="flex flex-col items-center justify-center gap-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="text-amber-500 text-4xl mb-2 w-16 h-16">
                            <IconTrendingUp className='w-full h-full'></IconTrendingUp>
                        </div>
                        <h3 className="text-amber-500 text-lg md:text-2xl">Market Updates</h3>
                        <p className="text-base text-gray-300">Get the latest real estate market trends and insights.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="text-amber-500 text-4xl mb-2 w-16 h-16">
                            <IconHome className='w-full h-full'></IconHome>
                        </div>
                        <h3 className="text-amber-500 text-lg md:text-2xl">Exclusive Listings</h3>
                        <p className="text-base text-gray-300">Be the first to know about new property listings.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="text-amber-500 text-4xl mb-2 w-16 h-16">
                            <IconBulbFilled className='w-full h-full'></IconBulbFilled>
                        </div>
                        <h3 className="text-amber-500 text-lg md:text-2xl">Tips & Advice</h3>
                        <p className="text-base text-gray-300">Receive valuable tips for buying and selling properties.</p>
                    </div>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={NewsletterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched, isValid, values, setValues, handleChange }) => (
                        <FormikForm className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full mx-auto">
                            <div className="w-full">
                                <Input
                                    type="text"
                                    placeholder="Full Name"
                                    name="fullName"
                                    label="Full Name"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    errorMessage={errors.fullName ? errors.fullName : undefined}
                                    isInvalid={errors.fullName != undefined}
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    label="Email Address"
                                    value={values.email}
                                    onChange={handleChange}
                                    errorMessage={errors.email ? errors.email : undefined}
                                    isInvalid={errors.email != undefined}
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    type="tel"
                                    placeholder="Phone Number"
                                    name="phone"
                                    label="Phone Number"
                                    value={values.phone}
                                    onChange={handleChange}
                                    errorMessage={errors.phone ? errors.phone : undefined}
                                    isInvalid={errors.phone != undefined}
                                />
                            </div>

                            <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <Checkbox
                                    type="checkbox"
                                    className="w-full"
                                    name="marketUpdates"
                                    color="warning"
                                    isSelected={values.marketUpdates}
                                    onChange={handleChange}
                                    isInvalid={errors.marketUpdates != undefined}
                                >Market Updates</Checkbox>
                                <Checkbox
                                    type="checkbox"
                                    className="w-full"
                                    name="propertyListings"
                                    color="warning"
                                    isSelected={values.propertyListings}
                                    onChange={handleChange}
                                    isInvalid={errors.propertyListings != undefined}
                                >Property Listings</Checkbox>
                                <Checkbox
                                    type="checkbox"
                                    className="w-full"
                                    name="tipsAdvice"
                                    color="warning"
                                    isSelected={values.tipsAdvice}
                                    onChange={handleChange}
                                    isInvalid={errors.tipsAdvice != undefined}
                                >Tips & Advice</Checkbox>
                            </div>

                            <div className="w-full">
                                <div className="flex flex-row items-center justify-start gap-2">
                                    <Checkbox
                                        type="checkbox"
                                        className="w-full"
                                        name="privacyPolicy"
                                        color="warning"
                                        isSelected={values.privacyPolicy}
                                        onChange={handleChange}
                                        isInvalid={errors.privacyPolicy != undefined}
                                    >
                                        I agree to receive emails and accept the&nbsp;
                                    </Checkbox>
                                    <Link href={"/privacy-policy"} target='_blank' className='text-amber-500'>Privacy Policy</Link>

                                </div>
                                {errors.privacyPolicy &&
                                    <div className="text-danger text-sm mt-1">{errors.privacyPolicy}</div>
                                }
                            </div>

                            <Button fullWidth color='warning' variant='solid' type='submit' isDisabled={!isValid} isLoading={isSubmitting}>
                                Subscribe
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
            </div>


        </div>
    )
}

export default NeweletterPage