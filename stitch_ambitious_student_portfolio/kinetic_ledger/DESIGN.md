# Design System Document: The Kinetic Professional

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Dynamic"**

This design system is built to bridge the gap between high-school energy and professional maturity. It rejects the "static template" look in favor of an editorial, high-end portfolio experience. We achieve this through **Intentional Asymmetry** and **Tonal Depth**. 

Instead of a standard centered grid, the layout should feel like a premium magazine—utilizing large-scale typography that overlaps containers and imagery that breaks the boundaries of its parent surface. The goal is to make the student's work feel curated, not just hosted.

---

## 2. Colors: High-Contrast Sophistication
The palette utilizes a deep, charcoal-ink base (`surface`: `#111316`) contrasted against a vibrant, electric blue (`primary`: `#b7c4ff`) and a sophisticated coral (`secondary`: `#ffb3ae`).

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To separate the "About Me" from "Projects," do not use a horizontal rule. Instead, transition the background from `surface` to `surface-container-low`. The change in tone is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of matte acrylic.
*   **Base Layer:** `surface` (#111316)
*   **Secondary Content Areas:** `surface-container-low` (#1a1c1f)
*   **Interactive Cards:** `surface-container` (#1e2023)
*   **Floating Modals/Popovers:** `surface-container-highest` (#333538)

### The "Glass & Gradient" Rule
To inject "soul" into the professional framework:
*   **Glassmorphism:** Use `surface-variant` with a 60% opacity and a `20px` backdrop-blur for navigation bars or floating action buttons.
*   **Signature Gradients:** For primary CTAs or Hero section highlights, use a linear gradient: `primary` (#b7c4ff) to `primary-container` (#0052ff) at a 135-degree angle.

---

## 3. Typography: Confident & Editorial
We use two distinct sans-serifs to create a "Power Pair."

*   **Display & Headlines:** `Plus Jakarta Sans`. This is our "Voice." Use `display-lg` (3.5rem) for hero statements. Tighten letter-spacing by `-0.02em` for a more aggressive, modern look.
*   **Body & Labels:** `Manrope`. Chosen for its technical precision. Use `body-md` (0.875rem) for project descriptions to maintain a clean, high-density professional feel.

**Hierarchy as Identity:**
Use `headline-lg` in `primary` color for section titles, then immediately follow it with a `label-md` in `on-surface-variant` for a "meta-tag" look. This contrast between massive scale and tiny detail is the hallmark of high-end design.

---

## 4. Elevation & Depth
We define hierarchy through **Tonal Layering** rather than structural lines or heavy shadows.

*   **The Layering Principle:** To "lift" a card, do not add a shadow first. Move it from `surface` to `surface-container-high`. The shift in hex value provides a cleaner, more contemporary lift.
*   **Ambient Shadows:** For floating elements (like a "Contact" button), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must feel like a soft glow, never a sharp edge.
*   **The "Ghost Border" Fallback:** If a project card sits on a background of the same color, use a 1px border of `outline-variant` (#434656) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary-container` background with `on-primary-container` text. Border radius: `md` (0.375rem). Use a subtle scale-up transform (1.02x) on hover.
*   **Secondary:** Ghost style. No background, `outline` color for text, and a `Ghost Border` (15% opacity `outline-variant`).
*   **Tertiary:** Bold `Manrope` text in `secondary` color, all caps, with a 2px underline that expands on hover.

### Cards (Project Showcase)
*   **Visuals:** No dividers. Use `surface-container-low` for the card base.
*   **Interaction:** On hover, the card should transition to `surface-container-highest` and the `primary` accent color should appear as a 4px left-accent bar.
*   **Spacing:** Use `1.5rem` (xl) internal padding to give content room to breathe.

### Chips (Skills & Tags)
*   **Style:** `surface-variant` background with `on-surface-variant` text.
*   **Shape:** `full` (pill-shaped) to contrast against the `md` roundedness of the cards.

### Input Fields
*   **State:** Filled style. Use `surface-container-highest` as the field background.
*   **Indicator:** Instead of a full-color border on focus, use a 2px bottom-border of `tertiary` (#ffb4a1) to signal the energetic personality.

---

## 6. Do's and Don'ts

### Do:
*   **Do** allow text to overlap images slightly (using negative margins) to create an editorial feel.
*   **Do** use `secondary` (Coral) sparingly as a "high-energy" highlight for specific achievements or "New" tags.
*   **Do** use extreme white space. If you think there's enough space between sections, double it.

### Don't:
*   **Don't** use 100% black. Always use `surface` (#111316) to keep the depth feeling "ink-rich" and premium.
*   **Don't** use standard "Drop Shadows." Only use the Ambient Shadow specification provided in Section 4.
*   **Don't** use icons within buttons unless they are essential for navigation. Let the typography do the work.