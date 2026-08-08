import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-text-primary text-bg-white border-t border-border-dark pt-20 pb-12">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-text-secondary/30">
                    {/* Brand Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <span className="font-sans text-2xl tracking-[0.25em] font-semibold uppercase block">
                            SHOP FLOW
                        </span>
                        <p className="text-sm text-text-muted font-light max-w-sm leading-relaxed">
                            An independent modern digital fashion house. Classic silhouettes re-imagined with subtle twist details and bespoke tailoring.
                        </p>
                        <div className="pt-2">
                            <p className="text-xs uppercase tracking-widest text-bg-soft mb-2">Join Shop Flow Club</p>
                            <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-bg-soft/10 text-bg-white text-xs px-4 py-3 rounded-none border border-text-secondary/50 focus:outline-none focus:border-bg-white flex-1"
                                />
                                <button
                                    type="submit"
                                    className="bg-bg-white text-text-primary text-xs uppercase tracking-widest px-6 py-3 font-medium hover:bg-bg-soft transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Navigation Column 1 */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.15em] text-accent-yellow font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2.5 text-xs text-text-muted font-light">
                            <li><a href="/men" className="hover:text-bg-white transition-colors">Men's Tailoring</a></li>
                            <li><a href="/women" className="hover:text-bg-white transition-colors">Women's Collection</a></li>
                            <li><a href="/new-in" className="hover:text-bg-white transition-colors">New Arrivals</a></li>
                            <li><a href="/accessories" className="hover:text-bg-white transition-colors">Leather & Accessories</a></li>
                            <li><a href="/sale" className="hover:text-bg-white transition-colors">Seasonal Archive</a></li>
                        </ul>
                    </div>

                    {/* Navigation Column 2 */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.15em] text-accent-yellow font-semibold mb-4">Assistance</h4>
                        <ul className="space-y-2.5 text-xs text-text-muted font-light">
                            <li><a href="/help/contact" className="hover:text-bg-white transition-colors">Client Services</a></li>
                            <li><a href="/help/shipping" className="hover:text-bg-white transition-colors">Shipping & Express Delivery</a></li>
                            <li><a href="/help/returns" className="hover:text-bg-white transition-colors">Returns & Exchanges</a></li>
                            <li><a href="/help/size-guide" className="hover:text-bg-white transition-colors">Bespoke Size Guide</a></li>
                            <li><a href="/help/faq" className="hover:text-bg-white transition-colors">Frequently Asked Questions</a></li>
                        </ul>
                    </div>

                    {/* Navigation Column 3 */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.15em] text-accent-yellow font-semibold mb-4">House</h4>
                        <ul className="space-y-2.5 text-xs text-text-muted font-light">
                            <li><a href="/about" className="hover:text-bg-white transition-colors">Our Philosophy</a></li>
                            <li><a href="/stories" className="hover:text-bg-white transition-colors">Shop Flow Journal</a></li>
                            <li><a href="/stores" className="hover:text-bg-white transition-colors">Flagship Stores</a></li>
                            <li><a href="/sustainability" className="hover:text-bg-white transition-colors">Material Integrity</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-text-muted gap-4">
                    <p>© 2026 SHOP FLOW. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="/privacy" className="hover:text-bg-white">Privacy Policy</a>
                        <a href="/terms" className="hover:text-bg-white">Terms of Service</a>
                        <a href="/accessibility" className="hover:text-bg-white">Accessibility</a>
                    </div>
                    <span className="font-mono text-bg-white">INDIA / INR (₹)</span>
                </div>
            </div>
        </footer>
    );
};
