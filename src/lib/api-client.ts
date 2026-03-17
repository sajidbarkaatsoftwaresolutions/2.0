import { AvtoVehicle, AvtoFilterParams } from "@/types/vehicle";

export async function fetchVehicles(filters?: AvtoFilterParams): Promise<AvtoVehicle[]> {
    const params = new URLSearchParams();

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                params.append(key, String(value));
            }
        });
    }

    try {
        // Because of Next.js, we must use a relative path if client-side, or absolute if server-side
        // This is safe because we use Route Handlers mostly from Client Components for dynamic filter updates
        const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/api/vehicles?${params.toString()}`);

        if (!response.ok) {
            throw new Error('API Client: fetch failed');
        }

        const data = await response.json();

        // The API returns { error: ... } if there was an issue, or an array if successful
        if (data && data.error) {
            console.error("API Error Object returned: ", data.error);
            return [];
        }

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("ApiClient request failed", error);
        return [];
    }
}
