import { NextResponse } from 'next/server';

export class ApiError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(message: string, statusCode: number = 500, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        // Restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * A consistent wrapper to handle API exceptions and format cleanly to the frontend.
 * Never leaks stack traces into production JSON.
 */
export function handleApiError(error: unknown) {
    if (error instanceof ApiError) {
        return NextResponse.json(
            { error: error.message, details: error.details },
            { status: error.statusCode }
        );
    }

    // Default unhandled exception
    console.error("[Unhandled API Error] ", error);
    return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
    );
}
