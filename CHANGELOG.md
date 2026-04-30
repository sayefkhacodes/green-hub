# Changelog

All notable changes to The Green Hub project are documented here. The project follows two sprint cycles as defined in the Agile Scrum methodology.

## Sprint 2 (25–30 April 2026)

### Added
- Shopping cart with localStorage persistence and live CO₂ calculation
- Mock checkout flow with order persistence to Supabase
- Order confirmation page
- User dashboard showing cumulative CO₂ saved across all orders
- Impact equivalents on dashboard (trees, kilometres of car emissions)
- Conditional navbar reflecting authentication state
- About and FAQ pages
- vercel.json rewrite rule for SPA routing

### Fixed
- 404 errors on direct navigation to deep routes
- CSS heading overlap caused by missing line-height
- Product detail page layout on mobile devices
- Image fade-in animation for smoother loading

## Sprint 1 (20–24 April 2026)

### Added
- Supabase project setup with PostgreSQL backend
- Database schema with five tables (categories, products, reviews, orders, order_items)
- Row Level Security (RLS) policies on all tables
- Seeded 16 eco-friendly products across 4 categories
- React + Vite frontend scaffolded with React Router
- Product catalogue and product detail pages
- User authentication via Supabase (signup, login, logout, persistent sessions)
- Initial deployment to Vercel
- Light theme enforced across the application

