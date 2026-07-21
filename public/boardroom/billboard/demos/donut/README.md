# A Hole in One — Gourmet Donuts

A fixed, single-screen website based on the approved A Hole in One mockup.

## Run locally

Open `index.html` directly, or serve this folder with VS Code Live Server.

## Interaction model

Exactly five customer-facing controls open overlays:

1. The Menu
2. Our Story
3. Locations
4. Catering
5. Order Now

Each overlay has its own background colour and closes via its close button, the backdrop, or Escape.

## Assets

Primary reusable image paths:

- `assets/images/donut1.webp` — hero artwork
- `assets/images/donut2.webp` — ingredients plaque image
- `assets/images/donut3.webp` — handcrafted plaque image
- `assets/images/donut4.webp` — delight plaque image

Supporting files:

- `assets/images/logo.webp`

## Notes

- No scrolling is required at standard desktop sizes.
- The page scales to the available viewport while preserving the 3:2 design canvas.
- No external libraries, APIs, fonts, or network resources are required.
- The order form is a working front-end prototype. Its submit action is deliberately local until a real ordering endpoint is supplied.
