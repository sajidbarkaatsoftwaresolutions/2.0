import { headers } from 'next/headers';

/**
 * Extracts the true client IP from the incoming request headers.
 * Respects Cloudflare's `cf-connecting-ip` and standard proxy `x-forwarded-for`.
 */
async function extractIp(request: Request): Promise<string> {
    const headersList = await headers();

    // 1. Check Cloudflare strictly first (as requested by AVTO.JP docs)
    const cfIp = headersList.get('cf-connecting-ip');
    if (cfIp) return cfIp;

    // 2. Check standard proxy forwarding (Vercel, AWS, Nginx)
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
        // x-forwarded-for can be a comma separated list. The first one is the original client.
        return forwardedFor.split(',')[0].trim();
    }

    // 3. Check X-Real-IP (Another common Nginx/Proxy header)
    const realIp = headersList.get('x-real-ip');
    if (realIp) return realIp;

    // 4. Fallback: If no proxy headers are found, we try to extract the base URL hostname 
    // This isn't technically the "client" IP but prevents sending hardcoded 127.0.0.1 in prod edge-cases
    const host = headersList.get('host') || '';
    if (host && !host.includes('localhost')) {
        return host.split(':')[0]; // Strip port
    }

    return '127.0.0.1';
}

/**
 * Normalizes IPv6 localhost (::1) or loopback mapping to standard IPv4 127.0.0.1 
 * because the AVTO API backend crashes when it sees IPv6 strings.
 */
export async function getClientIp(request: Request): Promise<string> {
    let ip = await extractIp(request);
    if (ip === '::1' || ip.includes('::ffff:127.0.0.1')) {
        ip = '127.0.0.1';
    }
    return ip;
}
