/**
 * Avto.jp → Canonical Vehicle Mapper
 *
 * Converts raw AvtoVehicle objects from the AVTO.JP API
 * into the unified Vehicle interface consumed by all components.
 */

import type { AvtoVehicle } from '@/types/vehicle';
import type { Vehicle, MakeEntry, ModelEntry } from '@/types/canonical-vehicle';
import { decodeFuel } from '@/lib/fuel-codes';

/**
 * Parse the Avto IMAGES hash string into an array of image URLs.
 * Raw format: "hash1###hash2###hash3" → full URLs with medium sizing.
 */
function parseAvtoImages(imagesStr: string | undefined): string[] {
    if (!imagesStr) return [];
    return imagesStr
        .split('###')
        .filter(Boolean)
        .map((hash) => `https://8.ajes.com/imgs/${hash}&w=320`);
}

/**
 * Get the primary display image (medium size) from the IMAGES hash.
 */
function getPrimaryImage(imagesStr: string | undefined): string {
    const images = parseAvtoImages(imagesStr);
    return images[0] || '/placeholder-car.png';
}

/**
 * Get the thumbnail image (small size) from the IMAGES hash.
 */
function getThumbnail(imagesStr: string | undefined): string {
    if (!imagesStr) return '/placeholder-car.png';
    const hash = imagesStr.split('###')[0];
    if (!hash) return '/placeholder-car.png';
    return `https://8.ajes.com/imgs/${hash}&h=50`;
}

/**
 * Decode Avto KPP transmission codes to human-readable strings.
 */
function decodeTransmission(kpp: string | undefined, kppType: string | undefined): string {
    if (kppType === 'AT' || kpp === 'AT') return 'Automatic';
    if (kppType === 'MT' || kpp === 'MT') return 'Manual';
    if (kppType === 'CVT' || kpp === 'CVT') return 'CVT';
    return kpp || 'N/A';
}

/**
 * Decode Avto PRIV drive type codes.
 */
function decodeDriveType(priv: string | undefined): string {
    if (!priv) return 'N/A';
    const upper = priv.toUpperCase();
    if (upper === '2WD' || upper === 'FF' || upper === 'FR') return '2WD';
    if (upper === '4WD' || upper === 'AWD') return '4WD';
    return priv;
}

// ─── Main Mapper ─────────────────────────────────────────────────────

export function mapAvtoToCanonical(raw: AvtoVehicle, country: string = 'Japan'): Vehicle {
    return {
        id: `avto_${raw.ID}`,
        source: 'avto',
        sourceId: raw.ID,

        make: raw.MARKA_NAME || '',
        model: raw.MODEL_NAME || '',
        year: parseInt(raw.YEAR, 10) || 0,
        refNumber: raw.LOT || '',

        engineCC: parseInt(raw.ENG_V, 10) || 0,
        fuel: decodeFuel(raw.FUEL),
        transmission: decodeTransmission(raw.KPP, raw.KPP_TYPE),
        mileage: parseInt(raw.MILEAGE, 10) || 0,
        grade: raw.GRADE || '',
        color: raw.COLOR || '',
        bodyType: raw.KUZOV || '',
        driveType: decodeDriveType(raw.PRIV),

        imageUrl: getPrimaryImage(raw.IMAGES),
        thumbnailUrl: getThumbnail(raw.IMAGES),
        images: parseAvtoImages(raw.IMAGES),

        price: raw.START ? parseInt(raw.START, 10) : undefined,
        avgPrice: raw.AVG_PRICE ? parseInt(raw.AVG_PRICE, 10) : undefined,

        country,
        auction: raw.AUCTION || undefined,
        auctionDate: raw.AUCTION_DATE || undefined,
        status: raw.STATUS || undefined,
    };
}

// ─── List Mappers ────────────────────────────────────────────────────

export function mapAvtoMakes(raw: Record<string, string>[]): MakeEntry[] {
    return raw.map((row) => ({
        name: row['marka_name'] || row['MARKA_NAME'] || '',
        count: parseInt(row['count(*)'] || row['COUNT(*)'] || '0', 10),
    }));
}

export function mapAvtoModels(raw: Record<string, string>[]): ModelEntry[] {
    return raw.map((row) => ({
        name: row['model_name'] || row['MODEL_NAME'] || '',
        count: parseInt(row['count(*)'] || row['COUNT(*)'] || '0', 10),
    }));
}
