import { NextResponse } from 'next/server';
import { getClientIp } from '@/lib/get-client-ip';
import { AvtoService } from '@/lib/services/avto.service';
import { handleApiError } from '@/lib/utils/api-error';

export async function GET(request: Request) {
    try {
        const ip = await getClientIp(request);
        const data = await AvtoService.getMakes(ip);

        // Format raw SQL aggregation into a clean generic UI array
        if (Array.isArray(data)) {
            const makes = data.map(item => ({
                name: item.MARKA_NAME,
                count: Number(item.TAG1) || item['count(*)'] || item.count || 0
            })).filter(m => m.name);

            return NextResponse.json(makes);
        }

        return NextResponse.json(data);
    } catch (error: unknown) {
        return handleApiError(error);
    }
}
