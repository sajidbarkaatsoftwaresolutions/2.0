import { Zap, Fuel, BatteryCharging, Leaf, Settings, Car, Truck, CarFront, Bus, Key } from 'lucide-react';
import { FUEL_CODES } from '@/lib/fuel-codes';
import { ALL_COUNTRIES } from '@/lib/countries';
import { CategoryItem } from '@/components/home/CategoryGrid';

export const COUNTRY_ITEMS: CategoryItem[] = ALL_COUNTRIES.map(c => ({
    id: c.id,
    title: c.name,
    icon: c.flag
}));

export const FUEL_ITEMS: CategoryItem[] = [
    { id: 'P', title: FUEL_CODES['P'] || 'Petrol', icon: <Fuel className="w-8 h-8 md:w-10 md:h-10 text-slate-700" strokeWidth={1.5} /> },
    { id: 'H', title: FUEL_CODES['H'] || 'Hybrid', icon: <Leaf className="w-8 h-8 md:w-10 md:h-10 text-green-600" strokeWidth={1.5} /> },
    { id: 'D', title: FUEL_CODES['D'] || 'Diesel', icon: <Settings className="w-8 h-8 md:w-10 md:h-10 text-orange-700" strokeWidth={1.5} /> },
    { id: 'E', title: FUEL_CODES['E'] || 'Electric', icon: <BatteryCharging className="w-8 h-8 md:w-10 md:h-10 text-blue-600" strokeWidth={1.5} /> },
    { id: 'HE', title: FUEL_CODES['HE'] || 'Hybrid EREV', icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" strokeWidth={1.5} /> },
    { id: 'L', title: FUEL_CODES['L'] || 'LPG', icon: <Fuel className="w-8 h-8 md:w-10 md:h-10 text-slate-500" strokeWidth={1.5} /> },
];

export const BODY_ITEMS: CategoryItem[] = [
    { id: 'SUV', title: 'SUV / Crossover', icon: <CarFront className="w-8 h-8 md:w-10 md:h-10 text-slate-700" strokeWidth={1.5} /> },
    { id: 'Sedan', title: 'Sedan', icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-blue-700" strokeWidth={1.5} /> },
    { id: 'Hatchback', title: 'Hatchback', icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-green-700" strokeWidth={1.5} /> },
    { id: 'Truck', title: 'Truck / Pickup', icon: <Truck className="w-8 h-8 md:w-10 md:h-10 text-orange-700" strokeWidth={1.5} /> },
    { id: 'Minivan', title: 'Minivan', icon: <Bus className="w-8 h-8 md:w-10 md:h-10 text-purple-700" strokeWidth={1.5} /> },
    { id: 'Coupe', title: 'Coupe / Sports', icon: <Key className="w-8 h-8 md:w-10 md:h-10 text-red-600" strokeWidth={1.5} /> },
];
