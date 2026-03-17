'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getCountriesByStockType, StockType } from '@/lib/countries';

export function SearchWidget() {
    const [stockType, setStockType] = useState<StockType>('3rd_party');
    const [country, setCountry] = useState<string>('jp');

    // Dynamic Lists from Backend
    const [makes, setMakes] = useState<{ name: string, count: number }[]>([]);
    const [models, setModels] = useState<{ name: string, count: number }[]>([]);

    // Selected Values
    const [selectedMake, setSelectedMake] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [minYear, setMinYear] = useState<string>('');
    const [maxYear, setMaxYear] = useState<string>('');

    // Initially fetch the makes
    useEffect(() => {
        async function fetchMakes() {
            try {
                const res = await fetch('/api/makes');
                if (res.ok) {
                    const data = await res.json();
                    setMakes(data);
                }
            } catch (error) {
                console.error("Failed to load makes for SearchWidget", error);
            }
        }
        fetchMakes();
    }, []);

    // When the make changes, fetch its models
    useEffect(() => {
        if (!selectedMake) {
            setModels([]);
            return;
        }

        async function fetchModels() {
            try {
                const res = await fetch(`/api/models?vendor=${encodeURIComponent(selectedMake)}`);
                if (res.ok) {
                    const data = await res.json();
                    setModels(data);
                }
            } catch (error) {
                console.error("Failed to load models for SearchWidget", error);
            }
        }
        fetchModels();
    }, [selectedMake]);

    // Handle Make Selection
    const handleMakeChange = (value: string) => {
        setSelectedMake(value);
        setSelectedModel(''); // Reset model when make changes
    };

    // Filter available countries based on selected stockType
    const availableCountries = getCountriesByStockType(stockType);

    // Auto-select a valid country if the current selection is excluded by the stock type toggle
    useEffect(() => {
        if (availableCountries.length > 0) {
            if (!availableCountries.find(c => c.id === country)) {
                setCountry(availableCountries[0].id);
            }
        }
    }, [stockType, availableCountries, country]);

    return (
        <Card className="w-full border-none shadow-none bg-transparent overflow-visible rounded-none">
            <CardContent className="p-0">
                <div className="flex flex-col gap-2 bg-white border border-gray-300 p-2 rounded-[3px]">

                    {/* Top Row: Dropdowns & Search Button */}
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-row gap-2">
                            {/* Make */}
                            <div className="relative bg-white border border-gray-300 rounded-[3px] hover:border-blue-400 flex-1">
                                <Select value={selectedMake} onValueChange={handleMakeChange}>
                                    <SelectTrigger className="w-full h-10 border-none bg-transparent focus:ring-0 px-3 shadow-none text-[13px] font-bold text-gray-700">
                                        <SelectValue placeholder="Make" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {makes.map((make) => (
                                            <SelectItem key={make.name} value={make.name}>
                                                {make.name} ({make.count})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Model */}
                            <div className="relative bg-white border border-gray-300 rounded-[3px] hover:border-blue-400 flex-1">
                                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake || models.length === 0}>
                                    <SelectTrigger className="w-full h-10 border-none bg-transparent focus:ring-0 px-3 shadow-none text-[13px] font-bold text-gray-700">
                                        <SelectValue placeholder="Model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {models.map((model) => (
                                            <SelectItem key={model.name} value={model.name}>
                                                {model.name} ({model.count})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Min Year */}
                            <div className="relative bg-white border border-gray-300 rounded-[3px] hover:border-blue-400 flex-1">
                                <Select value={minYear} onValueChange={setMinYear}>
                                    <SelectTrigger className="w-full h-10 border-none bg-transparent focus:ring-0 px-3 shadow-none text-[13px] font-bold text-gray-700">
                                        <SelectValue placeholder="Min Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 15 }).map((_, i) => {
                                            const year = (new Date().getFullYear() - i).toString();
                                            return <SelectItem key={year} value={year}>{year}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Max Year */}
                            <div className="relative bg-white border border-gray-300 rounded-[3px] hover:border-blue-400 flex-1">
                                <Select value={maxYear} onValueChange={setMaxYear}>
                                    <SelectTrigger className="w-full h-10 border-none bg-transparent focus:ring-0 px-3 shadow-none text-[13px] font-bold text-gray-700">
                                        <SelectValue placeholder="Max Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 15 }).map((_, i) => {
                                            const year = (new Date().getFullYear() - i).toString();
                                            return <SelectItem key={year} value={year}>{year}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="lg:w-48 mt-2 lg:mt-0">
                            <Button className="w-full h-10 bg-primary hover:bg-[#ef7c13] text-white font-bold text-[14px] shadow-sm rounded-[3px] uppercase tracking-wide">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* Mutually Exclusive Stock Type Buttons */}
                        <div className="flex gap-2 shrink-0">
                            <button
                                onClick={() => setStockType('3rd_party')}
                                className={`flex items-center justify-center px-4 py-[2px] text-[12px] font-bold rounded-[3px] border transition-colors ${stockType === '3rd_party' ? 'border-[#f1892b] bg-[#f1892b] text-white' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                3rd Party
                            </button>
                            <button
                                onClick={() => setStockType('in_stock')}
                                className={`flex items-center justify-center px-4 py-[2px] text-[12px] font-bold rounded-[3px] border transition-colors ${stockType === 'in_stock' ? 'border-[#f1892b] bg-[#f1892b] text-white' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                In Stock
                            </button>
                        </div>

                        {/* Country Buttons */}
                        <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-2">
                            {availableCountries.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setCountry(c.id)}
                                    className={`flex items-center gap-1.5 px-3 py-[2px] text-[12px] font-bold rounded-[3px] border transition-colors ${country === c.id ? 'border-[#002895] bg-[#002895] text-white' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className="text-[12px] leading-none">{c.flag}</span>
                                    {c.name}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card >
    );
}
