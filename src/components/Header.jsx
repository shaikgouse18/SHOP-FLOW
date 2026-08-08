import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const NAV_LINKS = [
    { name: 'MEN', hasMega: true },
    { name: 'WOMEN', hasMega: true },
    { name: 'NEW IN', hasMega: false },
    { name: 'COLLECTIONS', hasMega: false },
    { name: 'TAILORING', hasMega: true },
    { name: 'ACCESSORIES', hasMega: false },
    { name: 'SALE', hasMega: false, isSale: true },
];

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMega, setActiveMega] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const totalCartItems = useCartStore((state) => state.getTotalItems());
    const openCart = useCartStore((state) => state.openCart);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-hairline h-16'
                    : 'bg-transparent h-20'
                }`}
            onMouseLeave={() => setActiveMega(null)}
        >
            <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
                {/* Left: Mobile Toggle & Desktop Nav */}
                <div className="flex items-center gap-8">
                    <button
                        className="lg:hidden p-2 -ml-2 text-text-primary"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <nav className="hidden lg:flex items-center gap-7">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.name}
                                onMouseEnter={() => setActiveMega(link.hasMega ? link.name : null)}
                                className={`text-nav font-medium uppercase tracking-wider transition-colors relative py-2 ${link.isSale ? 'text-accent-red' : 'text-text-primary hover:text-text-secondary'
                                    }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Center: Brand Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <a href="/" className="block">
                        <span className="font-sans text-2xl tracking-[0.25em] font-semibold text-text-primary uppercase">
                            SHOP FLOW
                        </span>
                    </a>
                </div>

                {/* Right: Functional Icons */}
                <div className="flex items-center gap-5 lg:gap-6">
                    <button className="text-text-primary hover:opacity-70 transition-opacity" aria-label="Search">
                        <Search size={19} strokeWidth={1.5} />
                    </button>
                    <a href="/account" className="hidden sm:block text-text-primary hover:opacity-70 transition-opacity" aria-label="Account">
                        <User size={19} strokeWidth={1.5} />
                    </a>
                    <a href="/wishlist" className="hidden sm:block text-text-primary hover:opacity-70 transition-opacity relative" aria-label="Wishlist">
                        <Heart size={19} strokeWidth={1.5} />
                    </a>
                    <button
                        onClick={openCart}
                        className="text-text-primary hover:opacity-70 transition-opacity relative flex items-center"
                        aria-label="Cart"
                    >
                        <ShoppingBag size={19} strokeWidth={1.5} />
                        {totalCartItems > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-text-primary text-bg-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {totalCartItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mega Menu Overlay */}
            {activeMega && (
                <div
                    className="hidden lg:block absolute top-full left-0 right-0 bg-bg-white border-b border-border-hairline shadow-lg transition-all duration-200 py-12 px-12"
                    onMouseEnter={() => setActiveMega(activeMega)}
                    onMouseLeave={() => setActiveMega(null)}
                >
                    <div className="max-w-[1440px] mx-auto grid grid-cols-5 gap-12">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-semibold">Clothing</p>
                            <ul className="space-y-2 text-sm text-text-primary">
                                <li><a href="/shop/t-shirts" className="hover:underline">T-Shirts & Polos</a></li>
                                <li><a href="/shop/shirts" className="hover:underline">Casual & Dress Shirts</a></li>
                                <li><a href="/shop/knitwear" className="hover:underline">Fine Knitwear</a></li>
                                <li><a href="/shop/jackets" className="hover:underline">Jackets & Coats</a></li>
                                <li><a href="/shop/trousers" className="hover:underline">Trousers & Chinos</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-semibold">Tailoring</p>
                            <ul className="space-y-2 text-sm text-text-primary">
                                <li><a href="/shop/suits" className="hover:underline">Two-Piece Suits</a></li>
                                <li><a href="/shop/blazers" className="hover:underline">Tailored Blazers</a></li>
                                <li><a href="/shop/formal-trousers" className="hover:underline">Suit Trousers</a></li>
                                <li><a href="/shop/evening" className="hover:underline">Evening Wear</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-semibold">Footwear</p>
                            <ul className="space-y-2 text-sm text-text-primary">
                                <li><a href="/shop/sneakers" className="hover:underline">Leather Sneakers</a></li>
                                <li><a href="/shop/loafers" className="hover:underline">Italian Loafers</a></li>
                                <li><a href="/shop/boots" className="hover:underline">Chelsea Boots</a></li>
                            </ul>
                        </div>
                        <div className="col-span-2 relative group overflow-hidden bg-bg-soft aspect-[16/9]">
                            <img
                                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200"
                                alt="Autumn Tailoring Preview"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-transparent to-transparent p-6 flex flex-col justify-end text-bg-white">
                                <span className="text-xs uppercase tracking-widest font-semibold">Editorial Feature</span>
                                <p className="font-serif text-2xl font-light">The British Tailoring Cut</p>
                                <a href="/tailoring" className="text-xs uppercase tracking-wider mt-2 underline underline-offset-4 font-medium">
                                    Explore Tailoring →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
