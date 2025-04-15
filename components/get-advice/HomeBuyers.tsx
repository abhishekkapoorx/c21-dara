import React from 'react';
import { Heading } from '../TextComps';
import { Button, Input, Select, SelectItem, Textarea, addToast } from '@heroui/react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { sendRealEstateFormEmail } from '@/actions/SendRealEstateFormEmail';

export const budgetRanges = [
    { key: 'Under 500000', label: 'Under $500,000' },
    { key: '500-1000000', label: '$500,000 - $1,000,000' },
    { key: '1000000-2000000', label: '$1,000,000 - $2,000,000' },
    { key: '2000000+', label: '2,000,000+' },
];

export const propertyTypes = [
    { key: 'condo', label: 'Condo' },
    { key: 'condo-townhouse', label: 'Condo Townhouse' },
    { key: 'townhouse', label: 'Townhouse' },
    { key: 'semi-detached', label: 'Semi-detached' },
    { key: 'detached', label: 'Detached' },
    { key: 'bungalow', label: 'Bungalow' },
];

export const timeframes = [
    { key: 'immediate', label: 'Immediately' },
    { key: '1-3months', label: '1-3 months' },
    { key: '3-6months', label: '3-6 months' },
    { key: '6month+', label: '6 months+' },
];

export const provinces = [
    { key: 'AB', label: 'Alberta' },
    { key: 'BC', label: 'British Columbia' },
    { key: 'MB', label: 'Manitoba' },
    { key: 'NB', label: 'New Brunswick' },
    { key: 'NL', label: 'Newfoundland and Labrador' },
    { key: 'NS', label: 'Nova Scotia' },
    { key: 'NT', label: 'Northwest Territories' },
    { key: 'NU', label: 'Nunavut' },
    { key: 'ON', label: 'Ontario' },
    { key: 'PE', label: 'Prince Edward Island' },
    { key: 'QC', label: 'Quebec' },
    { key: 'SK', label: 'Saskatchewan' },
    { key: 'YT', label: 'Yukon' },
];

interface HomeBuyerFormValues {
    fullName: string;
    email: string;
    phone: string;
    budgetRange: string;
    propertyType: string;
    timeframe: string;
    additionalInfo: string;
}

export interface FormikSubmitProps {
    resetForm: () => void;
    setSubmitting: (isSubmitting: boolean) => void;
}

const HomeBuyers = () => {
    const initialValues = {
        fullName: '',
        email: '',
        phone: '',
        budgetRange: '',
        propertyType: '',
        timeframe: '',
        additionalInfo: ''
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required').min(2, 'Full name must be at least 2 characters').max(50, 'Full name must be at most 50 characters'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be at most 10 digits'),
        budgetRange: Yup.string().required('Budget range is required'),
        propertyType: Yup.string().required('Property type is required'),
        timeframe: Yup.string().required('Timeframe is required'),
        additionalInfo: Yup.string()
    });

    const handleSubmit = async (
        values: HomeBuyerFormValues,
        { resetForm, setSubmitting }: FormikSubmitProps
    ): Promise<void> => {
        setSubmitting(true);
        try {
            // Add data to Firestore
            const response = await fetch(`https://open.kickbox.com/v1/disposable/${values.email}`);
            const { disposable } = await response.json();
            if (disposable) {
                addToast({
                    title: "Invalid email",
                    description: "Please use a valid email address.",
                    color: "danger"
                });
                setSubmitting(false);
                return;
            }
            
            const docRef = await addDoc(collection(db, 'homeBuyers'), {
                ...values,
                createdAt: new Date()
            });


            // Send email with form data
            await sendRealEstateFormEmail({
                formType: 'homeBuyer',
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                budgetRange: budgetRanges.find(range => range.key === values.budgetRange)?.label || values.budgetRange,
                propertyType: propertyTypes.find(type => type.key === values.propertyType)?.label || values.propertyType,
                timeframe: timeframes.find(time => time.key === values.timeframe)?.label || values.timeframe,
                additionalInfo: values.additionalInfo,
                createdAt: new Date()
            });

            resetForm();

            // Show success toast
            addToast({
                title: "Success",
                description: "Your home buyer consultation request has been submitted.",
                color: "success",
            });
        } catch (error: unknown) {
            console.error('Error submitting form:', error);

            // Show error toast
            addToast({
                title: "Error",
                description: "Failed to submit your request. Please try again later.",
                color: "danger",
            });
        }
        setSubmitting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, isSubmitting, isValid }) => (
                    <FormikForm className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
                        <Input
                            type="text"
                            placeholder="Your Full Name"
                            name="fullName"
                            label="Full Name"
                            value={values.fullName}
                            onChange={handleChange}
                            errorMessage={errors.fullName ? errors.fullName : undefined}
                            isInvalid={errors.fullName != undefined}
                        />

                        <Input
                            type="email"
                            placeholder="your.email@example.com"
                            name="email"
                            label="Email Address"
                            value={values.email}
                            onChange={handleChange}
                            errorMessage={errors.email ? errors.email : undefined}
                            isInvalid={errors.email != undefined}
                        />

                        <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            name="phone"
                            label="Phone Number"
                            value={values.phone}
                            onChange={handleChange}
                            errorMessage={errors.phone ? errors.phone : undefined}
                            isInvalid={errors.phone != undefined}
                        />

                        <Select
                            name="budgetRange"
                            label="Budget Range"
                            placeholder="Select Your Budget Range"
                            value={values.budgetRange}
                            onChange={handleChange}
                            errorMessage={errors.budgetRange ? errors.budgetRange : undefined}
                            isInvalid={errors.budgetRange != undefined}
                        >
                            {budgetRanges.map((range) => (
                                <SelectItem key={range.key}>{range.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            name="propertyType"
                            label="Property Type"
                            placeholder="Select Property Type"
                            value={values.propertyType}
                            onChange={handleChange}
                            errorMessage={errors.propertyType ? errors.propertyType : undefined}
                            isInvalid={errors.propertyType != undefined}
                        >
                            {propertyTypes.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            name="timeframe"
                            label="When do you plan to buy?"
                            placeholder="Select Timeframe"
                            value={values.timeframe}
                            onChange={handleChange}
                            errorMessage={errors.timeframe ? errors.timeframe : undefined}
                            isInvalid={errors.timeframe != undefined}
                        >
                            {timeframes.map((time) => (
                                <SelectItem key={time.key}>{time.label}</SelectItem>
                            ))}
                        </Select>

                        <Textarea
                            name="additionalInfo"
                            label="Additional Information"
                            placeholder="Tell us more about what you're looking for..."
                            value={values.additionalInfo}
                            onChange={handleChange}
                            errorMessage={errors.additionalInfo ? errors.additionalInfo : undefined}
                            isInvalid={errors.additionalInfo != undefined}
                        />

                        <Button
                            color="warning"
                            variant="solid"
                            type="submit"
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                        >
                            Submit Request
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default HomeBuyers;