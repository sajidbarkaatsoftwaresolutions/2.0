/**
 * Avto.jp Vehicle Provider
 *
 * Implements VehicleProvider using the existing AvtoService + avto.mapper.
 * Handles country-based table routing (Japan → 'main', China → 'china').
 */

import type { VehicleProvider } from './types';
import type { Vehicle, VehicleFilters, MakeEntry, ModelEntry } from '@/types/canonical-vehicle';
import type { AvtoVehicle } from '@/types/vehicle';
import { AvtoService } from '@/lib/services/avto.service';
import { mapAvtoToCanonical, mapAvtoMakes, mapAvtoModels } from '@/lib/mappers/avto.mapper';
import { AVTO_TABLE_MAP } from '@/lib/config/site.config';

export class AvtoProvider implements VehicleProvider {
    readonly providerId = 'avto';
    private country: string;

    constructor(country: string = 'Japan') {
        this.country = country;
    }

    /**
     * Resolve the correct Avto database table for the current country.
     */
    private getTable(): string {
        return AVTO_TABLE_MAP[this.country] || 'main';
    }

    async getVehicles(filters: VehicleFilters, clientIp: string): Promise<Vehicle[]> {
        const rawVehicles: AvtoVehicle[] = await AvtoService.getVehicles(clientIp, {
            vendor: filters.make,
            model: filters.model,
            yearFrom: filters.yearFrom,
            mileageFrom: filters.mileageFrom,
            mileageTo: filters.mileageTo,
            minRating: filters.minRating,
            limit: filters.limit || 20,
            offset: filters.offset || 0,
        }, this.getTable());

        return rawVehicles.map((v) => mapAvtoToCanonical(v, this.country));
    }

    async getVehicleById(sourceId: string, clientIp: string): Promise<Vehicle | null> {
        const rawVehicles: AvtoVehicle[] = await AvtoService.getVehicleById(clientIp, sourceId, this.getTable());

        if (!rawVehicles || rawVehicles.length === 0) return null;
        return mapAvtoToCanonical(rawVehicles[0], this.country);
    }

    async getMakes(clientIp: string): Promise<MakeEntry[]> {
        const raw = await AvtoService.getMakes(clientIp, this.getTable());
        return mapAvtoMakes(raw);
    }

    async getModels(make: string, clientIp: string): Promise<ModelEntry[]> {
        const raw = await AvtoService.getModelsByMake(clientIp, make, this.getTable());
        return mapAvtoModels(raw);
    }
}
