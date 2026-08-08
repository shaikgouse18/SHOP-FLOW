import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Zap, RefreshCw } from 'lucide-react';
import { getProducts } from '../lib/products';
import { ProductCard } from './product-card';

export const HomeEditorial = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((prods) => {
            setFeaturedProducts(prods.slice(0, 8));
            setLoading(false);
        });
    }, []);

    const CATEGORIES = [
        {
            name: "Men's Apparel",
            cat: "Men's Fashion",
            image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
            itemCount: "42 Items"
        },
        {
            name: "Women's Apparel",
            cat: "Women's Fashion",
            image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
            itemCount: "38 Items"
        },
        {
            name: "Personal Tech & Audio",
            cat: "Electronics",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            itemCount: "28 Items"
        },
        {
            name: "Footwear & Sneakers",
            cat: "Footwear",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
            itemCount: "45 Items"
        }
    ];

    return (
        <div className="space-y-16 lg:space-y-24 pb-20">

            {/* Dark Theme Hero Banner */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border-hairline bg-gradient-to-b from-bg-primary via-bg-surface to-bg-primary px-4 sm:px-6 lg:px-10">

                {/* Glow Spheres */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent-primary/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="max-w-[1440px] mx-auto w-full py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                    {/* Left Text */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-bold uppercase tracking-wider">
                            <Sparkles size={14} />
                            2026 Dark Edition Collection
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.05]">
                            Redefining <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-indigo-300 to-emerald-400">
                                Modern Aesthetics.
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
                            Curated tech, artisanal garments, and luxury lifestyle accessories crafted with minimalist precision and dark aesthetic elegance.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-4">
                            <Link
                                to="/products"
                                className="px-8 py-4 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-accent-primary/20 flex items-center gap-3 group active:scale-98"
                            >
                                Explore Storefront
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/products?category=Electronics"
                                className="px-8 py-4 bg-bg-surface hover:bg-bg-elevated border border-border-hairline text-text-primary text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                            >
                                Audio & Tech
                            </Link>
                        </div>

                        {/* Quick Metrics */}
                        <div className="pt-8 border-t border-border-hairline grid grid-cols-3 gap-6 max-w-md">
                            <div>
                                <p className="text-2xl font-extrabold text-text-primary">24+</p>
                                <p className="text-[11px] text-text-muted">Curated Products</p>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-emerald-400">4.9★</p>
                                <p className="text-[11px] text-text-muted">Avg Customer Rating</p>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-accent-primary">24h</p>
                                <p className="text-[11px] text-text-muted">Express Dispatch</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Hero Image Card */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border-subtle bg-bg-surface shadow-2xl group">
                            <img
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80"
                                alt="Dark Edition Hero Product"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 p-5 bg-bg-primary/80 backdrop-blur-md border border-border-hairline rounded-2xl">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-primary">Featured Product</span>
                                <h3 className="text-base font-bold text-text-primary">Vanguard ANC Headphones</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-extrabold text-text-primary">₹14,999</span>
                                    <Link
                                        to="/products/prod-2"
                                        className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
                                    >
                                        View Details <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Category Spotlights Grid */}
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-accent-primary">Collections</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">Shop By Category</h2>
                    </div>
                    <Link to="/products" className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1">
                        All Categories <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((item) => (
                        <Link
                            key={item.name}
                            to={`/products?category=${encodeURIComponent(item.cat)}`}
                            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border-hairline bg-bg-surface block shadow-lg hover:border-accent-primary/50 transition-all"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />

                            <div className="absolute bottom-5 left-5 right-5 space-y-1">
                                <span className="text-[10px] font-bold text-accent-primary uppercase tracking-wider">{item.itemCount}</span>
                                <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                    {item.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products Showcase */}
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-accent-primary">Trending Now</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">Featured Arrivals</h2>
                    </div>
                    <Link to="/products" className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1">
                        Browse All {featuredProducts.length} Items <ArrowRight size={14} />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-80 bg-bg-surface border border-border-hairline rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Brand Value Propositions */}
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-bg-surface border border-border-hairline rounded-3xl shadow-xl">
                    <div className="flex items-start gap-4 p-4">
                        <div className="p-3 bg-accent-primary/10 rounded-2xl text-accent-primary shrink-0 border border-accent-primary/20">
                            <Zap size={22} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-text-primary">Instant Dispatch</h4>
                            <p className="text-xs text-text-muted mt-1 leading-relaxed">
                                Orders processed and shipped within 24 hours with real-time tracking updates.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 shrink-0 border border-emerald-500/20">
                            <Shield size={22} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-text-primary">Guaranteed Authenticity</h4>
                            <p className="text-xs text-text-muted mt-1 leading-relaxed">
                                100% original premium materials sourced directly from verified manufacturers.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 shrink-0 border border-indigo-500/20">
                            <RefreshCw size={22} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-text-primary">Hassle-Free Returns</h4>
                            <p className="text-xs text-text-muted mt-1 leading-relaxed">
                                30-day money-back guarantee with doorstep pickup for exchange or full refund.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
