import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full border-t bg-[#3c3c3c] py-6 md:py-12 text-slate-300">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col gap-8 text-center sm:grid sm:grid-cols-2 md:grid-cols-4">
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-base md:text-lg font-bold text-white">Shop</h3>
                        <Link href="/shop" className="text-[13px] hover:text-primary transition-colors">All Products</Link>
                        <Link href="/categories" className="text-[13px] hover:text-primary transition-colors">Categories</Link>
                        <Link href="/deals" className="text-[13px] hover:text-primary transition-colors">Deals</Link>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-base md:text-lg font-bold text-white">Auctions</h3>
                        <Link href="/auctions" className="text-[13px] hover:text-primary transition-colors">Live Auctions</Link>
                        <Link href="/auctions/upcoming" className="text-[13px] hover:text-primary transition-colors">Upcoming</Link>
                        <Link href="/auctions/guide" className="text-[13px] hover:text-primary transition-colors">How it Works</Link>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-base md:text-lg font-bold text-white">Support</h3>
                        <Link href="/contact" className="text-[13px] hover:text-primary transition-colors">Contact Us</Link>
                        <Link href="/faq" className="text-[13px] hover:text-primary transition-colors">FAQs</Link>
                        <Link href="/shipping" className="text-[13px] hover:text-primary transition-colors">Shipping Info</Link>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-base md:text-lg font-bold text-white">Legal</h3>
                        <Link href="/privacy" className="text-[13px] hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-[13px] hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/20 pt-8 text-center text-[12px]">
                    © {new Date().getFullYear()} Chiyo Aki. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
