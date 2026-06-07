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
- **Short-Form Product Badges**: Created short-form translation keys (`featured`, `hot`, `new`) under the `home` namespace in all five locale files (`en.json`, `ja.json`, etc.) and updated the common `ProductCard` component to render them as badge labels (displaying "Featured", "Hot", or "New" instead of the full section headings).
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
- **Product Details Page & Amazon-like Zoom Gallery**:
  - Implemented a premium, fully localized, and responsive Product Details page (`src/app/(dashboard)/products/[id]/page.tsx`).
  - Added a multi-image thumbnails selector row with accessibility `focus-visible` focus ring highlight parameters.
  - Implemented an Amazon-like cursor magnifier on desktop, rendering a floating zoom viewport container to the right and a semi-transparent tracker lens matching coordinates using hardware-accelerated CSS properties (`--zoom-x`, `--zoom-y`).
  - Implemented mobile touch gestures (panning in-place with touch coordinates mapping and scroll prevention via `e.preventDefault()`).
  - Applied runtime optional chaining (`?.`) across all mouse/touch event property handlers, DOM target modifications, and image list renderer loops.
- **Theme-Aware Scrollbar UI**:
  - Implemented dynamic scrollbar styling in `src/app/globals.css` using standard `scrollbar-color`/`scrollbar-width` and WebKit fallbacks.
  - Bound the scrollbar thumb color dynamically to the selected theme's primary color using `color-mix(in oklch, var(--primary) 30%, transparent)` for a premium, themed scroll experience.

## Next Steps / Outstanding Bugs

- Validate the cookie auth flow and concurrency queue on staging/production.
- Ensure that the mobile app is successfully testing the general customer login flow at `/customer/auth/login`.
- Verify the build and type-checking of the frontend website and backend repositories once requested by the user.
- Verify homepage product rendering when backend provides populated arrays for `hot` and `new_arrival` badges (currently empty).

---

## Folder Structure (`src/`)

```
src/
├── app/
│   ├── (auth)/                   # Auth-only routes (login, register, OTP)
│   ├── (dashboard)/              # Main site routes
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Dashboard layout (Header, Footer)
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── products/
│   │   │   └── [id]/page.tsx     # Product detail page
│   │   ├── profile/
│   │   ├── privacy/
│   │   └── terms/
│   ├── globals.css               # Design tokens, custom scrollbar, global typography
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── auth/                     # Auth-specific components
│   ├── common/                   # Shared cross-domain components (ProductCard, etc.)
│   ├── home/                     # Homepage-specific sections
│   ├── layouts/                  # Header, Footer, navigation
│   ├── product/                  # Product-domain components (RelatedProducts, etc.)
│   ├── skeletons/                # All skeleton loading components
│   ├── ui/                       # shadcn/ui primitives (Button, Input, Dialog, etc.)
│   └── theme-provider.tsx
│
├── types/                        # ⚠️ ALL TypeScript interfaces & prop types live here
│   ├── product/
│   │   └── product.types.ts      # IProduct, ProductCardProps, RelatedProductsProps, etc.
│   ├── auth/
│   ├── address/
│   ├── profile/
│   ├── api.types.ts
│   ├── cart.types.ts
│   ├── common.types.ts
│   ├── order.types.ts
│   └── wallet.types.ts
│
├── services/                     # API layer + React Query hooks, grouped by domain
│   ├── product/
│   │   ├── product.service.ts    # Axios API calls
│   │   └── product.hooks.ts      # useQuery / useMutation wrappers
│   ├── cart/
│   ├── auth/
│   └── address/
│
├── hooks/                        # Custom non-service React hooks
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   ├── useAuth.ts
│   └── useAuthFlow.ts
│
├── constants/                    # App-wide static config
│   ├── api.ts                    # API base URL and endpoint paths
│   ├── routes.ts                 # ROUTES object (ROUTES.HOME, ROUTES.CART, etc.)
│   ├── product.constants.ts      # PRODUCT_BADGES, STOCK_STATUSES
│   ├── prefectures.ts
│   └── validation.ts
│
├── utils/                        # Pure utility/helper functions, grouped by domain
│   ├── auth/
│   ├── common/
│   ├── format/
│   ├── math/
│   ├── product/                  # e.g. getLocalizedValue()
│   └── validation/
│
├── schemas/                      # Zod validation schemas for forms
├── lib/                          # Redux store, axios instance, core config
├── providers/                    # React context providers (Redux, QueryClient, etc.)
└── i18n/                         # next-intl routing config and locale setup
```

---

## Coding Conventions

| Concern                 | Rule                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Prop interfaces**     | Always define in `src/types/<domain>/<domain>.types.ts`. **Never inline inside component files.** Import with `import type { ... }`. |
| **UI strings / labels** | Always use `useTranslations()` — never hardcode user-facing text                                                                     |
| **Navigation**          | Use `ROUTES.*` from `src/constants/routes.ts`                                                                                        |
| **New page routes**     | Add under `src/app/(dashboard)/` following App Router conventions                                                                    |
| **New components**      | Place in `src/components/<domain>/` (create the folder if needed)                                                                    |
| **Skeleton loaders**    | Add to `src/components/skeletons/`                                                                                                   |
| **Global styles**       | Design tokens and scrollbar in `globals.css`; component-level layout via Tailwind classes                                            |
| **Icons**               | Use `lucide-react`                                                                                                                   |
| **Notifications**       | Use `sonner` (`toast.success / toast.error`)                                                                                         |
| **API query keys**      | Follow `[domain, id?, extraParam?]` pattern in React Query hooks                                                                     |
| **Builds/type checks**  | Only run for major architectural changes — not after every small edit                                                                |
