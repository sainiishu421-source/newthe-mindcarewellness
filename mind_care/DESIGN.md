---
name: Mind Care
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#424842'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#737972'
  outline-variant: '#c2c8c0'
  surface-tint: '#4a654f'
  primary: '#4a654f'
  on-primary: '#ffffff'
  primary-container: '#8daa91'
  on-primary-container: '#253f2b'
  inverse-primary: '#b0ceb4'
  secondary: '#436463'
  on-secondary: '#ffffff'
  secondary-container: '#c5eae8'
  on-secondary-container: '#496a69'
  tertiary: '#615e57'
  on-tertiary: '#ffffff'
  tertiary-container: '#a6a29a'
  on-tertiary-container: '#3b3933'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cceacf'
  primary-fixed-dim: '#b0ceb4'
  on-primary-fixed: '#062010'
  on-primary-fixed-variant: '#334d38'
  secondary-fixed: '#c5eae8'
  secondary-fixed-dim: '#aacdcc'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#2b4c4c'
  tertiary-fixed: '#e7e2d9'
  tertiary-fixed-dim: '#cac6be'
  on-tertiary-fixed: '#1d1c16'
  on-tertiary-fixed-variant: '#494740'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style

The design system is centered on the concept of "Digital Sanctuary." It prioritizes psychological safety and cognitive ease for users seeking mental wellness support. The aesthetic is **Minimalist and Premium**, moving away from clinical austerity toward a warm, human-centric environment. 

The personality is supportive and professional, achieved through a "Soft High-End" approach: using generous whitespace to reduce anxiety, high-quality typography for clarity, and subtle depth to make the digital space feel tangible and safe. Every interaction should feel intentional and unhurried.

## Colors

The palette is derived from nature to evoke a sense of grounding and growth. 

- **Primary (Sage Green):** Used for primary actions and progress indicators. It represents growth and tranquility.
- **Secondary (Muted Teal):** Used for supportive elements and secondary highlights, providing depth without adding visual noise.
- **Tertiary (Light Beige):** Used for container backgrounds to soften the interface and separate content sections from the main off-white background.
- **Text (Dark Charcoal):** High-contrast but softer than pure black, ensuring maximum readability while maintaining the premium, gentle feel.
- **Background (Off-White):** The primary canvas, chosen to reduce screen glare and eye strain.

## Typography

The design system utilizes **Manrope** for its balanced, modern, and trustworthy characteristics. The typeface bridges the gap between geometric precision and organic warmth.

- **Headlines:** Use semi-bold weights with slight negative letter-spacing to create a confident, grounded feel.
- **Body Text:** Generous line-heights are mandatory to prevent text-heavy pages from feeling overwhelming.
- **Labels:** Use medium weights for clear categorization and navigation.
- **Mobile scaling:** Large display headers scale down significantly on mobile to ensure content remains above the fold and legible.

## Layout & Spacing

The design system employs a **Fluid Grid** model built on an 8px base unit. 

- **Desktop:** A 12-column grid with 24px gutters. Use wide margins (40px+) to create a "centered sanctuary" feel.
- **Mobile:** A 4-column grid with 20px side margins. 
- **Rhythm:** Vertical spacing between sections should be aggressive (80px+) to allow the user's eyes to rest. Elements within a card or group should use tight 8px/16px increments.
- **Alignment:** Content is generally left-aligned to mimic natural reading patterns, though hero headers may be centered for impact.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows** rather than stark borders.

- **Base Layer:** The off-white (#FAFAFA) background.
- **Surface Layer:** Cards and containers use pure white or the tertiary beige (#F2EDE4).
- **Shadows:** Use extremely soft, diffused shadows. For example: `0 8px 32px rgba(45, 45, 45, 0.04)`. Shadows should feel like a soft glow rather than a hard drop, suggesting that elements are resting gently on the surface.
- **Interaction:** On hover, cards may lift slightly (increasing shadow spread) to provide tactile feedback without visual aggression.

## Shapes

The shape language is defined by **Roundedness (Level 2)** to eliminate sharp corners that can trigger subconscious tension.

- **Standard Cards:** 16px corner radius.
- **Large Sections/Feature Cards:** 24px corner radius.
- **Inputs & Buttons:** 12px or fully pill-shaped (for CTA buttons) to emphasize approachability.
- **Icons:** Use simple 2px stroke line icons with rounded caps and joins. Avoid filled icons unless used for active states.

## Components

- **Buttons:** Primary buttons use a Sage Green background with white text. Secondary buttons use a Sage Green outline or a light beige fill. Shapes should be pill-shaped or have at least 12px rounding.
- **Cards:** Use a white background with the softest ambient shadow. Ensure padding inside cards is at least 24px to maintain the "airy" feel.
- **Input Fields:** Use a subtle border (1px) in a light neutral shade. On focus, the border transitions to Sage Green. Labels sit outside the field for clarity.
- **Chips/Tags:** Used for mood tracking or category selection. These should be pill-shaped with the Tertiary Beige fill and Dark Charcoal text.
- **Progress Bars:** Use Sage Green for the fill and a very light version of the same hue for the track. Transitions should be smooth and eased (300ms).
- **Modals:** Centered with a heavy backdrop blur (12px+) to focus the user's attention and dim the background world.