'use client';

import { useRef } from 'react';
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export function LatestArrivals() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const featuredCars = [
        {
            id: "1",
            title: "2020 Toyota Land Cruiser Prado",
            price: "$45,000",
            image: "/placeholder.png",
            specs: ["2020", "2800cc", "4WD", "AT"],
            refNumber: "LCP-2020-001"
        },
        {
            id: "2",
            title: "2019 Mercedes-Benz C-Class",
            price: "$32,500",
            image: "/placeholder.png",
            specs: ["2019", "1800cc", "2WD", "AT"],
            refNumber: "MBC-2019-042"
        },
        {
            id: "3",
            title: "2021 Honda Vezel Hybrid",
            price: "$24,800",
            image: "/placeholder.png",
            specs: ["2021", "1500cc", "Hybrid", "AT"],
            refNumber: "HVH-2021-110"
        },
        {
            id: "4",
            title: "2018 Nissan X-Trail",
            price: "$18,900",
            image: "/placeholder.png",
            specs: ["2018", "2000cc", "4WD", "AT"],
            refNumber: "NXT-2018-088"
        },
        {
            id: "5",
            title: "2022 Subaru Forester",
            price: "$28,500",
            image: "/placeholder.png",
            specs: ["2022", "2000cc", "AWD", "CVT"],
            refNumber: "SF-2022-105"
        }
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 200; // Adjusted scroll amount for smaller cards
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="pt-8 pb-10 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Latest Arrivals</h2>
                            <p className="text-muted-foreground">Fresh inventory from Japanese auctions added daily.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10 border-slate-300 hover:bg-white hover:text-primary"
                                onClick={() => scroll('left')}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10 border-slate-300 hover:bg-white hover:text-primary"
                                onClick={() => scroll('right')}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
                    >
                        {featuredCars.map((car) => (
                            <div key={car.id} className="min-w-[160px] md:min-w-[320px] snap-center">
                                <VehicleCard {...car} />
                            </div>
                        ))}
                        <div className="min-w-[100px] flex items-center justify-center">
                            <Button variant="ghost" className="flex flex-col gap-2 h-auto py-8 text-muted-foreground hover:text-primary">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <span className="font-bold">View All</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
