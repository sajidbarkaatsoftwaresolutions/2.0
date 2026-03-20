/**
 * Chiyo Aki — Site Configuration
 *
 * All runtime defaults and provider mappings live here.
 * Change these values to reconfigure the site without touching component code.
 */

// ─── Inventory Source ────────────────────────────────────────────────
export type InventorySource = '3rd_party' | 'in_house';

export const DEFAULT_INVENTORY_SOURCE: InventorySource =
    (process.env.NEXT_PUBLIC_DEFAULT_INVENTORY_SOURCE as InventorySource) || '3rd_party';

export const DEFAULT_COUNTRY: string =
    process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || 'Japan';

// ─── Provider IDs ────────────────────────────────────────────────────
export type ProviderId = 'avto' | 'odoo';

/**
 * Maps a country name → the 3rd-party provider that serves it.
 * If a country is not listed here, the system will gracefully degrade.
 */
export const COUNTRY_PROVIDER_MAP: Record<string, ProviderId> = {
    Japan: 'avto',
    China: 'avto',
    // Future: Australia: 'providerX', Thailand: 'providerY', etc.
};

/**
 * Avto.jp uses different database tables per country.
 * Default is 'main' (Japan). China uses 'china'.
 */
export const AVTO_TABLE_MAP: Record<string, string> = {
    Japan: 'main',
    China: 'china',
};

// ─── Fallback Vehicle Lists (3rd-Party Curated Sections) ─────────────
// These are Avto LOT numbers (or external IDs) used when the user is
// browsing 3rd-party mode. Primary list is tried first; if vehicles are
// no longer available, the secondary list is used as a fallback.

export const PREMIUM_PRIMARY: string[] = [];
export const PREMIUM_SECONDARY: string[] = [];

export const BEST_DEALS_PRIMARY: string[] = [];
export const BEST_DEALS_SECONDARY: string[] = [];

export const FEATURED_PRIMARY: string[] = [];
export const FEATURED_SECONDARY: string[] = [];
