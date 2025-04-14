import { Button, Input, Select, SelectItem, Textarea, addToast } from '@heroui/react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { timeframes } from './HomeBuyers';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { sendRealEstateFormEmail } from '@/actions/SendRealEstateFormEmail';

interface HomeSellerFormValues {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  bedrooms: string | number;
  bathrooms: string | number;
  squareFeet: string | number;
  timeframe: string;
  additionalInfo: string;
}

interface FormikSubmitProps {
  resetForm: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

const HomeSeller = () => {
  const initialValues: HomeSellerFormValues = {
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    timeframe: '',
    additionalInfo: ''
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be at most 10 digits'),
    propertyAddress: Yup.string().required('Property address is required'),
    bedrooms: Yup.number().min(0, 'Bedrooms must be at least 0').required('Bedrooms are required'),
    bathrooms: Yup.number().min(0, 'Bathrooms must be at least 0').required('Bathrooms are required'),
    squareFeet: Yup.number().min(0, 'Square feet must be at least 0').required('Square feet are required'),
    timeframe: Yup.string().required('Timeframe is required'),
    additionalInfo: Yup.string()
  });

  const handleSubmit = async (
    values: HomeSellerFormValues, 
    { resetForm, setSubmitting }: FormikSubmitProps
  ) => {
    setSubmitting(true);
    try {
      // Add data to Firestore
      const docRef = await addDoc(collection(db, 'homeSellers'), {
        ...values,
        createdAt: new Date()
      });
      
      // Send email with form data
      await sendRealEstateFormEmail({
        formType: 'homeSeller',
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        propertyAddress: values.propertyAddress,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        squareFeet: values.squareFeet,
        timeframe: timeframes.find(time => time.key === values.timeframe)?.label || values.timeframe,
        additionalInfo: values.additionalInfo,
        createdAt: new Date()
      });
      
      resetForm();
      
      // Show success toast
      addToast({
        title: "Success",
        description: "Your home selling consultation request has been submitted.",
        color: "success",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error toast
      addToast({
        title: "Error",
        description: "Failed to submit your request. Please try again later.",
        color: "danger"
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

            <Select
              name="timeframe"
              label="When do you plan to sell?"
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
              placeholder="Tell us more about your property and selling goals..."
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
              Submit Request
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default HomeSeller;