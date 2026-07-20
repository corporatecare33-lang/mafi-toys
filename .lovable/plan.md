# ToySpark — Girls' Toys Landing Page

A single-page, fully interactive eCommerce landing for "ToySpark" built on the existing TanStack Start + Tailwind + shadcn stack. Everything lives on `/` with smooth-scroll section navigation.

## Sections (all on `src/routes/index.tsx`)
1. **Sticky Navbar** — glassmorphism, becomes more solid on scroll, logo + brand, nav links (Home / Products / Reviews / Contact) smooth-scrolling to section IDs, cart icon with live count badge, "Buy Now" CTA.
2. **Hero** — bold heading "Magical Toys For Happy Girls ✨", subheading, Shop Now / Explore Collection buttons (scroll to products), right-side auto-playing image carousel with prev/next, floating sparkles + gradient blobs.
3. **Products** — "Our Featured Toys", responsive grid (3/2/1), 6 demo products (teddy, doll, unicorn plush, barbie-style, plush bunny, toy kitchen). Each card: image with zoom-on-hover, name, short desc, price, 5-star rating, Add to Cart, Buy Now.
4. **Reviews** — "What Parents Say ❤️", 3+ colorful cards with avatar, name, stars, text, hover lift.
5. **Contact / Order** — form (Full Name, Phone, Email, Address, Message) with zod validation, Submit Order + Send Message buttons, toast on success, cute illustration on the right.
6. **Footer** — gradient background, logo + description, quick links (smooth scroll), social icons, contact info.

## Functionality
- **Cart**: React context (`CartProvider`) holding items + quantities in state. `useCart()` exposes add/remove/updateQty/subtotal/count. Persist to `localStorage`.
- **Mini Cart Drawer**: shadcn `Sheet` triggered by navbar cart icon. Lists items with thumbnail, name, price, +/- qty, remove, subtotal, Checkout button (scrolls to contact section).
- **Add to Cart**: updates context, fires sonner `toast.success("Added to cart")`, badge count animates.
- **Buy Now**: adds item then smooth-scrolls to `#contact`.
- **Smooth scroll**: `element.scrollIntoView({ behavior: 'smooth' })` helper used by navbar, footer, hero CTAs, Buy Now.
- **Hero carousel**: shadcn `Carousel` with autoplay plugin (`embla-carousel-autoplay`), prev/next buttons, fade/slide transitions.
- **Contact form**: react-hook-form + zod, inline errors, toast on submit, resets fields.
- **Scroll-aware navbar**: `useEffect` listens to scroll Y, toggles bg opacity / shadow.

## Design tokens (`src/styles.css`)
Add oklch tokens for the brand palette and use them via Tailwind utilities — no hardcoded hex in components:
- `--brand-pink` (#F8BBD0), `--brand-orange` (#FF8A00), `--brand-red` (#FF4D4D), `--brand-purple`, `--brand-peach`, `--brand-yellow`, `--brand-sky`, plus gradient tokens (`--gradient-hero`, `--gradient-footer`) and shadow tokens (`--shadow-toy`).
- Override `--primary` / `--accent` so shadcn buttons inherit the brand. Cute display font via Google Fonts (e.g. Fredoka for headings, Quicksand for body) imported in `styles.css`.

## File plan
- `src/routes/index.tsx` — replaces placeholder; renders `<CartProvider>` wrapping all sections.
- `src/context/cart-context.tsx` — cart state + localStorage.
- `src/components/toyspark/Navbar.tsx`
- `src/components/toyspark/Hero.tsx`
- `src/components/toyspark/Products.tsx` (+ `ProductCard.tsx`, `products-data.ts`)
- `src/components/toyspark/Reviews.tsx`
- `src/components/toyspark/Contact.tsx`
- `src/components/toyspark/Footer.tsx`
- `src/components/toyspark/CartDrawer.tsx`
- `src/lib/scroll.ts` — `scrollToSection(id)` helper.
- `src/styles.css` — add brand tokens, fonts, gradient + shadow utilities.
- Update `src/routes/__root.tsx` head() with title/description for ToySpark and mount `<Toaster />` (sonner).

## Assets
Generate 6 product images + 4–5 hero carousel images via `imagegen` (cute toy photography style, soft pastel backgrounds), saved to `src/assets/`. Generate 3 small avatar illustrations for review cards. Use a single decorative toy illustration for the contact section.

## Dependencies
Install only what's missing:
- `embla-carousel-autoplay` (for hero autoplay)
- `react-hook-form`, `@hookform/resolvers`, `zod` (if not already present — likely needed for the form)
- Framer Motion (`motion`) for hero floating elements + scroll/hover animations

shadcn primitives already in repo: button, card, sheet, input, textarea, label, form, sonner, carousel, badge — reuse them.

## Responsiveness
Mobile-first Tailwind: hero stacks, products 1/2/3 col grid, navbar collapses to hamburger `Sheet` on `<md`, contact form full width on mobile with illustration hidden below `lg`.

## Out of scope
No real backend / payment processing — Submit Order shows a success toast and clears the cart. Checkout button in cart drawer also routes to the contact form (acts as the order form).