import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-bg-surface text-text-primary border-t border-border-hairline pt-16 pb-12">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-hairline">
                    {/* Brand Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <span className="font-sans text-2xl tracking-[0.25em] font-extrabold text-text-primary uppercase block">
                            SHOP FLOW
                        </span>
                        <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
                            Premium digital storefront engineered for luxury apparel, elevated accessories, and modern home tech. Seamless transitions, curated design.
                        </p>
                        <div className="pt-2">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-accent-primary mb-2">Join Shop Flow Club</p>
                            <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-bg-primary text-text-primary text-xs px-4 py-2.5 rounded-l-xl border border-border-subtle focus:outline-none focus:border-accent-primary flex-1 placeholder:text-text-muted"
                                />
                                <button
                                    type="submit"
                                    className="bg-accent-primary text-white text-xs uppercase tracking-wider px-5 py-2.5 font-bold rounded-r-xl hover:bg-accent-hover transition-colors shadow-md"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Navigation Column 1 */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-4">Shop</h4>
                        <ul className="space-y-2 text-xs text-text-secondary">
                            <li><Link to="/products?category=Men's Fashion" className="hover:text-accent-primary transition-colors">Men's Fashion</Link></li>
                            <li><Link to="/products?category=Women's Fashion" className="hover:text-accent-primary transition-colors">Women's Fashion</Link></li>
                            <li><Link to="/products?category=Electronics" className="hover:text-accent-primary transition-colors">Electronics & Audio</Link></li>
                            <li><Link to="/products?category=Footwear" className="hover:text-accent-primary transition-colors">Sneakers & Boots</Link></li>
                            <li><Link to="/products?category=Accessories" className="hover:text-accent-primary transition-colors">Watches & Glasses</Link></li>
                            <li><Link to="/products?category=Bags" className="hover:text-accent-primary transition-colors">Travel & Duffles</Link></li>
                        </ul>
                    </div>

                    {/* Navigation Column 2 */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-4">Assistance</h4>
                        <ul className="space-y-2 text-xs text-text-secondary">
                            <li><Link to="/products" className="hover:text-accent-primary transition-colors">Client Services</Link></li>
                            <li><Link to="/products" className="hover:text-accent-primary transition-colors">Shipping Information</Link></li>
                            <li><Link to="/products" className="hover:text-accent-primary transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/orders" className="hover:text-accent-primary transition-colors">Track Order</Link></li>
                            <li><Link to="/products" className="hover:text-accent-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Navigation Column 3 */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-4">House</h4>
                        <ul className="space-y-2 text-xs text-text-secondary">
                            <li><Link to="/" className="hover:text-accent-primary transition-colors">Our Philosophy</Link></li>
                            <li><Link to="/" className="hover:text-accent-primary transition-colors">Journal</Link></li>
                            <li><Link to="/" className="hover:text-accent-primary transition-colors">Flagship Outlets</Link></li>
                            <li><Link to="/" className="hover:text-accent-primary transition-colors">Material Integrity</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-text-muted gap-4">
                    <p>© 2026 SHOP FLOW. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/products" className="hover:text-text-primary">Privacy Policy</Link>
                        <Link to="/products" className="hover:text-text-primary">Terms of Service</Link>
                        <Link to="/products" className="hover:text-text-primary">Accessibility</Link>
                    </div>
                    <span className="font-mono text-text-secondary">INDIA / INR (₹)</span>
                </div>
            </div>
        </footer>
    );
};
