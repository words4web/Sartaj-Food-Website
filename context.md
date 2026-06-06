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
- **Axios Token Expiry Redirect**: Updated the Axios response interceptor to redirect the user to `/login` when a refresh token request fails or direct auth endpoints fail (excluding logout).
- **Axios Locale Header Integration**: Updated the Axios request interceptor to dynamically extract the active locale from Redux state and attach it to the `Accept-Language` header for every backend request.
- **Structured Types Directory**: Relocated product types from root `src/types/product.types.ts` into a dedicated subfolder at `src/types/product/product.types.ts`, and relocated the API response interfaces (like `FilterProductsResponse`) to `src/types/product/product.types.ts` to strictly adhere to the types folder guideline.
- **Dynamic HomePage Badges & Product Sections**:
  - Implemented `useGetFilteredProducts` hook (under `src/services/product/`) querying `/customer/products/filter?badge=...`.
  - Refactored `ProductSection.tsx` to dynamically query products based on `badge` prop (`featured`, `hot`, `new_arrival`), removed the `SAMPLE_PRODUCTS` static fallback completely, and render custom animated skeleton loaders when loading.
  - Refactored the dashboard page `src/app/(dashboard)/page.tsx` to render three distinct, dynamic sections (Featured, Hot, and New Arrivals) without tabs.
  - Added the `"hotProducts"` key to all localization files (`en.json`, `ja.json`, `hi.json`, `bn.json`, `ne.json`).
- **Reusable Common ProductCard**:
  - Created a highly resilient, common `ProductCard` component under `src/components/common/ProductCard.tsx` implementing robust optional chaining.
  - Gracefully handles variable product models (resolves `images[0]`, `image`, or default `emoji` / `📦` fallbacks; resolves `brand` or `manufacturer.name`).
  - Automatically colors and localizes badge tags (`Featured` in Indigo, `Hot` in Red, `New Arrival` in Green).
  - Deleted the obsolete home-specific component at `src/components/home/ProductCard.tsx`.
- **Dedicated Skeletons Folder**: Created `src/components/skeletons/` containing all skeleton loading layouts. Relocated the base `Skeleton` component here from `ui` (as `Skeleton.tsx`) alongside `ProductCardSkeleton` and `ProductGridSkeleton`, updating all references globally. Customized the base `Skeleton` component to render a pulsing gradient using the active theme's accent and primary color tokens (`from-accent via-primary/10 to-accent`), making all skeletons dynamically follow the custom themes (Default, Sakura, Snowfall, Diwali).
  - Refactored the Products catalog list at `src/app/(dashboard)/products/page.tsx` to reuse the common `ProductCard` component.

- **Product Constants Integration**: Created `src/constants/product.constants.ts` containing the `PRODUCT_BADGES` constant. Refactored `ProductCard.tsx` and home page `page.tsx` to consume this constant instead of using inline static strings for badges.
- **Ported ConfirmModal, CommonLoader, and CommonError**:
  - Ported and localized `ConfirmModal`, `CommonLoader`, and `CommonError` components from the Admin Panel to the Website.
  - Replaced browser-native `confirm(...)` prompts for address deletions on the Profile page with the new styled `ConfirmModal` component.
  - Replaced inline loaders and empty state indicators with `CommonLoader` and added `CommonError` with retry handlers (`refetch`) on the Profile page address list and homepage `ProductSection.tsx`.
  - Deleted the unused, legacy component at `src/components/common/Loader.tsx` and cleaned up its export reference in `src/components/common/index.ts`.
  - Registered address deletion translations under `"profile"` inside all five JSON translation files (`en.json`, `ja.json`, `hi.json`, `bn.json`, `ne.json`).
- **Profile Dropdown Theme Selector**:
  - Shifted the `<ThemeSelector />` from the header top actions to a premium, theme-swatch integrated Submenu (`DropdownMenuSub`) inside the Profile Dropdown menu in [Header.tsx](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/components/layouts/Header.tsx).
  - Triggers theme changes instantly and dynamically updates Redux state/DOM root attributes.
- **Header Cart Button Overlap & Dynamic Count**:
  - Wrapped the `ShoppingCart` icon in a dedicated relative div, positioning the badge relative to the icon instead of the entire text container. This resolves the layout issue where the badge overlapped with the "Cart" text.
  - Linked the badge quantity dynamically to the Redux store (`state.cart.cart.totalItems`).

## Next Steps / Outstanding Bugs

- Validate the cookie auth flow and concurrency queue on staging/production.
- Ensure that the mobile app is successfully testing the general customer login flow at `/customer/auth/login`.
- Verify the build and type-checking of the frontend website and backend repositories once requested by the user.
- Verify homepage product rendering when backend provides populated arrays for `hot` and `new_arrival` badges (currently empty).
