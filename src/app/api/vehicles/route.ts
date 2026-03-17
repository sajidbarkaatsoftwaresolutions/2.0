import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp } from '@/lib/get-client-ip';
import { AvtoService } from '@/lib/services/avto.service';
import { handleApiError } from '@/lib/utils/api-error';

// Define the incoming query schema strictly
const VehiclesQuerySchema = z.object({
    vendor: z.string().optional(),
    model: z.string().optional(),
    year_from: z.coerce.number().min(1900).max(new Date().getFullYear() + 1).optional(),
    mileage_from: z.coerce.number().min(0).optional(),
    mileage_to: z.coerce.number().min(0).optional(),
    min_rating: z.coerce.number().min(0).max(5).optional(),
    limit: z.coerce.number().min(1).max(100).default(20),
    offset: z.coerce.number().min(0).default(0),
    order_by: z.string().optional(),
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // 1. Zod Validation: Safely parse and coerce all raw query strings
        const parsed = VehiclesQuerySchema.safeParse(Object.fromEntries(searchParams));

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Invalid query parameters', details: parsed.error.format() },
                { status: 400 }
            );
        }

        const query = parsed.data;

        // 2. Extract Client IP
        const ip = await getClientIp(request);

        // 3. Delegate business/fetching logic to the Service Layer
        const rawData = await AvtoService.getVehicles(ip, {
            vendor: query.vendor,
            model: query.model,
            yearFrom: query.year_from,
            mileageFrom: query.mileage_from,
            mileageTo: query.mileage_to,
            minRating: query.min_rating,
            limit: query.limit,
            offset: query.offset
        });

        // 4. Return clean response
        return NextResponse.json(rawData);

    } catch (error: unknown) {
        // 5. Centralized Error Handling
        return handleApiError(error);
    }
}
