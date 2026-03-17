import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp } from '@/lib/get-client-ip';
import { AvtoService } from '@/lib/services/avto.service';
import { handleApiError } from '@/lib/utils/api-error';

const ModelsQuerySchema = z.object({
    vendor: z.string().min(1, 'Vendor parameter is strictly required'),
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Zod Input Validation
        const parsed = ModelsQuerySchema.safeParse({
            vendor: searchParams.get('vendor'),
        });

        if (!parsed.success) {
            return NextResponse.json({
                error: 'Invalid parameters',
                details: parsed.error.format()
            }, { status: 400 });
        }

        const ip = await getClientIp(request);
        const data = await AvtoService.getModelsByMake(ip, parsed.data.vendor);

        if (Array.isArray(data)) {
            const models = data.map(item => ({
                name: item.MODEL_NAME,
                count: Number(item.TAG1) || item['count(*)'] || item.count || 0
            })).filter(m => m.name);

            return NextResponse.json(models);
        }

        return NextResponse.json(data);
    } catch (error: unknown) {
        return handleApiError(error);
    }
}
