import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, RotateCcw, Search, Check, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/product-card';
import { getProducts } from '../lib/products';

export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setLoading(true);
    getProducts().then((data) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  const categories = [
    "All",
    "Men's Fashion",
    "Women's Fashion",
    "Electronics",
    "Accessories",
    "Footwear",
    "Bags",
    "Home"
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const catMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const searchMatch = searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.tags && product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const priceMatch = product.price <= maxPrice;
      const stockMatch = !onlyInStock || product.stockStatus !== 'out_of_stock';

      return catMatch && searchMatch && priceMatch && stockMatch;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return list.sort((a, b) => (b.id > a.id ? 1 : -1));
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(100000);
    setOnlyInStock(false);
    setSortBy('featured');
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 lg:pt-24 pb-20">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-hairline pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-primary">Storefront Catalog</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-1">
              {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== 'All' ? `${selectedCategory} Collection` : 'All Products'}
            </h1>
            <p className="text-xs text-text-muted mt-1">
              {searchQuery
                ? `Found ${sortedProducts.length} product${sortedProducts.length !== 1 ? 's' : ''} matching your search query`
                : `Showing ${sortedProducts.length} of ${products.length} total curated items`}
            </p>
          </div>

          {/* Quick Active Filters Reset */}
          {(selectedCategory !== 'All' || searchQuery || onlyInStock || maxPrice < 100000) && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border-hairline rounded-xl text-xs font-semibold text-accent-primary hover:bg-bg-elevated transition-colors"
            >
              <RotateCcw size={14} /> Clear All Filters
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar Filter Panel */}
          <aside className="w-full lg:w-72 bg-bg-surface border border-border-hairline rounded-2xl p-6 shadow-xl shrink-0 space-y-6">

            <div className="flex items-center justify-between border-b border-border-hairline pb-4">
              <div className="flex items-center gap-2 text-text-primary">
                <SlidersHorizontal size={18} className="text-accent-primary" />
                <h2 className="font-bold text-sm uppercase tracking-wider">Filters</h2>
              </div>
              <span className="text-[10px] text-text-muted font-mono">{sortedProducts.length} Items</span>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (searchQuery) {
                        setSearchParams({ category: cat });
                      } else {
                        navigate(cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat
                      ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                      }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-border-hairline pt-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Max Price</h3>
                <span className="text-xs font-extrabold text-accent-primary">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={100000}
                step={2000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-accent-primary bg-bg-primary h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Availability Filter */}
            <div className="border-t border-border-hairline pt-5">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary">
                  In Stock Only
                </span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 accent-accent-primary rounded cursor-pointer"
                />
              </label>
            </div>

          </aside>

          {/* Main Products Grid */}
          <div className="flex-1 w-full space-y-6">

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-bg-surface border border-border-hairline rounded-2xl">
              <p className="text-xs text-text-muted">
                Displaying <span className="font-bold text-text-primary">{sortedProducts.length}</span> items
              </p>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-text-muted hidden sm:inline">Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-bg-primary border border-border-hairline rounded-xl text-xs font-semibold text-text-primary px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent-primary cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-bg-primary border border-border-hairline rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid'
                      ? 'bg-accent-primary text-white'
                      : 'text-text-muted hover:text-text-primary'
                      }`}
                    title="Grid View"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'list'
                      ? 'bg-accent-primary text-white'
                      : 'text-text-muted hover:text-text-primary'
                      }`}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products List / Grid Container */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-bg-surface border border-border-hairline rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-16 px-6 bg-bg-surface border border-border-hairline rounded-3xl text-center max-w-md mx-auto space-y-4 shadow-xl">
                <Search size={36} className="text-text-muted mx-auto" />
                <h3 className="text-lg font-bold text-text-primary">No Products Found</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  We couldn't find any products matching your current category or search filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <RotateCcw size={14} /> Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}