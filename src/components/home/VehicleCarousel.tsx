'use client';

import { useRef, useState, useEffect } from 'react';
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchVehicles } from '@/lib/api-client';
import { AvtoVehicle, AvtoFilterParams } from '@/types/vehicle';

interface VehicleCarouselProps {
    title: string;
    subtitle?: string;
    viewAllText?: string;
    apiParams?: AvtoFilterParams;
}

function mapVehiclesToCards(vehicles: AvtoVehicle[]) {
    return vehicles.map((car, index) => {
        const images = car.IMAGES ? car.IMAGES.split('#') : [];
        const rawUrl = images.length > 0 ? images[0] : '/placeholder.png';
        const image = rawUrl.replace(/&h=\d+/g, '&w=320');

        return {
            id: `${car.ID}-${index}`,
            title: `${car.MARKA_NAME} ${car.MODEL_NAME}`,
            image,
            specs: [car.YEAR, `${car.ENG_V}cc`, car.PRIV, car.KPP].filter(Boolean),
            refNumber: car.LOT,
        };
    });
}

export function VehicleCarousel({
    title,
    subtitle,
    viewAllText = "View All",
    apiParams = { limit: 12 },
}: VehicleCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [vehicles, setVehicles] = useState<ReturnType<typeof mapVehiclesToCards>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchVehicles(apiParams);
                setVehicles(mapVehiclesToCards(data));
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 220;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="pt-[2px] pb-0 mt-2 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-4 border-b border-[#002895] pb-2">
                        <div>
                            <h2 className="text-lg md:text-xl font-black text-[#002895]">{title}</h2>
                            {subtitle && (
                                <p className="text-[12px] text-[#707070]">{subtitle}</p>
                            )}
                        </div>
                        <div className="flex gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-[3px] h-8 w-8 border-gray-300 hover:bg-gray-100 hover:text-primary transition-none"
                                onClick={() => scroll('left')}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-[3px] h-8 w-8 border-gray-300 hover:bg-gray-100 hover:text-primary transition-none"
                                onClick={() => scroll('right')}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-2 lg:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory mx-auto max-w-full justify-start"
                    >
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="w-[31%] sm:w-[23%] md:w-[18%] lg:w-[15%] shrink-0">
                                    <div className="aspect-[4/3] bg-gray-200 animate-pulse rounded-[3px]" />
                                    <div className="h-4 bg-gray-200 animate-pulse rounded mt-1" />
                                </div>
                            ))
                        ) : (
                            <>
                                {vehicles.map((car) => (
                                    <div key={car.id} className="w-[31%] sm:w-[23%] md:w-[18%] lg:w-[15%] shrink-0 snap-start">
                                        <VehicleCard {...car} />
                                    </div>
                                ))}
                                <div className="w-[31%] sm:w-[23%] md:w-[18%] lg:w-[15%] shrink-0 flex items-center justify-center border border-gray-200 rounded-[3px] bg-[#f5f5f5]">
                                    <Button variant="ghost" className="flex flex-col gap-2 h-auto py-8 text-[#002895] hover:tracking-wide transition-all bg-transparent hover:bg-transparent">
                                        <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-200">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                        <span className="font-bold text-[13px]">{viewAllText}</span>
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
