# Project Context: Sartaj Foods Website & Backend

## Developer Constraints

- **Build / Verification Warning**: Do NOT run Next.js production builds (`pnpm build`) or TypeScript type checks (`pnpm run type-check`) automatically after updating components or code. Wait for the user to explicitly instruct if either operation is required.

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
- **Optimistic Cart Actions & Stepper Integration**:
  - Implemented the unified `CartActions` component in [`CartActions.tsx`](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/components/cart/CartActions.tsx). Features card and detail mode layouts updating Redux store state optimistically (`addOrUpdateItem`, `updateItemQuantity`, `removeItem` in `cartSlice.ts`) and synchronising in the background using an 800ms debounce.
  - Runs automatic background cart updates (`syncCartFromServer`) on both success and error paths of mutations to pull authoritative server totals.
  - Removed the standalone "Remove" button from Detail Mode, converting the `- qty +` stepper into the single interface control.
- **Product Specs Component Separation**:
  - Extracted the static specifications grid metadata layout into a dedicated [`ProductSpecs.tsx`](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/components/product/ProductSpecs.tsx) component and deleted the obsolete legacy composite `ProductCartActions.tsx` file.
- **Simplified Cart Page Summary**:
  - Streamlined the checkout Summary card on the Cart page ([`page.tsx`](<file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/app/(dashboard)/cart/page.tsx>)) to display only the Subtotal field returned directly from the backend, removing shipping, tax, and grand total lines.
  - Reused `<CartActions mode="card" />` for cart items to execute debounced updates and background store refreshes seamlessly.
- **Dynamic Categories Carousel Grid**:
  - Created [`CategoryCard.tsx`](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/components/category/CategoryCard.tsx) and service layers to fetch categories tree dynamically via React Query (`useGetCategories()`) from the backend `/customer/categories` endpoint.
  - Refactored [`CategoriesGrid.tsx`](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/components/home/CategoriesGrid.tsx) as a horizontal carousel. Hides scrollbars via `.no-scrollbar` and offers smooth navigation using Left and Right arrow buttons.
  - Added [`CategorySkeleton.tsx`](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/components/skeletons/CategorySkeleton.tsx) and integrated it with `CommonError` for error/loading boundary protection.
- **Client-Side Auth Guard & Loading Screen**:
  - Configured client-side redirection in [`layout.tsx`](<file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/app/(dashboard)/layout.tsx>) redirecting unauthenticated users to `/login`.
  - Created a dedicated fullscreen loading component [`AuthLoadingOverlay.tsx`](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/components/common/AuthLoadingOverlay.tsx) showing a pulsing logo, themed bounce dots, and a blurred backdrop, rendering while authentication resolves.
