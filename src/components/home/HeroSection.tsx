import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchWidget } from './SearchWidget';
import Image from 'next/image';

export function HeroSection() {
    return (
        <section className="relative w-full">
            {/* Background/Banner Area */}
            <div className="w-full bg-secondary text-white pt-12 pb-24 md:pt-20 md:pb-32 px-4 relative overflow-hidden">
                <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
                    <div className="space-y-6">
                        <div className="inline-block bg-primary/20 text-primary-foreground border border-primary/30 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm">
                            Trusted by 50,000+ Customers
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                            Find Your Dream Car <br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#2384C1] to-cyan-400">
                                Direct from Japan
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                            Access over 150,000 high-quality vehicles at wholesale prices. We handle shipping, documentation, and delivery to your port.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 text-base font-bold shadow-lg shadow-primary/20">
                                Browse Inventory
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base font-bold">
                                How It Works
                            </Button>
                        </div>

                        <div className="pt-8 flex gap-8 border-t border-white/10">
                            <div>
                                <div className="text-3xl font-black text-white">150k+</div>
                                <div className="text-sm text-slate-400">Vehicles in Stock</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white">24/7</div>
                                <div className="text-sm text-slate-400">Support Team</div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block relative h-[400px]">
                        {/* Abstract car image placeholder or stylistic graphic */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl transform rotate-3"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2940&auto=format&fit=crop"
                            alt="Luxury Car"
                            fill
                            className="object-contain drop-shadow-2xl z-10 hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Container for the overlapping search widget */}
            <div className="container mx-auto px-4">
                <SearchWidget />
            </div>
        </section>
    );
}
