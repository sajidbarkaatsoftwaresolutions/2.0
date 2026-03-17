/**
 * AVTO.JP Fuel Code Mapping
 * Docs: P-petrol, D-diesel, E-electro, H-hybrid, HE-hybrid erev, L-LPG, C-CNG, O-other
 */
export const FUEL_CODES: Record<string, string> = {
    P: 'Petrol',
    D: 'Diesel',
    E: 'Electric',
    H: 'Hybrid',
    HE: 'Hybrid EREV',
    L: 'LPG',
    C: 'CNG',
    O: 'Other',
};

export function decodeFuel(code: string | undefined): string {
    if (!code) return 'N/A';
    return FUEL_CODES[code.toUpperCase()] || code;
}
