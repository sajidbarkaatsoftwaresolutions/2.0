import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface VehicleProps {
    id: string;
    title: string;
    price: string;
    image: string;
    specs: string[];
    refNumber: string;
}

export function VehicleCard({ id, title, price, image, specs, refNumber }: VehicleProps) {
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
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white backdrop-blur">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
                <Badge className="absolute top-2 left-2 bg-primary text-white hover:bg-primary border-none rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                    New Arrival
                </Badge>
            </div>

            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 line-clamp-1 text-lg group-hover:text-primary transition-colors">{title}</h3>
                </div>
                <div className="text-2xl font-black text-primary mb-3">
                    {price}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                    {specs.map((spec, index) => (
                        <span key={index} className="bg-secondary/5 px-2 py-1 rounded-md font-medium text-secondary/70">
                            {spec}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground border-t bg-muted/20 mt-auto">
                <div className="py-2">
                    Ref: <span className="font-mono font-medium text-secondary">{refNumber}</span>
                </div>
                <Button variant="link" className="text-primary p-0 h-auto font-bold text-xs uppercase tracking-wider">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
