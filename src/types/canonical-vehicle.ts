/**
 * Canonical Vehicle Model
 *
 * Every React component consumes this interface exclusively.
 * Mappers convert provider-specific responses (Avto, Odoo, etc.) into this shape.
 */

export interface Vehicle {
    /** Internal canonical ID (format: "{source}_{sourceId}") */
    id: string;
    /** Which system provided this vehicle */
    source: 'odoo' | 'avto' | string;
    /** The original ID from the source system */
    sourceId: string;

    // ─── Core Identity ─────────────────────────────────────────
    make: string;
    model: string;
    year: number;
    refNumber: string;

    // ─── Specifications ────────────────────────────────────────
    engineCC: number;
    fuel: string;
    transmission: string;
    mileage: number;
    grade: string;
    color: string;
    bodyType: string;
    driveType: string;

    // ─── Media ─────────────────────────────────────────────────
    imageUrl: string;
    thumbnailUrl: string;
    images: string[];

    // ─── Pricing ───────────────────────────────────────────────
    price?: number;
    avgPrice?: number;

    // ─── Provenance ────────────────────────────────────────────
    country: string;
    auction?: string;
    auctionDate?: string;
    status?: string;
}

/**
 * Standardised filter parameters accepted by the unified vehicle service.
 */
export interface VehicleFilters {
    make?: string;
    model?: string;
    yearFrom?: number;
    yearTo?: number;
    mileageFrom?: number;
    mileageTo?: number;
    minRating?: number;
    fuel?: string;
    bodyType?: string;
    country?: string;
    limit?: number;
    offset?: number;
}

/**
 * Lightweight make/model reference used by dropdowns and grids.
 */
export interface MakeEntry {
    name: string;
    count: number;
}

export interface ModelEntry {
    name: string;
    count: number;
}
