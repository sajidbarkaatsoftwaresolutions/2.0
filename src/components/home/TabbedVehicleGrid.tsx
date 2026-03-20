'use client';

import { useState, useEffect } from 'react';
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { fetchVehicles } from '@/lib/api-client';
import { AvtoVehicle } from '@/types/vehicle';
import { ALL_COUNTRIES } from '@/lib/countries';

interface TabbedVehicleGridProps {
    title?: string;
    subtitle?: string;
    viewAllText?: string;
}

export function TabbedVehicleGrid({
    title = "En route",
    subtitle = "Vehicles currently shipping to your region.",
    viewAllText = "View All En Route »"
}: TabbedVehicleGridProps) {
    const [activeTab, setActiveTab] = useState('jp');
    const [vehicles, setVehicles] = useState<AvtoVehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadVehicles = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchVehicles({ limit: 6 });
            setVehicles(data);
        } catch (err) {
            setError('Failed to load vehicles. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadVehicles();
    }, [activeTab]);

    return (
        <section className="pt-[2px] pb-6 mt-2 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 border-b border-secondary pb-2 gap-2">
                        <div>
                            <h2 className="text-lg md:text-xl font-black text-secondary">{title}</h2>
                            <p className="text-[12px] text-muted-foreground">{subtitle}</p>
                        </div>

                        {/* Country Tabs */}
                        <div className="flex flex-wrap gap-1 md:gap-2 w-full md:w-auto mt-2 md:mt-0" role="tablist" aria-label="Filter by country">
                            {ALL_COUNTRIES.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setActiveTab(c.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1 text-[12px] font-bold rounded-t-[4px] border border-b-0 transition-colors ${activeTab === c.id ? 'border-secondary bg-secondary text-white' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                    style={{ marginBottom: '-8px' }}
                                    role="tab"
                                    aria-selected={activeTab === c.id}
                                >
                                    <span className="text-[12px] leading-none">{c.flag}</span>
                                    {c.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-3">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded-[3px]"></div>
                            ))
                        ) : error ? (
                            <div className="col-span-full py-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-[3px]">
                                <p className="text-sm text-destructive font-bold mb-2">{error}</p>
                                <button
                                    onClick={loadVehicles}
                                    className="text-sm text-secondary font-bold hover:underline"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : vehicles.length > 0 ? (
                            vehicles.map((car, index) => {
                                // Parse the first image from the 'url1#url2' hash string format used by AVTO.JP
                                const images = car.IMAGES ? car.IMAGES.split('#') : [];
                                // Use medium size (&w=320) per AVTO docs instead of tiny thumbnail (&h=50)
                                const rawUrl = images.length > 0 ? images[0] : '/placeholder.png';
                                const thumbnail = rawUrl.replace(/&h=\d+/g, '&w=320');

                                return (
                                    <VehicleCard
                                        key={`${car.ID}-${car.LOT}-${index}`}
                                        id={car.ID}
                                        title={`${car.MARKA_NAME} ${car.MODEL_NAME}`}
                                        image={thumbnail}
                                        specs={[car.YEAR, `${car.ENG_V}cc`, car.PRIV, car.KPP]}
                                        refNumber={car.LOT}
                                    />
                                );
                            })
                        ) : (
                            <div className="col-span-full py-8 text-center text-gray-500 font-bold text-sm bg-gray-50 border border-dashed border-gray-300 rounded-[3px]">
                                No vehicles found.
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button variant="link" className="text-secondary text-[13px] font-bold p-0">{viewAllText}</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
