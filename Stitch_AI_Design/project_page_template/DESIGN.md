# Kinetic Cobalt: Design System Specification

## 1. Overview & Creative North Star
**Creative North Star: "The Neon Architect"**
Kinetic Cobalt is a high-performance, editorial design system that blends the precision of architectural blueprints with the energy of a digital future. It breaks the "standard template" look through intentional asymmetry, massive typographic scales, and a profound sense of depth. This system is designed for high-impact portfolios and modern OS-like interfaces where information density meets cinematic presentation.

The system relies on "Kinetic Precision"—the idea that every element, while seemingly floating or asymmetrical, is bound by a rigorous hierarchy of tonal shifts and sophisticated motion.

## 2. Colors
Kinetic Cobalt uses a "Vibrant Dark" palette where a high-energy primary blue (#0052FF) pierces through a multi-layered obsidian environment.

- **The "No-Line" Rule:** Sectioning is achieved through background value shifts (e.g., transitioning from `surface` #0b0c10 to `surface_container` #1e1f23) rather than 1px solid borders.
- **Surface Hierarchy:** 
    - **Base:** `surface` (#0b0c10) for page backgrounds.
    - **De-emphasized:** `surface_container_low` (#1a1c1e) for secondary panels.
    - **Standard:** `surface_container` (#1e1f23) for primary cards and bento units.
    - **Floating:** `surface_container_high` (#282a2f) for interactive or elevated elements.
- **The "Glass & Gradient" Rule:** Use `rgba(40, 42, 47, 0.4)` with a 24px backdrop blur for floating navigation and overlay panels to maintain context of the underlying layers.
- **Signature Textures:** Incorporate `text-glow` (subtle primary-colored drop shadows on text) and background gradients (e.g., `primary` to `primary_dim`) to add luminosity.

## 3. Typography
The system employs a dual-font strategy to balance technical clarity with editorial boldess.

- **Headline Scale:** Using **Plus Jakarta Sans**, the scale is dramatic. 
    - **Display (Hero):** 3rem (48px) up to 4.5rem (72px), featuring `font-extrabold` and `tracking-tighter`.
    - **Headline:** 2.25rem (36px) and 1.875rem (30px) for section starts.
    - **Title:** 1.5rem (24px) for card headings.
- **Body & Label Scale:** Using **Inter**, focused on legibility and technical rhythm.
    - **Lead Body:** 1.25rem (20px) for intro paragraphs.
    - **Standard Body:** 1.125rem (18px) for general content.
    - **Small/Label:** 0.875rem (14px) with `tracking-widest` and uppercase transform for metadata and footers.

The typographic hierarchy conveys identity through size contrast rather than color contrast alone.

## 4. Elevation & Depth
Elevation is expressed through **Tonal Layering** and **Luminous Shadows** rather than traditional structural lines.

- **The Layering Principle:** Content should feel "stacked." A glass panel (Level 4) sits atop a high-container (Level 3), which sits atop the base surface (Level 0).
- **Ambient Shadows:**
    - **Shadow-2xl:** A wide, diffused shadow used for sticky navigation and hero elements to simulate significant lift.
    - **Shadow-xl:** Used for primary CTAs and floating cards to create a "glow" effect when combined with primary color tints.
- **The "Ghost Border" Fallback:** Use `outline_variant` (#44474e) at 10-20% opacity only when absolute separation is required in low-contrast scenarios.
- **Glassmorphism:** Apply `backdrop-blur-2xl` to all fixed or floating components (Navbars, Tooltips) to create a sense of "Kinetic Transparency."

## 5. Components
- **Buttons:** Fully rounded (pill-shaped). Primary buttons use a solid `primary` fill with white text. Secondary buttons use `surface_variant` with a subtle hover transition to `surface_bright`.
- **Bento Cards:** Use varying container tiers (`low`, `high`, `highest`) to create visual interest in grids. All corners should be `rounded-xl` (approx 1.5rem-2rem).
- **Badges/Chips:** Small, pill-shaped elements using `surface_container_high` with `primary` text and a pulsing animation for "Live" status.
- **Navigation:** A centered, floating "dock" style navbar with `backdrop-blur` and a high-radius pill shape.
- **Inputs:** Dark fills (`surface_container_lowest`) with `outline_variant` borders that glow `primary` on focus.

## 6. Do's and Don'ts
### Do's
- Use high-contrast font weights (ExtraBold vs Light).
- Employ "Asymmetrical Balance"—align large text blocks against smaller, denser UI components.
- Use `primary-container` gradients for high-impact call-to-action sections.
- Ensure all interactive elements have a `scale-105` or `scale-95` transition on hover/active states.

### Don'ts
- Do not use 1px solid white or grey borders to separate sections.
- Avoid using standard "Material" rounded corners; stick to sharp 0px or maximum pill-shaped 9999px for specific UI signals.
- Do not use pure black (#000000) for backgrounds; use the specified `surface` (#0b0c10) to maintain tonal depth.
- Avoid cluttering the screen; utilize the `spacing: 3` setting to allow the typography to breathe.