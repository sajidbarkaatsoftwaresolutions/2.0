'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-4 mt-8">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Home</Link>
                            <Link href="/shop" onClick={() => setIsOpen(false)} className="text-lg font-medium">Shop</Link>
                            <Link href="/auctions" onClick={() => setIsOpen(false)} className="text-lg font-medium">Auctions</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium">About</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium">Contact</Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold">Chiyo Aki</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">Shop</Link>
                    <Link href="/auctions" className="text-sm font-medium transition-colors hover:text-primary">Auctions</Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">About</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/cart">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
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
