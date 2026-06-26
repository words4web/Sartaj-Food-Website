# Mobile Animations & Performance Optimization Tasks

This document tracks the tasks required to optimize performance and improve usability on mobile devices by removing or simplifying heavy animations, transitions, and hover effects on smaller screens.

## 📋 Task List

### 1. Product Cards (`ProductCard.tsx`)

- [x] Disable 3D card flipping transition (`rotateY(180deg)`) on viewports `< 1024px` (`lg` breakpoint).
- [x] Completely hide the back face of the card (`hidden lg:flex`) on viewports `< 1024px` to avoid rendering overhead.
- [x] Restrict card hover scale, rotation, and custom box-shadow glow effects to `lg:hover` or desktop pointer screens.
- [x] Ensure that tapping a product card on mobile triggers direct page navigation or clean cart actions without sticky visual states.

### 2. Product Details Zoom Gallery (`ProductImageGallery.tsx`)

- [x] Disable coordinate panning and inline scaling (`scale(2.2)`) on the main details page gallery on screens `< 768px`.
- [x] Disable/remove touch event listeners (`onTouchStart`, `onTouchMove`, `onTouchEnd`) on mobile to prevent interception of native page scrolling (`e.preventDefault()`).
- [x] Ensure standard mobile touch drag gestures scroll the page smoothly without getting caught on the main product image.
- [x] Added a mobile modal lightbox gallery popup on click, allowing users to view products in full screen with optional zoom toggles and navigation.

### 3. Header Category Marquee (`CategoryMarqueeStrip.tsx`)

- [x] Disable the `requestAnimationFrame` auto-scroll rendering loop on viewports `< 1024px`.
- [x] Convert the container on mobile/tablet to a clean, native horizontally scrollable row (`overflow-x-auto no-scrollbar`) with static item placements.
- [x] Ensure category chips do not slide/move while a user is attempting to tap them on mobile.

### 4. Brand Logo Marquee (`ManufacturersGrid.tsx`)

- [x] Disable the `requestAnimationFrame` auto-scroll loop on viewports `< 1024px`.
- [x] Make the marquee behave as a standard static horizontal-scrolling list on touch-first viewports.

### 5. Trust Signals Section (`TrustSignals.tsx`)

- [x] Remove scroll-triggered fly-in entrance animations (`translateX(-100vw)` and `translateX(100vw)`) on screens `< 1024px` (display cards statically at `opacity: 1` and `transform: none`).
- [x] Disable mouse tracking spotlight overlay gradients (`onMouseMove` event listeners and custom `--x`, `--y` variables) on mobile.
- [x] Disable or hide the continuous SVG orbit rotations (`animate-spin-slow` and `animate-spin-reverse-slow`) on screens `< 1024px`.

### 6. Category Grid / Cards (`CategoriesGrid.tsx`, `CategoryCard.tsx`)

- [x] Disable/simplify staggered entrance translate/scale animations on categories grid scroll below `1024px`.
- [x] Restrict category card scale, rotate, and background bottom fill animations to desktop hover states (`lg:hover` or `@media (hover: hover)`) to avoid sticky touched states.

### 7. Testimonials Section (`Testimonials.tsx`)

- [x] Disable scroll-triggered entrance transitions on smaller screens.
- [x] Simplify testimonial slider transitions on mobile (use simple fade/slide offsets instead of simultaneous translation + scale scaling down).
- [x] Remove hover translate/shadow animations from mobile viewports.

### 8. Banner Orbs & Section Entrances (`HeroSection.tsx`, `PromoBanner.tsx`, `ProductSection.tsx`)

- [x] Disable the continuous floating blur orb drift animations (`animate-orb-drift`) in `HeroSection` (Done) and `PromoBanner` (Done) on mobile viewports.
- [x] Simplify slide transition effects in `HeroSection` below `lg` (e.g. standard simple fade without scale shifts).
- [x] Disable scroll-triggered `animate-fade-in-up-card` entrance animations for product grids in `ProductSection` on mobile to prevent scroll jank.