- **Revamped Products Catalog Page & Routing Helpers**:
  - Rewrote the Products Catalog page ([`page.tsx`](<file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/app/(dashboard)/products/page.tsx>)) to display dynamic category selector cards on the left (horizontal scroll on mobile, vertical column on desktop) and the products grid on the right.
  - Linked active catalog rendering to URL query parameters via Next.js `useSearchParams()`.
  - Created the `useGetProductsByCategory` React Query hook querying backend endpoints.
  - Updated [`routes.ts`](file:///home/mazahir/projects/work/sartaj_foods/Sartaj-website/src/constants/routes.ts) to define separate navigation functions for `ROUTES.PRODUCTS` (by ID or list) and `ROUTES.PRODUCTS_BY_CATEGORY(categoryId)`.
  - Enabled active visual state highlighting in `CategoryCard.tsx` based on active query params.
- **Glassmorphic Header & Dropdowns**:
  - Re-designed the global `Header` with high-fidelity glassmorphism using `bg-background/50 backdrop-blur-xl backdrop-saturate-[200%] supports-[backdrop-filter]:bg-background/30` and a subtle `shadow-[0_4px_30px_rgba(0,0,0,0.03)]`.
  - Added two static, highly blurred theme-color backdrop glow shapes (`primary/15%` on the left and `accent/12%` on the right) inside the header layer to provide a rich touch of color.
  - Applied the exact same glassmorphic parameters to the profile dropdown menu container (`DropdownMenuContent`) and the nested theme selector sub-menu panel (`DropdownMenuSubContent`).
  - Added large, top-aligned global ambient glow pools (`primary/22%` and `accent/18%`) in `RootLayout` (`src/app/layout.tsx`) behind the page elements to naturally showcase the glassmorphism.
- **Products Page Layout & Scaling Optimizations**:
  - Constrained the category list sidebar using `lg:sticky lg:top-24 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto no-scrollbar` to prevent container stretching.
  - Scaled down circular category card components to `120px` (when `size="sm"`) and updated the inner image container size to `h-13 w-13` to free up space. Adjusted paddings, gaps, and set `line-clamp-2` and `leading-tight` on category name headers to resolve label clipping issues.
  - Rendered active subcategory selector chips dynamically at the top of the products catalog list in `products/page.tsx`.
- **Client Link Transitions & Extracted Pagination**:
  - Extracted pagination control loops from the products catalog page into a reusable `PaginationControls` component under `src/components/common/PaginationControls.tsx`.
  - Switched pagination transitions to Next.js `<Link>` elements inside `src/components/ui/pagination.tsx` to achieve single-page client transitions and prevent full document reloads.
- **Localized 404 Page**:
  - Created a custom, responsive `not-found.tsx` page under `src/app/` wrapped inside the site's default layout with global `<Header />` and `<Footer />` components.
  - Integrated with `next-intl` localization hooks, adding dedicated translation keys to `en.json`, `ja.json`, `hi.json`, `ne.json`, and `bn.json` files.
- **End-to-End Checkout Flow Integration**:
  - Fully implemented the Checkout page (`src/app/(dashboard)/checkout/page.tsx`) with dynamic API hook integrations.
  - Developed modular components under `src/components/checkout/`: `CheckoutAddressSelection.tsx` (displays the currently selected address as a prominent, collapsed card by default with a "Change Address" expander button, revealing the full multi-address grid list only on interaction to optimize vertical page density), `CheckoutCartItems.tsx` (displays cart items list with localizations, using a fixed-height scrollable container `max-h-[320px] overflow-y-auto scrollbar-thin` to cleanly limit layout stretching on long orders), `CheckoutPaymentMethod.tsx` (renders payment methods and wallet debit toggles), and `CheckoutPriceBreakdown.tsx` (handles coupon operations, tooltips, loading indicators, and place-order trigger).
  - Added new backend service API calls in `order.service.ts` for checkout summary query and create order mutation, wrapped in React Query hooks (`order.hooks.ts`).
  - Added a dedicated layout skeleton (`CheckoutSkeleton.tsx`) for a seamless loading experience.
  - Defined types in `src/types/checkout/checkout.types.ts` and `src/types/order.types.ts` (`IPriceBreakdownItem`, `ICheckoutSummary`).
  - Added comprehensive English, Japanese, Hindi, Bengali, and Nepali translations under the `checkout` namespace in all respective JSON translation messages files, including new `"showMore"`, `"showLess"`, `"changeAddress"`, `"selected"`, and `"chooseShippingAddress"` localization keys.
- **Robust Image Fallback & Theme-Aware Placeholders (`ThemedImage.tsx`)**:
  - Replaced all raw catalog and product images across the website with a newly created, reusable `<ThemedImage />` component (`src/components/common/ThemedImage.tsx`) wrapped in `React.forwardRef`.
  - Integrates load failure detection (on `onError`) and swaps broken/missing remote image sources with dynamic, theme-aware CSS gradients.
  - Dynamically computes gradients using active theme variables (`bg-gradient-to-br from-primary/15 via-accent/5 to-background`) with centered, drop-shadowed emojis for products (e.g. `emoji || "📦"`), a circular styled package background for categories, and a styled vector icon for avatars.
  - Deployed this across product catalog cards (`ProductCard.tsx`), product image zoom galleries (`ProductImageGallery.tsx`), shopping cart page item rows (`cart/page.tsx`), checkout page items (`CheckoutCartItems.tsx`), and category sliders (`CategoryCard.tsx`).
  - Added type specifications (`ThemedImageProps`) inside `src/types/common.types.ts` supporting generic image variables, style overrides, and standard forward refs.

## Next Steps / Outstanding Bugs

- Validate the cookie auth flow and concurrency queue on staging/production.
- Ensure that the mobile app is successfully testing the general customer login flow at `/customer/auth/login`.
- Verify the build and type-checking of the frontend website and backend repositories once requested by the user.
- Verify homepage product rendering when backend provides populated arrays for `hot` and `new_arrival` badges (currently empty).
- Perform end-to-end user testing of the newly built checkout flow with cash-on-delivery (`daibiki`), PayPal, and PayPay, verifying payment redirection loops and wallet debit accuracy.

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

| Concern                 | Rule                                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Prop interfaces**     | Always define in `src/types/<domain>/<domain>.types.ts`. **Never inline inside component files.** Import with `import type { ... }`.                                                                                     |
| **UI strings / labels** | Always use `useTranslations()` — never hardcode user-facing text                                                                                                                                                         |
| **Navigation**          | Use `ROUTES.*` from `src/constants/routes.ts`                                                                                                                                                                            |
| **New page routes**     | Add under `src/app/(dashboard)/` following App Router conventions                                                                                                                                                        |
| **New components**      | Place in `src/components/<domain>/` (create the folder if needed)                                                                                                                                                        |
| **Skeleton loaders**    | Add to `src/components/skeletons/`. **MANDATORY**: Use skeletons or common loaders (`CommonLoader`) and error states (`CommonError`) for all async states instead of custom spinners or raw errors.                      |
| **Global styles**       | Design tokens and scrollbar in `globals.css`; component-level layout via Tailwind classes                                                                                                                                |
| **Icons**               | Use `lucide-react`                                                                                                                                                                                                       |
| **Notifications**       | Use `sonner` (`toast.success / toast.error`)                                                                                                                                                                             |
| **API query keys**      | Follow `[domain, id?, extraParam?]` pattern in React Query hooks                                                                                                                                                         |
| **Builds/type checks**  | **CRITICAL**: Do NOT run type checks (e.g. `pnpm type-check`) or builds (e.g. `pnpm build`) for minor or incremental changes. Only execute them for major architectural shifts or when explicitly requested by the user. |

---

## Order Checkout & Summary System (Backend & Frontend Integration)

The website queries the backend endpoint `/api/v1/customer/orders/checkout-summary` to resolve order pricing details, shipping adjustments, tax breakdowns, and coupon or wallet deductions before placing an order.

### Core Calculation Metrics

- **Dynamic Config Policies**: Dynamically reads weight-based frozen shipping criteria and prefecture-based special area surcharges.
- **Minimum Order Values (MOV)**: Penalizes transactions falling below the customer's Super Category group order minimum.
- **Wallet Deductions**: Validates wallet balance and locks the maximum debited amount to `WALLET_MAX_ORDER_PAY_PERCENT` of the final order amount.
- **Coupon Allocations**: Calculates subtotal discounts and allocates the saved amount across items using the largest remainder algorithm.
