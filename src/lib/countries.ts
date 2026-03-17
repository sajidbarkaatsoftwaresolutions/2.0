export type StockType = '3rd_party' | 'in_stock';

export interface Country {
    id: string;
    name: string;
    flag: string;
    stockTypes: StockType[];
}

export const ALL_COUNTRIES: Country[] = [
    { id: 'jp', name: 'Japan', flag: '🇯🇵', stockTypes: ['3rd_party', 'in_stock'] },
    { id: 'cn', name: 'China', flag: '🇨🇳', stockTypes: ['3rd_party', 'in_stock'] },
    { id: 'in', name: 'India', flag: '🇮🇳', stockTypes: ['in_stock'] },
    { id: 'au', name: 'Australia', flag: '🇦🇺', stockTypes: ['in_stock'] },
    { id: 'th', name: 'Thailand', flag: '🇹🇭', stockTypes: ['in_stock', '3rd_party'] },
];

export function getCountriesByStockType(type: StockType): Country[] {
    return ALL_COUNTRIES.filter(c => c.stockTypes.includes(type));
}
