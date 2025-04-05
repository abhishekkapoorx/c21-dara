import React from 'react';
import { Heading } from '../TextComps';
import { Button, Input, Select, SelectItem, Textarea, addToast } from '@heroui/react';
import { FormikSubmitProps, propertyTypes } from './HomeBuyers';
import { Formik, Form as FormikForm, FormikFormProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

interface HomeEvaluationFormValues {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  bedrooms: string | number;
  bathrooms: string | number;
  squareFeet: string | number;
  yearBuilt: string | number;
  additionalInfo: string;
}

const HomeEvaluation = () => {
  const initialValues: HomeEvaluationFormValues = {
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    additionalInfo: ''
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits').max(11, 'Phone number must be at most 11 digits'),
    propertyAddress: Yup.string().required('Property address is required'),
    propertyType: Yup.string().required('Property type is required'),
    bedrooms: Yup.number().min(0, 'Bedrooms must be at least 0').required('Bedrooms are required'),
    bathrooms: Yup.number().min(0, 'Bathrooms must be at least 0').required('Bathrooms are required'),
    squareFeet: Yup.number().min(0, 'Square feet must be at least 0').required('Square feet are required'),
    yearBuilt: Yup.number().min(1800, 'Year built must be after 1800').max(new Date().getFullYear(), `Year built cannot be in the future`).required('Year built is required'),
    additionalInfo: Yup.string()
  });

  const handleSubmit = async (
    values: HomeEvaluationFormValues,
    { resetForm, setSubmitting }: FormikSubmitProps
  ) => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'homeEvaluations'), {
        ...values,
        createdAt: new Date()
      });
      
      resetForm();
      
      // Show success toast
      addToast({
        title: "Success",
        description: "Your home evaluation request has been submitted.",
        color: "success"
      });
    } catch (error) {
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

            <Input
              type="text"
              placeholder="123 Main Street, City, State, ZIP"
              name="propertyAddress"
              label="Property Address"
              value={values.propertyAddress}
              onChange={handleChange}
              errorMessage={errors.propertyAddress ? errors.propertyAddress : undefined}
              isInvalid={errors.propertyAddress != undefined}
            />

            <Select
              name="propertyType"
              label="Property Type"
              value={values.propertyType}
              onChange={handleChange}
              errorMessage={errors.propertyType ? errors.propertyType : undefined}
              isInvalid={errors.propertyType != undefined}
            >
              {propertyTypes.map((type) => (
                <SelectItem key={type.key} >{type.label}</SelectItem>
              ))}
            </Select>

            <div className="grid grid-cols-3 gap-4 w-full">
              <Input
                type="number"
                placeholder="Bedrooms"
                name="bedrooms"
                label="Bedrooms"
                value={String(values.bedrooms)}
                onChange={handleChange}
                errorMessage={errors.bedrooms ? errors.bedrooms : undefined}
                isInvalid={errors.bedrooms != undefined}
              />

              <Input
                type="number"
                placeholder="Bathrooms"
                name="bathrooms"
                label="Bathrooms"
                value={String(values.bathrooms)}
                onChange={handleChange}
                errorMessage={errors.bathrooms ? errors.bathrooms : undefined}
                isInvalid={errors.bathrooms != undefined}
              />

              <Input
                type="number"
                placeholder="Square Feet"
                name="squareFeet"
                label="Square Feet"
                value={String(values.squareFeet)}
                onChange={handleChange}
                errorMessage={errors.squareFeet ? errors.squareFeet : undefined}
                isInvalid={errors.squareFeet != undefined}
              />
            </div>

            <Input
              type="number"
              placeholder="Year Built"
              name="yearBuilt"
              label="Year Built"
              value={String(values.yearBuilt)}
              onChange={handleChange}
              errorMessage={errors.yearBuilt ? errors.yearBuilt : undefined}
              isInvalid={errors.yearBuilt != undefined}
            />

            <Textarea
              name="additionalInfo"
              label="Additional Information"
              placeholder="Tell us more about your property, recent upgrades, special features, etc..."
              value={values.additionalInfo}
              onChange={handleChange}
              errorMessage={errors.additionalInfo ? errors.additionalInfo : undefined}
              isInvalid={errors.additionalInfo != undefined}
            />

            <Button
              type="submit"
              color="warning"
              variant="solid"
              isDisabled={!isValid}
              isLoading={isSubmitting}
            >
              Request Evaluation
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default HomeEvaluation;