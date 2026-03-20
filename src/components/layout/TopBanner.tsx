import { Phone, Mail, Clock } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
)

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
)

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.014 3.91-.015.082 1.536.639 2.99 1.753 4.146 1.14 1.168 2.665 1.626 4.316 1.8v4.11a9.388 9.388 0 0 1-5.011-1.571v7.653c-.027 3.023-1.638 5.655-4.321 6.848-2.651 1.17-5.836.78-8.118-1.066-2.288-1.854-3.328-4.993-2.64-7.857.697-2.903 3.08-5.118 6.012-5.462 1.458-.167 2.936.14 4.143.834v4.303c-.273-.39-.623-.73-.974-1.002-.572-.44-1.282-.693-2.02-.731-1.314-.047-2.585.642-3.14 1.796-.582 1.165-.467 2.651.272 3.733.722 1.056 2.053 1.56 3.284 1.353 1.295-.213 2.302-1.233 2.559-2.521.053-.29.07-.585.074-.881V.018h-1.077Z" />
    </svg>
)

export function TopBanner() {
    return (
        <div className="bg-banner text-foreground py-1 border-b border-gray-300 text-[11px] md:text-xs">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-1">
                <div className="flex items-center gap-4">
                    <a href="tel:+61468410202" className="flex items-center gap-1 hover:text-secondary transition-colors font-bold">
                        <Phone className="h-3 w-3 text-secondary" />
                        <span>+61 468 410 202</span>
                    </a>
                    <a href="mailto:info@chiyoaki.com" className="flex items-center gap-1 hover:text-secondary transition-colors font-bold">
                        <Mail className="h-3 w-3 text-secondary" />
                        <span>info@chiyoaki.com</span>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 pr-4 border-r border-gray-300">
                        <a href="https://wa.me/61480803649" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="WhatsApp">
                            <WhatsappIcon className="h-3.5 w-3.5" />
                        </a>
                        <a href="https://x.com/chiyoakihub" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="X (Twitter)">
                            <XIcon className="h-3 w-3" />
                        </a>
                        <a href="https://www.youtube.com/@ChiyoAkihub" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="YouTube">
                            <YoutubeIcon className="h-4 w-4" />
                        </a>
                        <a href="https://www.tiktok.com/@chiyoakihub?lang=en" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="TikTok">
                            <TiktokIcon className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div className="hidden items-center gap-1 sm:flex">
                        <Clock className="h-3 w-3 text-secondary" />
                        <span>Mon - Sat: 9:00 - 18:00</span>
                    </div>

                    <div className="pl-4 border-l border-gray-300 hidden md:block">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}
