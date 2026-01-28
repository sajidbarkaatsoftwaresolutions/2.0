'use client';

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

export function SearchWidget() {
    return (
        <Card className="w-full max-w-6xl mx-auto shadow-md border-none bg-white rounded-xl overflow-hidden">
            <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                    <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                        {/* Make */}
                        <div className="relative p-2 hover:bg-slate-50 transition-colors group flex-1">
                            <Select>
                                <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 px-4 py-2 hover:bg-slate-100/50 transition-colors shadow-none data-[state=open]:bg-slate-100">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Make</span>
                                        <div className="font-bold text-slate-900 line-clamp-1">
                                            <SelectValue placeholder="Select" />
                                        </div>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="toyota">Toyota</SelectItem>
                                    <SelectItem value="nissan">Nissan</SelectItem>
                                    <SelectItem value="honda">Honda</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Model */}
                        <div className="relative p-2 hover:bg-slate-50 transition-colors group flex-1">
                            <Select>
                                <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 px-4 py-2 hover:bg-slate-100/50 transition-colors shadow-none data-[state=open]:bg-slate-100">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Model</span>
                                        <div className="font-bold text-slate-900 line-clamp-1">
                                            <SelectValue placeholder="Select" />
                                        </div>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="corolla">Corolla</SelectItem>
                                    <SelectItem value="civic">Civic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Min Year */}
                        <div className="relative p-2 hover:bg-slate-50 transition-colors group flex-1">
                            <Select>
                                <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 px-4 py-2 hover:bg-slate-100/50 transition-colors shadow-none data-[state=open]:bg-slate-100">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Min Year</span>
                                        <div className="font-bold text-slate-900 line-clamp-1">
                                            <SelectValue placeholder="Select" />
                                        </div>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2020">2020</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Max Year */}
                        <div className="relative p-2 hover:bg-slate-50 transition-colors group flex-1">
                            <Select>
                                <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 px-4 py-2 hover:bg-slate-100/50 transition-colors shadow-none data-[state=open]:bg-slate-100">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Max Year</span>
                                        <div className="font-bold text-slate-900 line-clamp-1">
                                            <SelectValue placeholder="Select" />
                                        </div>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="p-2 lg:w-48">
                        <Button size="lg" className="w-full h-full min-h-[56px] bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-none rounded-lg">
                            <Search className="mr-2 h-5 w-5" />
                            Show Cars
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
