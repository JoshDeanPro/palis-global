# Palis Global — Standardized Platform

Professional, monochromatic digital ecosystem for occult magic and intuitive guidance.

## Standardized Stack
- **Framework**: React 18 (Vite)
- **Styling**: TailwindCSS + Vanilla CSS (Monochromatic 'Slate & Obsidian' Branding)
- **Database / Auth**: Supabase
- **Deployment**: Production Ready (Vite Build)

## Key Pages
- **Landing**: Atmospheric, brutalist-editorial design.
- **Shop**: Monochromatically standardized merch store.
- **Portal**: Private sanctuary for ritual records and history.

## Setup
1. `npm install`
2. Create a `.env` file from the provided `.env.example`.
3. Provide your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Run `npm run dev` for local development.
5. Run `npm run build` for production distribution.

## Architecture
The project follows a modular React pattern:
- `/src/components/layout`: Shared structural components (Navbar, Footer).
- `/src/components/ui`: Atomic UI elements (Buttons, Cards, Badges).
- `/src/pages`: Route-specific page components.
- `/src/styles`: Reusable CSS/SCSS design system.
- `/src/utils`: Utilities like the Supabase client.

---
© 2026 Palis Global. All rights reserved.
