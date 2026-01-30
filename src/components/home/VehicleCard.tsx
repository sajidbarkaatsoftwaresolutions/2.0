import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface VehicleProps {
    id: string;
    title: string;

    image: string;
    specs: string[];
    refNumber: string;
}

export function VehicleCard({ id, title, image, specs, refNumber }: VehicleProps) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-none bg-white rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="icon" variant="secondary" className="h-6 w-6 rounded-full bg-white/80 hover:bg-white backdrop-blur">
                        <Heart className="h-3 w-3 text-muted-foreground" />
                    </Button>
                </div>
                <Badge className="absolute top-2 left-2 bg-primary text-white hover:bg-primary border-none rounded-md px-1.5 py-0 text-[10px] font-bold uppercase tracking-wider">
                    New Arrival
                </Badge>
            </div>

            <CardContent className="px-2 py-1.5 md:p-2">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-[10px] md:text-sm group-hover:text-primary transition-colors leading-tight line-clamp-2">{title}</h3>
                </div>

                <div className="flex flex-wrap gap-1 md:gap-1.5 text-[8px] md:text-[10px] text-muted-foreground">
                    {specs.map((spec, index) => (
                        <span key={index} className="bg-secondary/5 px-1 py-0.5 rounded-md font-medium text-secondary/70">
                            {spec}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
