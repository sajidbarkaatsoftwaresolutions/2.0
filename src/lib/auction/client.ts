import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export class AuctionClient {
    private url: string;
    private code: string;
    private parser: XMLParser;

    constructor() {
        this.url = process.env.AUCTION_API_URL || '';
        this.code = process.env.AUCTION_API_CODE || '';
        this.parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
    }

    async query(sql: string): Promise<any> {
        try {
            const response = await axios.get(this.url, {
                params: {
                    code: this.code,
                    sql: sql
                }
            });

            // API returns XML, we parse it to JSON
            if (response.headers['content-type']?.includes('xml') || typeof response.data === 'string') {
                const parsed = this.parser.parse(response.data);
                return parsed;
            }

            return response.data;
        } catch (error) {
            console.error('Auction API Error:', error);
            throw error;
        }
    }

    async getMakeList() {
        // Example query based on api.md patterns
        return this.query("select * from main limit 5"); // Placeholder, need actual table for makes if available or extract from main
    }

    async getLot(id: string) {
        return this.query(`select * from main where id='${id}'`);
    }
}
