'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <div className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity">
            <label htmlFor="language-select" className="sr-only">Select Language</label>
            <span className="text-[12px]">🌐</span>
            <select
                id="language-select"
                className="bg-transparent border-none text-[11px] md:text-xs font-bold text-foreground cursor-pointer focus:outline-none appearance-none pr-4"
                defaultValue={locale}
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">English</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="th">ภาษาไทย (Thai)</option>
            </select>
        </div>
    );
}
