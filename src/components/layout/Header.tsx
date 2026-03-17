'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, User } from 'lucide-react';
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
                        <nav className="flex flex-col gap-4 mt-8">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-bold">Home</Link>
                            <Link href="/shop" onClick={() => setIsOpen(false)} className="text-lg font-bold">Shop</Link>
                            <Link href="/auctions" onClick={() => setIsOpen(false)} className="text-lg font-bold">Auctions</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-bold">About</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-bold">Contact</Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tighter">Chiyo Aki</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 ml-10 flex-1">
                    <Link href="/shop" className="text-[13px] font-bold tracking-wide transition-colors hover:text-white/80">SHOP</Link>
                    <Link href="/auctions" className="text-[13px] font-bold tracking-wide transition-colors hover:text-white/80">AUCTIONS</Link>
                    <Link href="/about" className="text-[13px] font-bold tracking-wide transition-colors hover:text-white/80">ABOUT</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-1 md:gap-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" asChild>
                        <Link href="/cart">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" asChild>
                        <Link href="/login">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
