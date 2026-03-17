export interface AvtoVehicle {
    ID: string;
    IMAGES: string;
    LOT: string;
    AUCTION_TYPE: string;
    AUCTION_DATE: string;
    AUCTION: string;
    TOWN: string;
    MARKA_ID: string;
    MODEL_ID: string;
    MARKA_NAME: string;
    MODEL_NAME: string;
    YEAR: string;
    ENG_V: string;
    FUEL: string;
    TIME: string;
    PW: string;
    KUZOV: string;
    GRADE: string;
    EQUIP: string;
    COLOR: string;
    KPP: string;
    KPP_TYPE: string;
    PRIV: string;
    MILEAGE: string;
    RATE: string;
    START: string;
    FINISH: string;
    STATUS: string;
    LHDRIVE: string;
    AVG_PRICE: string;
    AVG_STRING: string;
    SERIAL?: string;  // Available from stats table
    INFO?: string;    // Available from stats table
}

export interface AvtoFilterParams {
    vendor?: string;
    model?: string;
    year_from?: string;
    year_to?: string;
    engine_from?: string;
    engine_to?: string;
    mileage_from?: string;
    mileage_to?: string;
    min_rating?: string;
    kuzov?: string;
    lot_number?: string;
    limit?: number;
    offset?: number;
    status?: string;
}
