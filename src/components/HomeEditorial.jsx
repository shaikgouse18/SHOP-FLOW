import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const FEATURED_PRODUCTS = [
    {
        id: 'sf-101',
        slug: 'signature-wool-blazer',
        name: 'Signature British Wool Blazer',
        category: 'Tailoring',
        price: 34999,
        color: 'Midnight Navy',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800',
        hoverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800',
    },
    {
        id: 'sf-102',
        slug: 'striped-silk-shirt',
        name: 'Twill Stripe Silk Accent Shirt',
        category: 'Shirts',
        price: 14499,
        color: 'Ivory / Cobalt',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800',
        hoverImage: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=800',
    },
    {
        id: 'sf-103',
        slug: 'pleated-wool-trouser',
        name: 'Relaxed Tapered Wool Trouser',
        category: 'Trousers',
        price: 18999,
        color: 'Charcoal',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
        hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800',
    },
    {
        id: 'sf-104',
        slug: 'calfskin-minimal-loafer',
        name: 'Burnished Leather Penny Loafer',
        category: 'Footwear',
        price: 22499,
        color: 'Espresso',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800',
        hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800',
    },
];

export const HomeEditorial = () => {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <main className="bg-bg-primary text-text-primary pt-20">
            {/* 1. HERO SECTION */}
            <section className="relative h-[90vh] lg:h-[95vh] w-full overflow-hidden bg-text-primary text-bg-white">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000"
                    alt="Shop Flow Autumn Winter 2026 Editorial"
                    className="w-full h-full object-cover opacity-80 scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/20 to-transparent flex flex-col justify-end p-8 lg:p-16 max-w-[1440px] mx-auto">
                    <span className="text-xs lg:text-sm font-semibold tracking-[0.3em] uppercase text-accent-yellow mb-2">
                        Autumn / Winter 2026
                    </span>
                    <h1 className="font-serif text-hero-mobile lg:text-hero-desktop font-light max-w-4xl leading-tight mb-4">
                        The New Classics.
                    </h1>
                    <p className="text-sm lg:text-base font-sans text-bg-soft max-w-xl mb-8 font-light leading-relaxed">
                        Sharp silhouettes. Unexpected contrast. Timeless tailoring re-imagined for modern movement.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/men"
                            className="px-8 py-4 bg-bg-white text-text-primary font-sans text-xs uppercase tracking-[0.15em] font-medium hover:bg-bg-soft transition-colors"
                        >
                            Shop Men
                        </a>
                        <a
                            href="/women"
                            className="px-8 py-4 border border-bg-white text-bg-white font-sans text-xs uppercase tracking-[0.15em] font-medium hover:bg-bg-white hover:text-text-primary transition-colors"
                        >
                            Shop Women
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. ASYMMETRICAL EDITORIAL CATEGORY GRID */}
            <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24">
                <div className="flex justify-between items-end mb-12 border-b border-border-hairline pb-4">
                    <h2 className="font-serif text-3xl lg:text-section-title font-light">Explore Shop Flow</h2>
                    <span className="text-xs uppercase tracking-widest text-text-secondary">Curated Categories</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Main Hero Card (Large: 7 cols) */}
                    <a href="/men" className="lg:col-span-7 group relative bg-bg-soft overflow-hidden min-h-[520px] flex flex-col justify-end p-8">
                        <img
                            src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1200"
                            alt="Men's Collection"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-text-primary/20 group-hover:bg-text-primary/30 transition-colors" />
                        <div className="relative z-10 text-bg-white">
                            <span className="text-xs uppercase tracking-widest mb-1 block">Collection</span>
                            <h3 className="font-serif text-4xl mb-2">Men’s Modern Wardrobe</h3>
                            <p className="text-xs tracking-wider uppercase flex items-center gap-2 font-medium">
                                Discover Spread <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </p>
                        </div>
                    </a>

                    {/* Secondary Cards Column (5 cols) */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-8">
                        <a href="/tailoring" className="group relative bg-bg-soft overflow-hidden min-h-[245px] flex flex-col justify-end p-6">
                            <img
                                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800"
                                alt="Tailoring"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-text-primary/25" />
                            <div className="relative z-10 text-bg-white">
                                <h3 className="font-serif text-2xl">Tailoring, Reconsidered</h3>
                                <span className="text-xs uppercase tracking-wider underline mt-1 inline-block">Explore Suits</span>
                            </div>
                        </a>

                        <a href="/accessories" className="group relative bg-bg-soft overflow-hidden min-h-[245px] flex flex-col justify-end p-6">
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
                                alt="Accessories"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-text-primary/25" />
                            <div className="relative z-10 text-bg-white">
                                <h3 className="font-serif text-2xl">Fine Leather & Accents</h3>
                                <span className="text-xs uppercase tracking-wider underline mt-1 inline-block">Shop Accessories</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* 3. NEW ARRIVALS CAROUSEL GRID */}
            <section className="bg-bg-white py-24 border-y border-border-hairline">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-xs uppercase tracking-widest text-accent-cobalt font-semibold block mb-1">
                                New Arrivals
                            </span>
                            <h2 className="font-serif text-3xl lg:text-4xl font-light">Selected Autumn Pieces</h2>
                        </div>
                        <a href="/shop" className="text-xs uppercase tracking-widest font-semibold underline underline-offset-4 hover:text-text-secondary">
                            View All Products
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FEATURED_PRODUCTS.map((product) => (
                            <div key={product.id} className="group relative flex flex-col">
                                <div className="relative aspect-[3/4] bg-bg-primary overflow-hidden mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
                                    />
                                    <img
                                        src={product.hoverImage}
                                        alt={`${product.name} alternate view`}
                                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <button
                                        onClick={() =>
                                            addItem({
                                                id: product.id,
                                                slug: product.slug,
                                                name: product.name,
                                                price: product.price,
                                                color: product.color,
                                                size: 'M',
                                                image: product.image,
                                            })
                                        }
                                        className="absolute bottom-0 left-0 right-0 bg-text-primary text-bg-white text-xs uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium"
                                    >
                                        Quick Add (M) — ₹{product.price.toLocaleString('en-IN')}
                                    </button>
                                </div>
                                <div className="flex justify-between items-start text-sm">
                                    <div>
                                        <h3 className="font-medium text-text-primary text-sm leading-snug">{product.name}</h3>
                                        <p className="text-xs text-text-secondary mt-0.5">{product.color}</p>
                                    </div>
                                    <span className="font-mono text-sm font-light">₹{product.price.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SIGNATURE BRAND DETAILS FEATURE */}
            <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent-red">The Details Matter</span>
                    <h2 className="font-serif text-4xl lg:text-5xl font-light leading-tight">
                        Classic forms, unexpected details, and a wardrobe built for movement.
                    </h2>
                    <p className="text-text-secondary font-light leading-relaxed">
                        Every Shop Flow piece carries quiet architectural signatures—contrast interior piping, Horn buttoning, and ethically sourced horn-blend hardware. Designed between London and New Delhi.
                    </p>
                    <a
                        href="/stories/craftsmanship"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-text-primary pb-1 pt-2 hover:text-text-secondary hover:border-text-secondary transition-colors"
                    >
                        Read About Our Craft <ArrowRight size={14} />
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=600"
                        alt="Stitching Detail"
                        className="w-full aspect-[4/5] object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=600"
                        alt="Fabric Macro Texture"
                        className="w-full aspect-[4/5] object-cover mt-8"
                    />
                </div>
            </section>
        </main>
    );
};
