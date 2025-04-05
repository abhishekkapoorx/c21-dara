import { Button, Hr, Link, Section, Text } from "@react-email/components";
import BaseEmailTemplate from "./BaseEmailTemplate";

// Common interface properties shared by all form types
interface CommonFormProps {
  fullName: string;
  email: string;
  phone: string;
  additionalInfo: string;
  createdAt: Date;
}

// Home Buyer form specific properties
interface HomeBuyerProps extends CommonFormProps {
  formType: 'homeBuyer';
  budgetRange: string;
  propertyType: string;
  timeframe: string;
}

// Home Seller form specific properties
interface HomeSellerProps extends CommonFormProps {
  formType: 'homeSeller';
  propertyAddress: string;
  bedrooms: number | string;
  bathrooms: number | string;
  squareFeet: number | string;
  timeframe: string;
}

// Home Evaluation form specific properties
interface HomeEvaluationProps extends CommonFormProps {
  formType: 'homeEvaluation';
  propertyAddress: string;
  propertyType: string;
  bedrooms: number | string;
  bathrooms: number | string;
  squareFeet: number | string;
  yearBuilt: number | string;
}

// Union type to accept any of the three form types
export type RealEstateFormProps = HomeBuyerProps | HomeSellerProps | HomeEvaluationProps;

export function RealEstateFormTemplate(props: RealEstateFormProps) {
  const { fullName, email, phone, additionalInfo, formType, createdAt } = props;
  
  // Format the date
//   const submissionDate = format(new Date(createdAt), 'MMMM d, yyyy');
  
  // Determine form type title and subject
  let formTitle = "";
  let formSubject = "";
  
  switch (formType) {
    case 'homeBuyer':
      formTitle = "Home Buyer Consultation Request";
      formSubject = `New Home Buyer Request from ${fullName}`;
      break;
    case 'homeSeller':
      formTitle = "Home Seller Consultation Request";
      formSubject = `New Home Seller Request from ${fullName}`;
      break;
    case 'homeEvaluation':
      formTitle = "Home Evaluation Request";
      formSubject = `New Property Evaluation Request from ${fullName}`;
      break;
  }

  return (
    <BaseEmailTemplate title={formSubject} preview={`${formSubject} | Century 21`}>
      <Section className="px-[32px] py-[20px]">
        <Text className="text-2xl font-bold text-white">{formTitle}</Text>
        {/* <Text className="text-gray-400">Submitted on {submissionDate}</Text> */}
        <Hr className="border-gray-600 my-[16px]" />
        
        {/* Common contact information section */}
        <Text className="text-xl font-semibold text-white mt-[20px]">Contact Information</Text>
        <Text className="text-lg">Name: {fullName}</Text>
        <Text className="text-lg">Email: <Link href={`mailto:${email}`} className="text-amber-400">{email}</Link></Text>
        <Text className="text-lg">Phone: {phone}</Text>
        
        {/* Form-specific data */}
        <Text className="text-xl font-semibold text-white mt-[20px]">Request Details</Text>
        
        {formType === 'homeBuyer' && (
          <>
            <Text className="text-lg">Budget Range: {(props as HomeBuyerProps).budgetRange}</Text>
            <Text className="text-lg">Property Type: {(props as HomeBuyerProps).propertyType}</Text>
            <Text className="text-lg">Timeframe: {(props as HomeBuyerProps).timeframe}</Text>
          </>
        )}
        
        {formType === 'homeSeller' && (
          <>
            <Text className="text-lg">Property Address: {(props as HomeSellerProps).propertyAddress}</Text>
            <Text className="text-lg">Property Details: {(props as HomeSellerProps).bedrooms} bedrooms, {(props as HomeSellerProps).bathrooms} bathrooms, {(props as HomeSellerProps).squareFeet} sq ft</Text>
            <Text className="text-lg">Selling Timeframe: {(props as HomeSellerProps).timeframe}</Text>
          </>
        )}
        
        {formType === 'homeEvaluation' && (
          <>
            <Text className="text-lg">Property Address: {(props as HomeEvaluationProps).propertyAddress}</Text>
            <Text className="text-lg">Property Type: {(props as HomeEvaluationProps).propertyType}</Text>
            <Text className="text-lg">Property Details: {(props as HomeEvaluationProps).bedrooms} bedrooms, {(props as HomeEvaluationProps).bathrooms} bathrooms, {(props as HomeEvaluationProps).squareFeet} sq ft</Text>
            <Text className="text-lg">Year Built: {(props as HomeEvaluationProps).yearBuilt}</Text>
          </>
        )}
        
        {/* Additional information */}
        {additionalInfo && (
          <>
            <Text className="text-xl font-semibold text-white mt-[20px]">Additional Information</Text>
            <Text className="text-lg">{additionalInfo}</Text>
          </>
        )}
        
        {/* Call to action */}
        <Section className="mt-[32px] text-center">
          <Button
            href={`mailto:${email}`}
            className="bg-amber-500 text-black font-bold py-[12px] px-[20px] rounded no-underline text-center"
          >
            Reply to {fullName}
          </Button>
        </Section>
      </Section>
      
      <Section className="px-[32px] py-[20px] bg-gray-900">
        <Text className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Dara Dream Realty. All rights reserved.
        </Text>
      </Section>
    </BaseEmailTemplate>
  );
}

export default RealEstateFormTemplate;