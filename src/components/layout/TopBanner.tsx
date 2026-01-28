import { Phone, Mail, Clock, MapPin } from "lucide-react";

export function TopBanner() {
    return (
        <div className="bg-slate-900 text-slate-50 py-2 text-xs md:text-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-4 md:gap-6">
                    <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Phone className="h-3 w-3 md:h-4 md:w-4" />
                        <span>+1 (234) 567-890</span>
                    </a>
                    <a href="mailto:info@barkaat.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Mail className="h-3 w-3 md:h-4 md:w-4" />
                        <span>info@barkaat.com</span>
                    </a>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2 hidden sm:flex">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Mon - Sat: 9:00 - 18:00</span>
                    </div>
                    <div className="flex items-center gap-2 hidden md:flex">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Minato City, Tokyo, Japan</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
