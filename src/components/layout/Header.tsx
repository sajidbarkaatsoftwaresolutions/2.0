'use client';

import Link from 'next/link';
import { Menu, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-secondary text-white shadow-md">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20 hover:text-white">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px]">
                        <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-bold">Home</Link>
                            <Link href="/shop" onClick={() => setIsOpen(false)} className="text-lg font-bold">Shop</Link>
                            <Link href="/auctions" onClick={() => setIsOpen(false)} className="text-lg font-bold">Auctions</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-bold">About</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-bold">Contact</Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mr-auto ml-2 md:ml-0 overflow-hidden">
                    <span className="text-xl md:text-2xl font-black tracking-tighter truncate">Chiyo Aki</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 ml-10 flex-1" aria-label="Main navigation">
                    <Link href="/shop" className="text-[13px] font-bold tracking-wide transition-colors hover:text-white/80">SHOP</Link>
                    <Link href="/auctions" className="text-[13px] font-bold tracking-wide transition-colors hover:text-white/80">AUCTIONS</Link>
                    <Link href="/about" className="text-[13px] font-bold tracking-wide transition-colors hover:text-white/80">ABOUT</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <Link href="/login" className="flex flex-col items-center justify-center text-white hover:text-white/80 transition-colors group px-1">
                        <LogIn className="h-4 w-4 md:h-5 md:w-5 mb-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] md:text-[10px] font-bold tracking-wider uppercase leading-none">Log in</span>
                    </Link>
                    <Link href="/register" className="flex flex-col items-center justify-center text-white hover:text-white/80 transition-colors group px-1">
                        <UserPlus className="h-4 w-4 md:h-5 md:w-5 mb-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] md:text-[10px] font-bold tracking-wider uppercase leading-none">Sign up</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
