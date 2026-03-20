/**
 * Provider Factory
 *
 * Returns the correct VehicleProvider based on inventory source and country.
 * Uses COUNTRY_PROVIDER_MAP from site config to route 3rd-party requests
 * to the appropriate external API provider.
 */

import type { VehicleProvider } from './types';
import type { InventorySource } from '@/lib/config/site.config';
import { COUNTRY_PROVIDER_MAP } from '@/lib/config/site.config';
import { AvtoProvider } from './avto.provider';
import { OdooProvider } from './odoo.provider';

/**
 * Get the appropriate vehicle data provider.
 *
 * @param source - 'in_house' routes to Odoo; '3rd_party' routes based on country
 * @param country - Used to determine which 3rd-party API to call
 * @returns A VehicleProvider instance
 * @throws Error if no provider is configured for the given country in 3rd-party mode
 */
export function getProvider(source: InventorySource, country: string): VehicleProvider {
    if (source === 'in_house') {
        return new OdooProvider();
    }

    // 3rd party mode — resolve provider by country
    const providerId = COUNTRY_PROVIDER_MAP[country];

    if (!providerId) {
        console.warn(`No 3rd-party provider configured for country: ${country}. Falling back to Odoo.`);
        return new OdooProvider();
    }

    switch (providerId) {
        case 'avto':
            return new AvtoProvider(country);
        // Future providers:
        // case 'providerX':
        //   return new ProviderXProvider(country);
        default:
            console.warn(`Unknown provider ID: ${providerId}. Falling back to Odoo.`);
            return new OdooProvider();
    }
}
