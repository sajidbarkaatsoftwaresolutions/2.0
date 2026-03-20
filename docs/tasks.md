# Project Implementation Tasks

This document tracks the technical implementation of the features outlined in the BRD and TRD, distinguishing between what is currently integrated and what remains to be built.

## ✅ Phase 1: Completed Integrations
- [x] **Core UI Framework:** Initialized Next.js, Tailwind CSS, Shadcn UI components.
- [x] **Base Routing & Localization:** Established Next-intl internationalized routing architecture (`/[locale]/...`).
- [x] **Global Layout & Header:** Built responsive `Header` with updated Log In/Sign Up icons, removed promotional clatter, optimized mobile spacing.
- [x] **Home Page Layout Engine:** Extracted `HeroBanner.tsx`, implemented visual shells for `SearchWidget`, `VehicleCarousel`, `TabbedVehicleGrid`, and `CategoryGrid`.
- [x] **Basic API Stubs:** Configured initial Avto.jp API connectivity tests and raw endpoint stubs (`/api/vehicles`).

## ⏳ Phase 2: Canonical Data & Configuration (Pending)
- [ ] **Task 2.1:** Setup Global Configuration Flags (e.g., `DEFAULT_INVENTORY_SOURCE = '3rd_party'`, `DEFAULT_COUNTRY = 'Japan'`).
- [ ] **Task 2.2:** Define Canonical `Vehicle` TypeScript Interface to normalize structured data.
- [ ] **Task 2.3:** Implement `mapOdooToCanonical` XML-RPC adapter function.
- [ ] **Task 2.4:** Implement `mapAvtoToCanonical` third-party adapter function.
- [ ] **Task 2.5:** Create configuration arrays for 3rd-party fallback lists (Primary vs. Secondary logic for Premium, Best Deals, Featured).

## ⏳ Phase 3: Core Data Fetching & Content Strategy (Pending)
- [ ] **Task 3.1:** Implement `ProviderStrategy` router (dynamically fetching from Odoo vs 3rd Party based on URL parameters or global context).
- [ ] **Task 3.2:** Update `SearchWidget` dropdowns to fetch standardized categorical metadata (Makes, Countries, Fuel, Body) directly from the Odoo master list.
- [ ] **Task 3.3:** Wire up Homepage "Latest Arrivals" and "En Route" sections to fetch *exclusively* In-House Odoo stock.
- [ ] **Task 3.4:** Wire up Homepage "Premium", "Best Deals", "Featured" to execute the configurable primary/secondary lists when active in 3rd Party mode.
- [ ] **Task 3.5:** Wire up Category Grids (Browse by Make/Country) to execute categorized fetches against the Active Provider.

## ⏳ Phase 4: Main Visitor Pages Implementation (Pending)
- [ ] **Task 4.1:** Develop `Listing Page` (`/vehicles`).
  - [ ] Implement robust filter parsing from URL search parameters (`?make=toyota&source=3rd_party`).
  - [ ] Build paginated Grid layout rendering standard Canonical Vehicle cards.
- [ ] **Task 4.2:** Develop `Detail Page` (`/vehicles/[id]`).
  - [ ] Implement single-vehicle fetch adapter bridging external IDs and internal IDs.
  - [ ] Design comprehensive vehicle specification layout and hero image gallery.

## ⏳ Phase 5: CRM & Customer Support Integrations (Pending)
- [ ] **Task 5.1:** Develop Odoo "Enquiry" Lead Generation API route (`POST /api/enquiry` -> Odoo `crm.lead`).
- [ ] **Task 5.2:** Embed Enquiry Form prominently on the Detail Page tied to the active Canonical Vehicle metadata.
- [ ] **Task 5.3:** Inject native Odoo Live Chat JavaScript snippet globally into `layout.tsx`.
- [ ] **Task 5.4:** Integrate floating WhatsApp Widget component into `layout.tsx`.
- [ ] **Task 5.5:** Connect Header Log in / Sign up link workflows to trigger direct Odoo Authentication via SSO/OAuth.
