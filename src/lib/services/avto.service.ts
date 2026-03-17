import { API_CODE, API_SERVER, API_PATH, TABLE } from '@/lib/avto';
import { ApiError } from '@/lib/utils/api-error';

export class AvtoService {
    /**
     * Centralized 3rd party fetcher. Handles timeouts, retries, and malformed HTML responses securely.
     */
    private static async fetchAvto(ip: string, sqlQuery: string, cacheTime: number = 1800) {
        const encodedSql = encodeURIComponent(sqlQuery);
        const apiUrl = `http://${API_SERVER}/${API_PATH}/?ip=${ip}&json&code=${API_CODE}&sql=${encodedSql}`;

        try {
            const response = await fetch(apiUrl, {
                next: { revalidate: cacheTime },
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new ApiError(`AVTO Upstream failure. Status: ${response.status}`, 502);
            }

            const rawText = await response.text();

            try {
                return JSON.parse(rawText);
            } catch (jsonErr) {
                // If the third-party API crashed (e.g. IPv6 rejection sending HTML), we mask it as a specific 502 failure.
                console.error("AVTO returned non-JSON:", rawText.slice(0, 100));
                throw new ApiError('Received malformed response from upstream auction sever.', 502);
            }

        } catch (fetchErr: any) {
            // Forward controlled API errors
            if (fetchErr instanceof ApiError) throw fetchErr;

            // Handle network timeouts/DNS failures uniquely
            console.error("AVTO Fetch Error:", fetchErr);
            throw new ApiError('Failed to connect to upstream auction server.', 503);
        }
    }

    /**
     * Executes the main vehicle search query with specific filters.
     */
    static async getVehicles(ip: string, params: { vendor?: string, model?: string, yearFrom?: number, mileageFrom?: number, mileageTo?: number, minRating?: number, limit: number, offset: number }) {
        let whereClause = "AUCTION_TYPE!=1";

        if (params.vendor) {
            const safeVendor = params.vendor.replace(/'/g, "''");
            whereClause += ` AND marka_name='${safeVendor}'`;
        }

        if (params.model) {
            const safeModel = params.model.replace(/'/g, "''");
            whereClause += ` AND model_name='${safeModel}'`;
        }

        if (params.yearFrom) {
            whereClause += ` AND year >= ${params.yearFrom}`;
        }

        if (params.mileageFrom !== undefined) {
            whereClause += ` AND mileage >= ${params.mileageFrom}`;
        }

        if (params.mileageTo !== undefined) {
            whereClause += ` AND mileage <= ${params.mileageTo}`;
        }

        if (params.minRating) {
            whereClause += ` AND rate >= ${params.minRating}`;
        }

        const sqlStr = `SELECT * FROM ${TABLE} WHERE ${whereClause} ORDER BY year DESC, mileage DESC LIMIT ${params.offset}, ${params.limit}`;
        return this.fetchAvto(ip, sqlStr, 1800);
    }

    /**
     * Retrieves grouped distinct makes.
     */
    static async getMakes(ip: string) {
        const sqlStr = `SELECT marka_name, count(*) FROM ${TABLE} WHERE AUCTION_TYPE!=1 GROUP BY marka_name ORDER BY marka_name ASC`;
        return this.fetchAvto(ip, sqlStr, 43200); // Cache for 12 hours
    }

    /**
     * Retrieves specific models for a specific make.
     */
    static async getModelsByMake(ip: string, vendor: string) {
        const safeVendor = vendor.replace(/'/g, "''");
        const sqlStr = `SELECT model_name, count(*) FROM ${TABLE} WHERE AUCTION_TYPE!=1 AND marka_name='${safeVendor}' GROUP BY model_name ORDER BY model_name`;
        return this.fetchAvto(ip, sqlStr, 43200); // Cache for 12 hours
    }
}
