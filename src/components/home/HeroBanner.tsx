import { useTranslations } from 'next-intl';
import { Flame } from "lucide-react";

export function HeroBanner() {
    const t = useTranslations('Index');

    return (
        <section className="bg-indigo-50 py-10 border-b border-indigo-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">
                    {/* Left Side: Title */}
                    <div className="flex flex-col items-end md:pr-8 md:border-r-2 md:border-indigo-200">
                        <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold mb-2 animate-pulse whitespace-nowrap">
                            <Flame className="h-3 w-3 fill-red-600" />
                            TODAY'S SPECIAL
                        </div>
                        <h1 className="text-xl md:text-5xl font-black text-slate-900 text-right leading-tight">
                            {t.rich('title', {
                                br: () => <br />,
                                span: (chunks) => <span className="text-primary">{chunks}</span>
                            })}
                        </h1>
                    </div>

                    {/* Right Side: Description */}
                    <div className="md:pl-2">
                        <p className="text-xs md:text-lg text-muted-foreground max-w-md">
                            {t('description')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
