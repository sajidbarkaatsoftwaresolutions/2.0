import { Phone, Mail, Clock, MapPin } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export function TopBanner() {
    return (
        <div className="bg-[#f2f2f2] text-[#333333] py-1 border-b border-gray-300 text-[11px] md:text-xs">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-1">
                <div className="flex items-center gap-4">
                    <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-secondary transition-colors font-bold">
                        <Phone className="h-3 w-3 text-secondary" />
                        <span>+1 (234) 567-890</span>
                    </a>
                    <a href="mailto:info@chiyo-aki.com" className="flex items-center gap-1 hover:text-secondary transition-colors font-bold">
                        <Mail className="h-3 w-3 text-secondary" />
                        <span>info@chiyo-aki.com</span>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 hidden sm:flex">
                        <Clock className="h-3 w-3 text-secondary" />
                        <span>Mon - Sat: 9:00 - 18:00</span>
                    </div>

                    <div className="pl-4 border-l border-gray-300">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}
