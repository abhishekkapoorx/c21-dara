# Dara Dream Realty - Century 21

A modern web application built for Century 21 real estate agents and their clients. This platform offers various real estate calculators, informational resources, and client management tools.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Firebase Setup](#firebase-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Calculators](#available-calculators)
- [Customization](#customization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Real Estate Calculators**:
  - Mortgage Calculator with principal/interest breakdown
  - Closing Cost Calculator with provincial land transfer taxes
  - Purchase Calculator (PITI breakdown)
- **Client Resources**:
  - Downloadable eBooks and guides
  - Newsletter subscription
  - Contact forms
<!-- - **Authentication**:
  - Email/Password login
  - Google authentication -->
- **Responsive Design**:
  - Mobile-friendly interface
  - Dark/light theme support

## Prerequisites

- Node.js 20.x or later
- npm or yarn package manager
- Firebase account for authentication and storage
- MongoDB database
- Resend.com account for email services

## Technology Stack

- [Next.js 14](https://nextjs.org/) (React framework with app directory)
- [NextUI v2](https://nextui.org/) (UI component library)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS framework)
- [Firebase](https://firebase.google.com/) (authentication and storage)
- [MongoDB](https://www.mongodb.com/) (database)
- [Next-Auth](https://next-auth.js.org/) (authentication)
- [Resend](https://resend.com/) (email service)
- [TypeScript](https://www.typescriptlang.org/) (type safety)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [next-themes](https://github.com/pacocoursey/next-themes) (theme switching)

## Getting Started

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd illumeWork
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory (see Environment Variables section)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# MongoDB Connection
MONGODB_URI = "your-mongodb-connection-string"
DATABASE_URL = "your-mongodb-connection-string" # Same as MONGODB_URI

# Authentication
AUTH_SECRET = "your-auth-secret-key"
GOOGLE_CLIENT_ID = "your-google-client-id"
GOOGLE_CLIENT_SECRET = "your-google-client-secret"

# Email Service (Resend)
RESEND_API_KEY = "your-resend-api-key"
ADMIN_EMAIL = "your-admin-email@example.com"
ADMIN_EMAIL_NOREPLY = "noreply@yourdomainname.com"

# Host URL
HOST_URL = "http://localhost:3000" # For development
# HOST_URL = "https://your-production-domain.com" # For production

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY = "your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID = "your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "your-measurement-id"
```

### Firebase Setup

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup steps
   - Enable Google Analytics if needed

2. **Set Up Authentication**:
   - In your Firebase project, navigate to "Authentication"
   - Go to "Sign-in method" tab
   - Enable "Email/Password" and "Google" providers

3. **Create a Web App**:
   - In your Firebase project, click on the web icon (</>) to add a web app
   - Register your app with a nickname
   - Copy the Firebase configuration object

4. **Update Environment Variables**:
   - Take the Firebase configuration from the previous step
   - Add the values to your `.env.local` file as shown above

5. **Set Up Firebase Storage** (for eBooks and image uploads):
   - Go to "Storage" in your Firebase console
   - Click "Get started" and follow the setup steps
   - Set up rules to allow authenticated read/write access


## Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: React components organized by feature
  - `/calculators`: Real estate calculator components
  - `/emails`: Email templates for various notifications
  - `/get-advice`: Components for advice request forms
- `/actions`: Server actions for form submissions and authentication
- `/public`: Static assets and images
- `/styles`: Global CSS and styling utilities
- `/types`: TypeScript type definitions
- `/utils`: Utility functions and helpers

## Available Calculators

### Mortgage Calculator

Located at `/components/calculators/mortgage-calculator.tsx`

Features:
- Calculate monthly mortgage payments
- View breakdown of principal vs. interest
- Visualize payment distribution
- Calculate total interest over loan term

### Closing Cost Calculator

Located at `/components/calculators/closing-cost-calculator.tsx`

Features:
- Calculate land transfer taxes by province
- Special handling for Toronto municipal tax
- First-time homebuyer rebates
- Additional closing costs (legal fees, insurance, etc.)

### Purchase Calculator

Located at `/components/calculators/purchase-calculator.tsx`

Features:
- Calculate full PITI (Principal, Interest, Taxes, Insurance) payment
- Visualize payment breakdown across all components
- Calculate total loan costs

## Customization

### Branding and Theme

- Update logo in `/public` directory
- Modify color scheme in `tailwind.config.js`
- Customize component styling in individual component files

### Content Update

- Edit hero content in `/components/home/HeroTextComp.tsx`
- Update listings in `/components/home/Listings.tsx`
- Modify eBook content in `/components/BookDownloadAble.tsx`

## Deployment

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Deploy to your preferred hosting platform:
   - [Vercel](https://vercel.com/) (recommended for Next.js)
   - [Netlify](https://www.netlify.com/)
   - [AWS Amplify](https://aws.amazon.com/amplify/)

For Vercel deployment:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to complete deployment

Remember to set up environment variables in your deployment platform's settings.

## Troubleshooting

### Common Issues

- **Authentication Errors**: Verify Firebase credentials in `.env.local` and ensure authentication providers are enabled in Firebase console
- **Email Sending Failures**: Check Resend API key and email address configurations
- **Database Connection Issues**: Verify MongoDB connection string and network permissions
- **Image Loading Problems**: Check Firebase storage rules and bucket configurations

### Support Contacts

For technical support, please contact:
- Email: support@illumework.com
- Website: https://illumework.com/contact

## License

This project is licensed under the terms of the MIT license.

Last updated: May 3, 2025
