# Design System Document: The Artisanal Harvest

## 1. Overview & Creative North Star: "The Heritage Curator"
This design system rejects the clinical, "app-like" feel of modern e-commerce in favor of a digital experience that feels like an editorial journal or a premium boutique shop. Our Creative North Star is **"The Heritage Curator."** 

We are not just selling walnuts; we are documenting a legacy. To achieve this, we break the rigid "box-and-grid" template through **Intentional Asymmetry** and **Tonal Depth**. 
*   **Asymmetry:** Headlines should often be offset from body copy. Imagery should bleed off the edges or overlap container boundaries to create a tactile, scrapbook-like layering.
*   **Breathing Room:** We use aggressive white space (or rather, "Beige Space") to signal luxury. If a section feels crowded, it is no longer premium.

## 2. Colors: The Earth & The Hearth
Our palette is rooted in the soil and the skin of the walnut. We use Material Design token conventions to ensure a logical hierarchy of information.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections. 
Boundaries must be created through:
1.  **Background Shifts:** Transitioning from `surface` (#fbfbe2) to `surface-container-low` (#f5f5dc).
2.  **Negative Space:** Using the spacing scale to create mental boundaries.
3.  **Subtle Kraft Texture:** Applying a very low-opacity noise or kraft paper grain to the `surface` to distinguish it from the "clean" `surface-container-lowest`.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of paper and wood.
*   **Lowest Layer:** `surface-dim` (#dbdcc3) for the deepest background or footers.
*   **Base Layer:** `surface` (#fbfbe2) for general page flow.
*   **Floating Layer:** `surface-container-lowest` (#ffffff) for high-priority cards or modals to make them "pop" like fresh stationery.

### The "Glass & Gradient" Rule
To add "soul," use subtle linear gradients for primary CTAs: `primary` (#432a1e) transitioning into `primary-container` (#5c4033) at a 135-degree angle. For floating navigation or overlays, use **Glassmorphism**: a semi-transparent `surface` color with a `20px` backdrop-blur to allow the rich farm photography to bleed through the interface.

## 3. Typography: The Editorial Voice
We pair a prestigious, high-contrast Serif with a functional, modern Sans-Serif to balance heritage with accessibility.

*   **Display & Headlines (Noto Serif):** These are our "Voice." Use `display-lg` for hero statements. Apply `letter-spacing: -0.02em` to large serif headers to give them a custom, typeset feel.
*   **Titles & Body (Manrope):** Our "Information." Manrope provides a clean, geometric contrast to the organic serif. It ensures that price points and nutritional data are legible at any size.
*   **Hierarchy as Identity:** Always lead with a large `headline-lg` in `on-surface`. Follow with a `title-md` in `secondary` (#486730) to create a natural, botanical rhythm in the reading flow.

## 4. Elevation & Depth: Tonal Layering
We move away from the "shadow-heavy" look of 2010s material design. 

### The Layering Principle
Depth is achieved by stacking tones. 
*   Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f5f5dc) background. The 3% difference in luminance is enough to signify "lift" without visual clutter.

### Ambient Shadows
If a product image or a high-conversion modal requires a shadow:
*   **Blur:** Minimum `40px` to `60px`.
*   **Opacity:** `4% - 8%`.
*   **Color:** Do not use pure black. Use a tinted shadow based on `on-surface` (#1b1d0e) to mimic the way light hits organic material.

### The "Ghost Border" Fallback
If an element (like an input field) requires a container, use the **Ghost Border**: 
*   Token: `outline-variant` (#d4c3bd).
*   Opacity: `20%`. 
*   Result: A whisper of a line that guides the eye without "trapping" the content.

## 5. Components: Style & Execution

### Buttons
*   **Primary:** `primary` (#432a1e) background with `on-primary` text. No border. `xl` (1.5rem) roundedness for a soft, pebble-like feel.
*   **Secondary:** `surface-container-lowest` background with a `Ghost Border`.
*   **Interaction:** On hover, primary buttons should shift to `primary-container` (#5c4033) with a subtle `2px` vertical lift.

### Input Fields
*   **Style:** Minimalist. No bottom line or heavy box. Use a `surface-container-low` background with `sm` roundedness. 
*   **Focus:** Transition the background to `surface-container-lowest` and add a 1px `secondary` (#486730) Ghost Border.

### Cards & Lists
*   **The No-Divider Rule:** Never use horizontal lines to separate items in a list. Use `1.5rem` of vertical white space or alternate background colors between `surface` and `surface-container-low`.
*   **Product Cards:** Images should have `md` roundedness. The price should be in `secondary` (#486730) using `title-md` to emphasize natural value.

### Signature Component: "The Harvest Tag"
*   A custom `Chip` variant. Use `secondary-container` (#c9eea9) with `on-secondary-container` (#4e6d36) text. Use these for product attributes like "Organic," "First Press," or "Farm-to-Table."

## 6. Do's and Don'ts

### Do:
*   **Do** use the kraft paper texture only on the widest `surface` areas; keep it away from text-heavy "lowest" containers to maintain readability.
*   **Do** use asymmetrical margins. For example, a left-aligned headline with a right-aligned descriptive paragraph.
*   **Do** use high-quality, "warm" lifestyle photography with a slight film-grain overlay.

### Don't:
*   **Don't** use pure black (#000000) for text. Always use `on-surface` (#1b1d0e) to keep the "warmth" of the brand intact.
*   **Don't** use standard "vibrant" notification reds. Use the `error` (#ba1a1a) and `error_container` (#ffdad6) tokens which are tuned to the earthy palette.
*   **Don't** use sharp 90-degree corners. Everything in nature is slightly weathered; use the Roundedness Scale (`DEFAULT` to `xl`) for all containers.