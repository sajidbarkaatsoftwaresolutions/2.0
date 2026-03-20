# Business Requirements Document (BRD)
**Project:** Chiyo Aki Used Cars Exporter Website
**Date:** March 2026

## 1. Executive Summary
The proposed system is a robust frontend portal for Chiyo Aki designed to aggregate and display global used vehicle inventory. The platform will seamlessly integrate in-house stock managed via an internal Odoo ERP system with external inventory fetched from third-party APIs (e.g., Avto.jp). The 3rd party API integration (Avto.jp) is **already functional**; the primary remaining work involves Odoo integration and the unified data abstraction layer. The platform will leverage Odoo for all backend operations including User Authentication, CRM (Leads), User Profiles/Dashboard, and Customer Support (Live Chat).

## 2. Business Objectives
- Establish an intuitive, unified marketplace for customers to seamlessly browse vehicles without caring whether they are sourced in-house or externally.
- Fully offload operational backend workflows (CRM, user profiles, authentication) to the existing Odoo infrastructure.
- Ensure the system is highly configurable (e.g., default selections, fallback lists) to prevent the need for code changes when business rules update.
- Drive lead generation natively into Odoo via embedded vehicle enquiries and WhatsApp integration.

## 3. Core Functional Requirements

### 3.1 Global System Defaults
- **Default View:** Upon initial load, the website must default to the **3rd Party** inventory source.
- **Default Country:** The default country selection must be **Japan**.
- **Configurability:** Both of these default selections must be purely configuration-driven (e.g., via Odoo or environment variables) so that they can be changed without deploying new frontend code.

### 3.2 Primary Visitor Pages
The website will feature three main customer-facing pages:
1. **Home Page:** Displays the core inventory carousels, category grids, and the unified search widget.
2. **Listing Page:** A unified results grid displaying vehicles based on user search filters or "View All" clicks.
3. **Detail Page:** The individual vehicle profile showcasing full specifications, imagery, and the lead-generating "Enquiry" CTA.

### 3.3 Homepage Layout & Sourcing Logic
The **Home Page** comprises 9 distinct display sections. Data sourcing logic depends heavily on the user's active context (In-House vs. 3rd Party):

1. **En Route:** Exclusively displays **In-House Stock** (Odoo).
2. **Latest Arrivals:** Exclusively displays **In-House Stock** (Odoo).
3. **Premium Vehicles:** 
    - *In-Stock:* Fetched from Odoo via a "premium" tag.
    - *3rd Party:* Fetched based on a configurable list of premium vehicle IDs. The system will support a **primary and secondary (fallback) list** to guarantee content when primary vehicles become unavailable.
4. **Best Deals:** Sourced identically to "Premium Vehicles" — Odoo tags for in-stock, configurable primary/secondary ID lists for 3rd party.
5. **Featured:** Sourced identically to "Premium Vehicles" — Odoo tags for in-stock, configurable primary/secondary ID lists for 3rd party.
6. **Browse by Make:**
    - The standardized Make list itself is maintained in and fetched from **Odoo**.
    - *In-Stock:* Vehicles filtered by selected make, fetched from Odoo.
    - *3rd Party:* Vehicles filtered by selected make, fetched from the active 3rd party provider for the selected country.
7. **Browse by Country:**
    - The standardized Country list is maintained in and fetched from **Odoo**.
    - *In-Stock:* Vehicles filtered by selected country, fetched from Odoo.
    - *3rd Party:* Vehicles filtered by selected country, fetched from the appropriate 3rd party provider (provider selection may vary per country).
8. **Browse by Fuel Type:**
    - The standardized Fuel Type list is maintained in and fetched from **Odoo**.
    - *In-Stock:* Vehicles filtered by selected fuel type, fetched from Odoo.
    - *3rd Party:* Vehicles filtered by selected fuel type, fetched from the active 3rd party provider.
9. **Browse by Body Type:**
    - The standardized Body Type list is maintained in and fetched from **Odoo**.
    - *In-Stock:* Vehicles filtered by selected body type, fetched from Odoo.
    - *3rd Party:* Vehicles filtered by selected body type, fetched from the active 3rd party provider.

### 3.4 Listing and Filtering Parity
- "View All" interaction on any homepage carousel/grid must direct the user to the unified **Listing Page**.
- This Listing Page must feature filter criteria exactly identical to the main Search Widget to ensure UX parity.

### 3.5 Customer Support & Lead Generation
- **Authentication & User Management:** User sign-up, login, dashboard, and profiles will be entirely handled and managed by Odoo. The website is purely a frontend for Odoo.
- **User Profile & Dashboard:** User profile pages, order history, and account dashboards will be rendered from Odoo data. The website will not maintain its own user database.
- **Live Chat:** Native Odoo Live Chat must be integrated directly into the frontend website for customer support.
- **WhatsApp Support:** Integration of an external WhatsApp chat widget for direct customer communication.
- **Lead Capture (Enquiry):** Every individual **vehicle card** (on Home Page carousels, Listing Page grids, and the Detail Page) must feature an "Enquiry" button. Submitting an enquiry must automatically generate a CRM Lead inside the Odoo system.

### 3.6 Country-Specific 3rd Party Provider Logic
- The country selected by the user determines which 3rd party API provider is used.
- A single provider may serve multiple countries (e.g., Avto.jp serves Japan and China).
- Different countries may require entirely different API providers (e.g., Australia, Thailand may need separate vendors).
- For Avto.jp specifically, China uses a separate database table from Japan.

## 4. Operational Assumptions
- The 3rd party API integration (Avto.jp) is **already functional** and currently serves as the primary data source.
- In-house stock will be pulled from Odoo once that integration is complete.
- Odoo will serve as the master source of truth for standard categorical data (Makes, Countries, Body Types, Fuel Types).
- Third-party vehicles will be fluid, requiring intelligent fallback logic to ensure grids never appear empty if external vehicles drop off the market.
