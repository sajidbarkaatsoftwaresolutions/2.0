import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';


interface VehicleProps {
    id: string;
    title: string;

    image: string;
    specs: string[];
    refNumber: string;
}

export function VehicleCard({ id, title, image }: VehicleProps) {
    return (
        <Link href={`/vehicle/${id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[3px]">
            <Card className="overflow-hidden group hover:shadow-md transition-shadow duration-300 border border-gray-200 bg-white rounded-[3px]">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
                        className="object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />
                </div>

                <CardContent className="p-0">
                    <h3 className="font-bold text-secondary text-[11px] leading-tight text-center truncate py-[2px] px-1" title={title}>
                        {title}
                    </h3>
                </CardContent>
            </Card>
        </Link>
    );
}
