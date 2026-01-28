import { SearchWidget } from "@/components/home/SearchWidget";
import { LatestArrivals } from "@/components/home/LatestArrivals";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen">
      {/* Text Banner */}
      <section className="bg-indigo-50 py-10 border-b border-indigo-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">
            {/* Left Side: Title */}
            <div className="flex flex-col items-end md:pr-8 md:border-r-2 md:border-indigo-200">
              <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold mb-2 animate-pulse whitespace-nowrap">
                <Flame className="h-3 w-3 fill-red-600" />
                TODAY'S SPECIAL
              </div>
              <h1 className="text-xl md:text-5xl font-black text-slate-900 text-right leading-tight">
                Today's <br />
                <span className="text-primary">Special Offer</span>
              </h1>
            </div>

            {/* Right Side: Description */}
            <div className="md:pl-2">
              <p className="text-xs md:text-lg text-muted-foreground max-w-md">
                Search through thousands of high-quality vehicles available for direct import from Japan.
                Full transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Widget Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <SearchWidget />
        </div>
      </section>

      {/* Latest Stock Section */}
      <LatestArrivals />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Why Choose Barkaat?</h2>
            <p className="text-lg text-muted-foreground">We simplify the process of importing high-quality vehicles from Japan to your doorstep.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Quality</h3>
              <p className="text-muted-foreground">Every vehicle undergoes a strict inspection process before being listed.</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
              <p className="text-muted-foreground">No hidden fees. We provide a clear breakdown of all costs involved.</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Shipping</h3>
              <p className="text-muted-foreground">We handle all logistics to ensure your vehicle reaches you in record time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
