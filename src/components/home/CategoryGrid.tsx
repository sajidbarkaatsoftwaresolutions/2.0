'use client';

import { useState, useEffect, ReactNode } from 'react';

export interface CategoryItem {
    id: string;
    title: string;
    subtitle?: string;
    icon?: ReactNode;
}

interface CategoryGridProps {
    title: string;
    subtitle?: string;
    items?: CategoryItem[];
    apiEndpoint?: string;
    layout?: 'make' | 'country' | 'icon';
    columnsClass?: string;
    defaultVisibleCount?: number;
}

const EMPTY_ITEMS: CategoryItem[] = [];

export function CategoryGrid({
    title,
    subtitle,
    items = EMPTY_ITEMS,
    apiEndpoint,
    layout = 'make',
    columnsClass = "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
    defaultVisibleCount = 24
}: CategoryGridProps) {
    const [data, setData] = useState<CategoryItem[]>(items);
    const [isLoading, setIsLoading] = useState(!!apiEndpoint);
    const [showAll, setShowAll] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        if (apiEndpoint) {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(apiEndpoint);
                if (res.ok) {
                    const rawData = await res.json();
                    if (apiEndpoint === '/api/makes') {
                        setData(rawData.map((item: { name: string, count: number }) => ({
                            id: item.name,
                            title: item.name,
                            subtitle: `${item.count?.toLocaleString() || 0} cars`
                        })));
                    } else {
                        setData(rawData);
                    }
                } else {
                    setError('Failed to load data. Please try again.');
                }
            } catch (err) {
                setError('Failed to load data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else if (items.length > 0) {
            setData(items);
        }
    };

    useEffect(() => {
        loadData();
    }, [apiEndpoint, items]);

    const visibleItems = showAll ? data : data.slice(0, defaultVisibleCount);

    // Auto-calculate how many skeletons to show
    const skeletonCount = defaultVisibleCount;

    const renderItem = (item: CategoryItem) => {
        if (layout === 'make') {
            return (
                <button
                    key={item.id}
                    className="flex flex-col items-center justify-center px-2 py-3 border border-gray-200 rounded-[3px] bg-gray-50 hover:bg-secondary hover:text-white hover:border-secondary transition-colors group cursor-pointer"
                    aria-label={`Browse ${item.title} vehicles`}
                >
                    <span className="text-[11px] md:text-[12px] font-bold truncate w-full text-center leading-tight group-hover:text-white text-gray-800">
                        {item.title}
                    </span>
                    {item.subtitle && (
                        <span className="text-[10px] font-semibold text-primary group-hover:text-orange-300 mt-0.5">
                            {item.subtitle}
                        </span>
                    )}
                </button>
            );
        }

        if (layout === 'country') {
            return (
                <button
                    key={item.id}
                    className="flex items-center gap-3 px-3 py-3 border border-gray-200 rounded-[3px] bg-gray-50 hover:bg-secondary hover:text-white hover:border-secondary transition-colors group cursor-pointer"
                    aria-label={`Browse vehicles from ${item.title}`}
                >
                    <span className="text-2xl leading-none shadow-sm rounded-sm overflow-hidden">{item.icon}</span>
                    <span className="text-[13px] md:text-[14px] font-bold truncate group-hover:text-white text-gray-800">
                        {item.title}
                    </span>
                </button>
            );
        }

        if (layout === 'icon') {
            return (
                <button
                    key={item.id}
                    className="flex flex-col items-center justify-center p-4 md:p-6 border border-gray-200 rounded-[3px] bg-gray-50 hover:bg-secondary hover:border-secondary transition-colors group cursor-pointer shadow-sm hover:shadow-md"
                    aria-label={`Browse ${item.title} vehicles`}
                >
                    <div className="mb-3 group-hover:text-white transition-colors">
                        {item.icon}
                    </div>
                    <span className="text-[13px] md:text-[14px] font-bold text-gray-800 group-hover:text-white transition-colors text-center">
                        {item.title}
                    </span>
                </button>
            );
        }
    };

    return (
        <section className="py-6 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-4 border-b border-secondary pb-2">
                        <div>
                            <h2 className="text-lg md:text-xl font-black text-secondary">{title}</h2>
                            {subtitle && (
                                <p className="text-[12px] text-muted-foreground">
                                    {subtitle.replace('{count}', data.length.toString())}
                                </p>
                            )}
                        </div>
                        {data.length > defaultVisibleCount && (
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-secondary text-[13px] font-bold hover:underline"
                            >
                                {showAll ? 'Show Less' : `View All ${data.length} »`}
                            </button>
                        )}
                    </div>

                    <div className={`grid gap-2 md:gap-3 ${columnsClass}`}>
                        {isLoading ? (
                            Array.from({ length: skeletonCount }).map((_, i) => (
                                <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-[3px]" />
                            ))
                        ) : error ? (
                            <div className="col-span-full py-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-[3px]">
                                <p className="text-sm text-destructive font-bold mb-2">{error}</p>
                                <button
                                    onClick={loadData}
                                    className="text-sm text-secondary font-bold hover:underline"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : visibleItems.length > 0 ? (
                            visibleItems.map(item => renderItem(item))
                        ) : (
                            <div className="col-span-full py-8 text-center text-gray-500 font-bold text-sm bg-gray-50 border border-dashed border-gray-300 rounded-[3px]">
                                No items available.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
