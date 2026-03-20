# Technical Requirements Document (TRD)
**Project:** Chiyo Aki Used Cars Exporter Website
**Date:** March 2026

## 1. Architecture Overview
The system relies on a hybrid data aggregation architecture. The Next.js frontend acts as an orchestration layer, seamlessly fusing data from the primary internal backend (Odoo XML-RPC/REST) and disparate third-party external APIs (e.g., Avto.jp).

> **Note:** The 3rd party API integration (Avto.jp) is **already functional**. The primary remaining technical work involves Odoo integration and the unified data abstraction layer.

- **Frontend:** Next.js (React) utilizing Tailwind CSS.
- **Backend (Auth/State/CRM):** Headless Odoo setup (authentication, user profiles, dashboards, CRM leads).
- **External Data Providers:** Avto.jp (Japan/China), plus future country-specific API vendors.

## 2. Technical Requirements

### 2.1 Configurable Feature Flags
- The system must implement a robust configuration fetching mechanism (e.g., from an Odoo settings endpoint or centralized config map) on application boot.
- Variables MUST include: `DEFAULT_INVENTORY_SOURCE` (default: '3rd_party') and `DEFAULT_COUNTRY` (default: 'Japan').
- Variables MUST include fallback listing configurations: `PRIMARY_PREMIUM_LIST`, `SECONDARY_PREMIUM_LIST`, `PRIMARY_BEST_DEALS_LIST`, etc., represented as arrays of external Vehicle IDs or complex filter objects.

### 2.2 Canonical Vehicle Data Model
Due to the disparity in JSON structures returned by Odoo and external third parties, the backend/BFF (Backend for Frontend) must implement an **Adapter Pattern**. 
- A rigorous Canonical Vehicle Model must be defined in TypeScript (`Vehicle` interface).
- **Mappers:** Development of distinct mappers (`mapOdooToCanonical`, `mapAvtoToCanonical`, `mapProviderXToCanonical`).
- All React components will exclusively consume the Canonical Model, remaining entirely ignorant of the underlying data source (Odoo vs. 3rd Party).

### 2.3 Third-Party Provider Routing Strategy
Data fetching from third-party APIs requires selective routing based on the **Country** parameter.
- **Avto.jp Integration:** Avto will be used when `country === 'Japan'` or `country === 'China'`. For China, queries must be routed to the distinct Chinese database table (table name: `china`) as documented by the provider.
- **Country-Provider Mapping:** The same API provider may serve multiple countries, or separate providers may be needed per country. The system must maintain a configurable **Country → Provider** mapping.
- **Extensible Provider Factory:** The API client architecture must utilize a Factory or Strategy pattern (`ProviderStrategy`). If a user selects 'Australia' or 'Thailand' (for 3rd Party data), the system must dynamically route the request to the correct, future-implemented API provider for that region. If no provider is configured for a country, the system should gracefully degrade.

### 2.4 Metadata Synchronization
Categorical reference data (Makes, Models, Body Types, Fuel Types, Countries) forms the filter foundation.
- The definitive source of truth for these lists is **Odoo**.
- The frontend must retrieve these standardized lists from Odoo on build or runtime. 
- When a user requests 3rd party vehicles filtered by an Odoo-standard Make, the external API client must perform value translation if the 3rd party API uses a different nomenclature natively.

### 2.5 Core Routing & Page Technical Specs
The frontend routing layout strictly adheres to the three primary visitor pages defined in the BRD:

1. **Home Page (`/`):** 
   - Mounts the global `SearchWidget`.
   - Mounts static 'En Route' and 'Latest Arrivals' components querying the Odoo RPC client directly.
   - Mounts dynamic components ('Premium', 'Featured') executing the 3rd-party fallback strategy abstraction.
2. **Listing Page (`/vehicles`):** 
   - A unified grid route (e.g., `/vehicles?source=3rd_party&filter=premium`).
   - Inherits filter URL state and utilizes the Canonical Data rendering components exactly matching the Search Widget results.
3. **Detail Page (`/vehicles/[id]`):** 
   - Executes singular external/internal data fetching via the adapter layer.
   - Mounts the `VehicleProfile` and embeds the Lead Capture "Enquiry" form.

### 2.6 Odoo Integrations (CRM, Auth & User Management)
- **Authentication:** Implementation of NextAuth.js (or similar session management) utilizing custom generic credentials or OAuth linking directly to the Odoo authentication endpoint.
- **User Profiles & Dashboard:** User profile pages, dashboard, and account management will be rendered from Odoo data via XML-RPC/REST API calls. The website does not maintain its own user database — it acts purely as a frontend for Odoo.
- **Lead Generation (Enquiry):** An "Enquiry" button must be present on every **vehicle card** (across Home Page carousels, Listing Page grids, and the Detail Page). Clicking it must fire a `POST` request to an intermediary API route (`/api/enquiry`), which constructs and transmits an XML-RPC payload to create a `crm.lead` record inside Odoo, binding the specific canonical Vehicle ID and Provider source to the lead.
- **Live Chat:** Injection of Odoo's Live Chat JavaScript snippet into the global `layout.tsx`.
- **WhatsApp Integration:** A floating WhatsApp chat widget must be embedded globally. This requires injecting a third-party WhatsApp Business API widget script (e.g., via `<Script>` in `layout.tsx`) configured with the business WhatsApp number.

## 3. Anticipated Complexities & Mitigation
1. **3rd Party Vehicle Volatility:** External premium vehicles may be sold and removed from API providers without notification. 
   - *Mitigation:* The API abstraction layer for `getPremiumVehicles(source='3rd_party')` must attempt to fetch the Primary Config List. Upon receiving 404s or empty datasets for specific IDs, it must silently fallback to the Secondary Config List to ensure the UI carousel is always populated.
2. **Pagination Cross-Platform:** Implementing unified complex search criteria pagination when standardizing across varying API offsets/limits.
   - *Mitigation:* Pagination logic will remain isolated per provider strategy rather than attempting a complex unified cursor.
