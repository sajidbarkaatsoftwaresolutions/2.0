import { useTranslations } from 'next-intl';
import { SearchWidget } from "@/components/home/SearchWidget";
import { VehicleCarousel } from "@/components/home/VehicleCarousel";
import { TabbedVehicleGrid } from "@/components/home/TabbedVehicleGrid";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { COUNTRY_ITEMS, FUEL_ITEMS, BODY_ITEMS } from "@/lib/constants/grids";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroBanner } from "@/components/home/HeroBanner";

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Widget Section */}
      <section className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SearchWidget />
          </div>
        </div>
      </section>

      {/* En Route Section */}
      <TabbedVehicleGrid
        title={t('enRoute')}
        subtitle={t('enRouteSubtitle')}
        viewAllText={t('viewAllEnRoute')}
      />

      {/* Carousel Sections — All Live API Data */}
      <VehicleCarousel
        title={t('latestArrivals')}
        subtitle={t('latestArrivalsSubtitle')}
        apiParams={{ limit: 12 }}
      />
      <VehicleCarousel
        title={t('premiumVehicles')}
        subtitle={t('premiumVehiclesSubtitle')}
        apiParams={{ limit: 12, min_rating: '4' }}
        viewAllText={t('viewAllPremium')}
      />
      <VehicleCarousel
        title={t('bestDeals')}
        subtitle={t('bestDealsSubtitle')}
        apiParams={{ limit: 12, mileage_to: '50000' }}
        viewAllText={t('viewAllDeals')}
      />
      <VehicleCarousel
        title={t('featured')}
        subtitle={t('featuredSubtitle')}
        apiParams={{ limit: 12, vendor: 'TOYOTA' }}
        viewAllText={t('viewAllFeatured')}
      />

      {/* Browse by Make Grid */}
      <CategoryGrid
        title={t('browseByMake')}
        subtitle={t('browseByMakeSubtitle')}
        apiEndpoint="/api/makes"
        layout="make"
        columnsClass="grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        defaultVisibleCount={24}
      />

      {/* Browse by Country Grid */}
      <CategoryGrid
        title={t('browseByCountry')}
        subtitle={t('browseByCountrySubtitle')}
        items={COUNTRY_ITEMS}
        layout="country"
        columnsClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      />

      {/* Browse by Fuel Type Grid */}
      <CategoryGrid
        title={t('browseByFuel')}
        subtitle={t('browseByFuelSubtitle')}
        items={FUEL_ITEMS}
        layout="icon"
        columnsClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
      />

      {/* Browse by Body Type Grid */}
      <CategoryGrid
        title={t('browseByBody')}
        subtitle={t('browseByBodySubtitle')}
        items={BODY_ITEMS}
        layout="icon"
        columnsClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
      />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t('whyChooseTitle')}</h2>
            <p className="text-lg text-muted-foreground">{t('whyChooseSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('verifiedQuality')}</h3>
              <p className="text-muted-foreground">{t('verifiedQualityDesc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('transparentPricing')}</h3>
              <p className="text-muted-foreground">{t('transparentPricingDesc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('fastShipping')}</h3>
              <p className="text-muted-foreground">{t('fastShippingDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
