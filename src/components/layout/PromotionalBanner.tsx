import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
    return (
        <div className="w-full h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto h-full px-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full hidden md:block">
                        <Sparkles className="h-5 w-5 text-yellow-300" />
                    </div>
                    <div>
                        <p className="font-bold text-lg leading-tight">Grand Opening Sale</p>
                        <p className="text-indigo-100 text-sm hidden sm:block">Get 50% discount on auction fees for your first 3 purchases!</p>
                    </div>
                </div>

                <Button asChild size="sm" variant="secondary" className="font-bold shadow-lg hover:scale-105 transition-transform">
                    <Link href="/auctions">
                        Start Bidding <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
