import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export function ProductCard({ product }) {
  const addItemToCart = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stockStatus === 'out_of_stock') return;

    addItemToCart({
      ...product,
      color: product.colors ? product.colors[0] : 'Standard',
      size: product.sizes ? product.sizes[0] : 'Standard',
    }, 1);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image];
  const primaryImage = images[0] || product.image;
  const secondaryImage = images[1] || primaryImage;

  return (
    <div className="group bg-bg-surface border border-border-hairline rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent-primary/40 hover:shadow-2xl hover:shadow-accent-primary/5 flex flex-col h-full animate-slide-up">
      {/* Image Link Container */}
      <Link to={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-bg-primary block">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80";
          }}
        />

        {/* Secondary Hover Image crossfade */}
        {secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
          />
        )}

        {/* Stock Badge Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.stockStatus === 'out_of_stock' ? (
            <span className="px-2.5 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md">
              Out of Stock
            </span>
          ) : product.compareAtPrice && product.compareAtPrice > product.price ? (
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md">
              Sale
            </span>
          ) : null}
        </div>

        {/* Quick Add Overlay Button on Desktop Hover */}
        {product.stockStatus !== 'out_of_stock' && (
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-3 left-3 right-3 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md ${added
                ? 'bg-emerald-500 text-white'
                : 'bg-bg-primary/90 hover:bg-accent-primary text-text-primary hover:text-white border border-border-hairline opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
              }`}
          >
            {added ? (
              <>
                <Check size={15} /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Quick Add
              </>
            )}
          </button>
        )}
      </Link>

      {/* Product Information Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-primary">
              {product.category}
            </span>

            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-text-primary">{product.rating || 4.8}</span>
            </div>
          </div>

          <Link to={`/products/${product.id}`}>
            <h3 className="text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-text-muted line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border-hairline mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-text-primary">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-text-muted line-through">
                ₹{Number(product.compareAtPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={product.stockStatus === 'out_of_stock'}
            className={`p-2 rounded-xl border transition-all ${product.stockStatus === 'out_of_stock'
                ? 'bg-bg-primary text-gray-600 border-border-hairline cursor-not-allowed'
                : added
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-bg-elevated hover:bg-accent-primary text-text-secondary hover:text-white border-border-hairline'
              }`}
            aria-label="Add to cart"
          >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
