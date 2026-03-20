/**
 * Odoo → Canonical Vehicle Mapper (Stub)
 *
 * Converts Odoo product.template records into the unified Vehicle interface.
 * This is a stub implementation — field mappings will be finalized once
 * the Odoo vehicle data model is confirmed.
 */

import type { Vehicle, MakeEntry, ModelEntry } from '@/types/canonical-vehicle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface OdooVehicleRecord {
    id: number;
    name?: string;
    x_make?: string;
    x_model?: string;
    x_year?: number;
    x_engine_cc?: number;
    x_fuel?: string;
    x_transmission?: string;
    x_mileage?: number;
    x_grade?: string;
    x_color?: string;
    x_body_type?: string;
    x_drive_type?: string;
    x_ref_number?: string;
    x_country?: string;
    x_price?: number;
    image_1920?: string; // Base64 product image
    [key: string]: unknown;
}

export function mapOdooToCanonical(raw: OdooVehicleRecord): Vehicle {
    return {
        id: `odoo_${raw.id}`,
        source: 'odoo',
        sourceId: String(raw.id),

        make: raw.x_make || '',
        model: raw.x_model || '',
        year: raw.x_year || 0,
        refNumber: raw.x_ref_number || '',

        engineCC: raw.x_engine_cc || 0,
        fuel: raw.x_fuel || 'N/A',
        transmission: raw.x_transmission || 'N/A',
        mileage: raw.x_mileage || 0,
        grade: raw.x_grade || '',
        color: raw.x_color || '',
        bodyType: raw.x_body_type || '',
        driveType: raw.x_drive_type || '',

        imageUrl: raw.image_1920
            ? `data:image/png;base64,${raw.image_1920}`
            : '/placeholder-car.png',
        thumbnailUrl: raw.image_1920
            ? `data:image/png;base64,${raw.image_1920}`
            : '/placeholder-car.png',
        images: raw.image_1920
            ? [`data:image/png;base64,${raw.image_1920}`]
            : [],

        price: raw.x_price,
        country: raw.x_country || '',
    };
}

export function mapOdooMakes(raw: OdooVehicleRecord[]): MakeEntry[] {
    const counts: Record<string, number> = {};
    for (const v of raw) {
        const make = v.x_make || 'Unknown';
        counts[make] = (counts[make] || 0) + 1;
    }
    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function mapOdooModels(raw: OdooVehicleRecord[]): ModelEntry[] {
    const counts: Record<string, number> = {};
    for (const v of raw) {
        const model = v.x_model || 'Unknown';
        counts[model] = (counts[model] || 0) + 1;
    }
    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));
}
