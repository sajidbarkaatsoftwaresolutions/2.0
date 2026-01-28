import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Shop</h3>
                        <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary">All Products</Link>
                        <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">Categories</Link>
                        <Link href="/deals" className="text-sm text-muted-foreground hover:text-primary">Deals</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Auctions</h3>
                        <Link href="/auctions" className="text-sm text-muted-foreground hover:text-primary">Live Auctions</Link>
                        <Link href="/auctions/upcoming" className="text-sm text-muted-foreground hover:text-primary">Upcoming</Link>
                        <Link href="/auctions/guide" className="text-sm text-muted-foreground hover:text-primary">How it Works</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Support</h3>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
                        <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link>
                        <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary">Shipping Info</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Legal</h3>
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Chiyo Aki. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
