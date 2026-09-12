---
name: Serene Gallery
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdada'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#43474c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#73777d'
  outline-variant: '#c3c7cd'
  surface-tint: '#4a6078'
  primary: '#112a3f'
  on-primary: '#ffffff'
  primary-container: '#294056'
  on-primary-container: '#94acc6'
  inverse-primary: '#b1c9e4'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dcdddd'
  on-secondary-container: '#5f6161'
  tertiary: '#272829'
  on-tertiary: '#ffffff'
  tertiary-container: '#3d3e3f'
  on-tertiary-container: '#a8a9a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cee5ff'
  primary-fixed-dim: '#b1c9e4'
  on-primary-fixed: '#021d32'
  on-primary-fixed-variant: '#32495f'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
  text-primary: '#2C2C2C'
  text-secondary: '#6B6B6B'
  success-moss: '#10B981'
  alert-terracotta: '#EF4444'
  info-slate: '#64748B'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 56px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 44px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: 0em
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.06em
  meta-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 32px
  margin-desktop: 48px
  margin-mobile: 24px
  section-gap-lg: 128px
  section-gap-md: 80px
  max-width: 1440px
---

## Brand & Style

The design system is centered on a **Sophisticated Minimalist Sanctuary** aesthetic. It draws heavily from **Minimalism** and **Modern Corporate** styles, reimagined through a luxury editorial lens. The goal is to create a "gallery-like" environment where the UI recedes to prioritize high-end photography.

Key brand attributes:
- **Tranquil & Spacious:** Utilizing expansive whitespace to create a sense of luxury and breathing room.
- **Photography-First:** UI elements are refined and understated to ensure product imagery remains the focal point.
- **Architectural & Grounded:** A structured grid system provides a sense of stability and permanence.
- **Editorial:** High-contrast typography and intentional letter-spacing evoke the feel of a premium lifestyle magazine.

## Colors

The palette is rooted in warm neutrals to avoid the clinical feel of pure white, anchored by a singular, deep chromatic accent.

- **Primary Background:** Use `Warm Barely-There Cream (#FCFAFA)` for all major page surfaces.
- **Secondary Surfaces:** Use `Crisp Very Light Gray (#F5F5F5)` for card backgrounds and section differentiation.
- **Primary Accent:** `Deep Muted Teal-Navy (#294056)` is reserved exclusively for high-priority interactive elements and active states.
- **Typography:** `Charcoal Near-Black (#2C2C2C)` provides high legibility for headlines, while `Soft Warm Gray (#6B6B6B)` softens secondary information.
- **Borders:** `Ultra-Soft Silver Gray (#E0E0E0)` is used for hair-line dividers and subtle structural boundaries.

## Typography

The design system uses **Manrope** exclusively to maintain a cohesive, contemporary geometric feel with subtle humanist warmth.

- **Headlines:** Use Semi-bold (600) weights. For H1 and H2 levels, apply expanded letter-spacing to enhance the editorial "gallery" feel.
- **Body Copy:** Maintains a generous 1.7 line-height. This is critical for sustaining the airy atmosphere and ensuring effortless readability.
- **Navigation & Labels:** Use uppercase transformations and significantly expanded letter-spacing (0.06em) to create a refined, premium character.
- **Scale:** On mobile devices, Display Headlines (H1) should scale down to roughly 80% of their desktop size to maintain visual balance.

## Layout & Spacing

The layout is governed by a **Fluid Grid** system within a defined maximum width to ensure a premium browsing experience on wide displays.

- **Grid:** Use a 12-column grid. Gutters should be 32px on desktop, scaling down to 24px on mobile.
- **Section Margins:** High-end furniture requires space to breathe. Use dramatic vertical margins (80px to 128px) between major sections to prevent visual clutter.
- **Responsive Columns:** 
  - **Large Desktop (>1440px):** 4 columns for product grids.
  - **Desktop (1024-1440px):** 3 columns.
  - **Tablet (768-1024px):** 2 columns.
  - **Mobile (<768px):** 1 column.
- **Hierarchy:** Maintain a 70/30 image-to-text ratio to reinforce the photography-first philosophy.

## Elevation & Depth

This design system avoids heavy shadows and physical metaphors in favor of **Tonal Layers** and **Whisper-Soft Shadows**.

- **Default State:** Most elements, including cards and inputs, should remain "flat" against the background, defined by their secondary surface color or a 1px Ultra-Soft Silver Gray border.
- **Interactive Depth:** Use highly diffused, low-opacity shadows (`0 2px 8px rgba(0,0,0,0.06)`) specifically for hover states. This creates a subtle "lift" effect that signals interactivity without breaking the minimalist aesthetic.
- **Tonal Tiers:** Depth is primarily communicated through color layering—moving from the Cream background to Very Light Gray card surfaces.

## Shapes

The shape language is **Rounded**, striking a balance between modern geometry and organic warmth.

- **Components (Buttons/Inputs):** Use a 0.5rem (8px) radius. This provides a soft, approachable feel while remaining architectural.
- **Containers (Cards):** Use a larger 0.75rem (12px) radius for product cards to give them a distinct, framed appearance that feels like high-end packaging or a curated gallery frame.

## Components

### Buttons
- **Primary:** Deep Muted Teal-Navy background with white text. 8px rounded corners. Padding should be generous (0.875rem vertical, 2rem horizontal).
- **Secondary:** Outlined style using a 1px border in the primary color.
- **Interaction:** On hover, primary buttons should darken slightly with a 250ms transition.

### Cards & Product Containers
- **Visuals:** 12px rounded corners. Use a 1px Ultra-Soft Silver Gray border for definition.
- **Hover:** Apply the "whisper-soft" shadow and a gentle `translateY(-4px)` lift.
- **Layout:** Product images must be full-bleed at the top of the card (1:1 or 4:3 ratio), followed by internal padding of 1.5rem to 2rem for content stacks.

### Navigation
- **Top Bar:** Elegant horizontal layout with 3rem spacing between items.
- **Typography:** Uppercase, 0.06em letter-spacing.
- **Active State:** A thin (2px) underline in the Primary Accent color.

### Inputs & Forms
- **Style:** 1px Soft Warm Gray border with 8px rounded corners.
- **Focus:** Border transitions to Deep Muted Teal-Navy with a soft outer glow.
- **Typography:** Placeholder text in Ultra-Soft Silver Gray.

### List Items
- Maintain generous vertical rhythm. Each list item should be separated by clear whitespace or a hairline divider in Ultra-Soft Silver Gray.