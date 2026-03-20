/**
 * Vehicle Provider Interface
 *
 * Defines the contract that every data provider (Avto, Odoo, future providers)
 * must implement. All methods return canonical types.
 */

import type { Vehicle, VehicleFilters, MakeEntry, ModelEntry } from '@/types/canonical-vehicle';

export interface VehicleProvider {
    /** Unique provider identifier */
    readonly providerId: string;

    /** Search vehicles with filters, returns canonical Vehicle[] */
    getVehicles(filters: VehicleFilters, clientIp: string): Promise<Vehicle[]>;

    /** Get a single vehicle by its source-specific ID */
    getVehicleById(sourceId: string, clientIp: string): Promise<Vehicle | null>;

    /** Get list of makes with counts */
    getMakes(clientIp: string): Promise<MakeEntry[]>;

    /** Get models for a specific make */
    getModels(make: string, clientIp: string): Promise<ModelEntry[]>;
}
