# Project Context: Sartaj Foods Website & Backend

## Active Tech Stack

- **Frontend (`Sartaj-website`)**: Next.js 16 (Turbopack), React, Redux Toolkit, Axios, TailwindCSS / Vanilla CSS, next-intl for localization.
- **Backend (`Sartaj-App-Backend`)**: Node.js, TypeScript, Express, MongoDB/Mongoose, Redis (caching), BullMQ.
- **Mobile (`Sartaj-food-mobile-app`)**: React Native (Android/iOS).

## Architecture & Authentication Flow

- **HTTP-Only Cookies Auth**:
  - Secure refresh tokens are stored in the HTTP-only cookie `retailerRT` at `/api/v1/retailer/auth/refresh-token`.
  - The client Axios instance has `withCredentials: true` globally to send/receive cookies cross-origin.
  - Token refresh is queued to support concurrent API calls seamlessly.
- **Global Uniqueness**:
  - Accounts are globally unique by email and mobileNumber across all customer types (`Retailer`, `Wholesaler`, `Restaurant`).
- **Super Category Checks**:
  - Login, verify OTP, and resend OTP endpoints strictly check that the customer has the `Retailer` superCategory.
  - Centralized customer activity check (`CustomerService.ensureCustomerActive`) shared between general and retailer controllers.

## Recent Changes & Cleanup

- Created a dedicated retailer auth endpoint at `/api/v1/retailer/auth/...` and deleted the old legacy `/auth/signup` from `customer.controller.ts` and customer routes.
- Statically imported `DeviceModel` in logout methods to clean up dynamic runtime imports.
- Fixed `getLocalizedError` in frontend auth utils to correctly map OTP expiration messages to `invalidOtp` translations and removed unmapped dynamic `t(message)` fallbacks which triggered console missing-key validation errors.

## Next Steps / Outstanding Bugs

- Validate the cookie auth flow and concurrency queue on staging/production.
- Ensure that the mobile app is successfully testing the general customer login flow at `/customer/auth/login`.
- Verify the build and type-checking of both the frontend website and backend repositories once requested by the user.
