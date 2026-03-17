import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchWidget } from './SearchWidget';


export function HeroSection() {
    return (
        <section className="w-full bg-[#f5f5f5] pt-4 pb-8">
            <div className="container mx-auto px-4">
                {/* Search Container */}
                <div className="bg-white rounded border border-gray-200 shadow-sm p-4 mb-6">
                    <h1 className="text-xl md:text-2xl font-black text-[#002895] mb-4">
                        Search for Cars
                    </h1>
                    <SearchWidget />
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white p-4 border border-gray-200 rounded text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-black text-[#f1892b]">150k+</div>
                        <div className="text-[12px] text-[#707070] font-bold mt-1">Vehicles in Stock</div>
                    </div>
                    <div className="bg-white p-4 border border-gray-200 rounded text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-black text-[#f1892b]">24/7</div>
                        <div className="text-[12px] text-[#707070] font-bold mt-1">Global Support Team</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
