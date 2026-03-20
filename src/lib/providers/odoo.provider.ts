/**
 * Odoo Vehicle Provider (Stub)
 *
 * Implements VehicleProvider using OdooClient + odoo.mapper.
 * This is a stub — methods return empty arrays until Odoo vehicle model is finalized.
 */

import type { VehicleProvider } from './types';
import type { Vehicle, VehicleFilters, MakeEntry, ModelEntry } from '@/types/canonical-vehicle';
import { OdooClient } from '@/lib/odoo/client';
import { mapOdooToCanonical, mapOdooMakes, mapOdooModels } from '@/lib/mappers/odoo.mapper';
import type { OdooVehicleRecord } from '@/lib/mappers/odoo.mapper';

export class OdooProvider implements VehicleProvider {
    readonly providerId = 'odoo';
    private client: OdooClient;

    constructor() {
        this.client = new OdooClient();
    }

    async getVehicles(filters: VehicleFilters, _clientIp: string): Promise<Vehicle[]> {
        try {
            const domain: [string, string, unknown][] = [];

            if (filters.make) domain.push(['x_make', '=', filters.make]);
            if (filters.model) domain.push(['x_model', '=', filters.model]);
            if (filters.yearFrom) domain.push(['x_year', '>=', filters.yearFrom]);
            if (filters.yearTo) domain.push(['x_year', '<=', filters.yearTo]);
            if (filters.fuel) domain.push(['x_fuel', '=', filters.fuel]);
            if (filters.bodyType) domain.push(['x_body_type', '=', filters.bodyType]);
            if (filters.country) domain.push(['x_country', '=', filters.country]);

            const records: OdooVehicleRecord[] = await this.client.execute(
                'product.template',
                'search_read',
                [domain],
                {
                    limit: filters.limit || 20,
                    offset: filters.offset || 0,
                    fields: [
                        'id', 'name', 'x_make', 'x_model', 'x_year', 'x_engine_cc',
                        'x_fuel', 'x_transmission', 'x_mileage', 'x_grade', 'x_color',
                        'x_body_type', 'x_drive_type', 'x_ref_number', 'x_country',
                        'x_price', 'image_1920',
                    ],
                }
            );

            return records.map((r) => mapOdooToCanonical(r));
        } catch (error) {
            console.error('OdooProvider.getVehicles error:', error);
            return [];
        }
    }

    async getVehicleById(sourceId: string, _clientIp: string): Promise<Vehicle | null> {
        try {
            const records: OdooVehicleRecord[] = await this.client.execute(
                'product.template',
                'search_read',
                [[['id', '=', parseInt(sourceId, 10)]]],
                {
                    limit: 1,
                    fields: [
                        'id', 'name', 'x_make', 'x_model', 'x_year', 'x_engine_cc',
                        'x_fuel', 'x_transmission', 'x_mileage', 'x_grade', 'x_color',
                        'x_body_type', 'x_drive_type', 'x_ref_number', 'x_country',
                        'x_price', 'image_1920',
                    ],
                }
            );

            if (!records || records.length === 0) return null;
            return mapOdooToCanonical(records[0]);
        } catch (error) {
            console.error('OdooProvider.getVehicleById error:', error);
            return null;
        }
    }

    async getMakes(_clientIp: string): Promise<MakeEntry[]> {
        try {
            const records: OdooVehicleRecord[] = await this.client.execute(
                'product.template',
                'search_read',
                [[]],
                { fields: ['x_make'] }
            );
            return mapOdooMakes(records);
        } catch (error) {
            console.error('OdooProvider.getMakes error:', error);
            return [];
        }
    }

    async getModels(make: string, _clientIp: string): Promise<ModelEntry[]> {
        try {
            const records: OdooVehicleRecord[] = await this.client.execute(
                'product.template',
                'search_read',
                [[['x_make', '=', make]]],
                { fields: ['x_model'] }
            );
            return mapOdooModels(records);
        } catch (error) {
            console.error('OdooProvider.getModels error:', error);
            return [];
        }
    }
}
