
export class OdooClient {
    private url: string;
    private db: string;
    private username: string;
    private password: string;
    private uid: number | null = null;

    constructor() {
        this.url = process.env.ODOO_URL || '';
        this.db = process.env.ODOO_DB || '';
        this.username = process.env.ODOO_USERNAME || '';
        this.password = process.env.ODOO_PASSWORD || '';
    }

    private async jsonRpc(service: string, method: string, args: any[]) {
        const response = await fetch(`${this.url}/jsonrpc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    service: service,
                    method: method,
                    args: args,
                },
                id: Math.floor(Math.random() * 1000000),
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error('Odoo JSON-RPC Error:', data.error);
            throw new Error(data.error.data.message || data.error.message);
        }

        return data.result;
    }

    async authenticate(): Promise<number> {
        if (this.uid) return this.uid;

        try {
            const uid = await this.jsonRpc('common', 'authenticate', [
                this.db,
                this.username,
                this.password,
                {},
            ]);

            if (typeof uid === 'number') {
                this.uid = uid;
                return uid;
            }
            throw new Error('Authentication failed');
        } catch (error) {
            console.error('Odoo Authentication Error:', error);
            throw error;
        }
    }

    async execute(model: string, method: string, args: any[] = [], kwargs: any = {}): Promise<any> {
        const uid = await this.authenticate();

        return this.jsonRpc('object', 'execute_kw', [
            this.db,
            uid,
            this.password,
            model,
            method,
            args,
            kwargs
        ]);
    }
}
