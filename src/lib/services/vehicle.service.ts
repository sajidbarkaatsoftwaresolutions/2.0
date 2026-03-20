/**
 * Unified Vehicle Service
 *
 * High-level service consumed by API routes and React Server Components.
 * Delegates to the correct provider via the provider factory.
 */

import type { Vehicle, VehicleFilters, MakeEntry, ModelEntry } from '@/types/canonical-vehicle';
import type { InventorySource } from '@/lib/config/site.config';
import { DEFAULT_INVENTORY_SOURCE, DEFAULT_COUNTRY } from '@/lib/config/site.config';
import { getProvider } from '@/lib/providers/provider.factory';

export class VehicleService {
    /**
     * Search vehicles using canonical filters.
     */
    static async searchVehicles(
        filters: VehicleFilters,
        clientIp: string,
        source: InventorySource = DEFAULT_INVENTORY_SOURCE,
        country: string = DEFAULT_COUNTRY,
    ): Promise<Vehicle[]> {
        const provider = getProvider(source, country);
        return provider.getVehicles(filters, clientIp);
    }

    /**
     * Get a single vehicle by its canonical ID (e.g., "avto_12345" or "odoo_67").
     */
    static async getVehicleById(
        canonicalId: string,
        clientIp: string,
        source?: InventorySource,
        country?: string,
    ): Promise<Vehicle | null> {
        // Parse the canonical ID to determine the source
        const [idSource, ...idParts] = canonicalId.split('_');
        const sourceId = idParts.join('_');

        const resolvedSource = source || (idSource === 'odoo' ? 'in_house' : '3rd_party') as InventorySource;
        const resolvedCountry = country || DEFAULT_COUNTRY;

        const provider = getProvider(resolvedSource, resolvedCountry);
        return provider.getVehicleById(sourceId, clientIp);
    }

    /**
     * Get the list of makes from the active provider.
     */
    static async getMakes(
        clientIp: string,
        source: InventorySource = DEFAULT_INVENTORY_SOURCE,
        country: string = DEFAULT_COUNTRY,
    ): Promise<MakeEntry[]> {
        const provider = getProvider(source, country);
        return provider.getMakes(clientIp);
    }

    /**
     * Get models for a specific make from the active provider.
     */
    static async getModels(
        make: string,
        clientIp: string,
        source: InventorySource = DEFAULT_INVENTORY_SOURCE,
        country: string = DEFAULT_COUNTRY,
    ): Promise<ModelEntry[]> {
        const provider = getProvider(source, country);
        return provider.getModels(make, clientIp);
    }
}
