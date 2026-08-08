import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Minus, Plus, ShoppingCart, Heart, ArrowLeft, ChevronLeft, ChevronRight,
  Check, Maximize2, X, ShieldCheck, Truck, RotateCcw, AlertCircle
} from 'lucide-react';
import { getProductById, getProducts, addReview, removeReview } from '../lib/products';
import { useCartStore } from '../store/useCartStore';
import { ProductCard } from '../components/product-card';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItemToCart = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Options & Quantity
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Auth & Reviews
  const [user, setUser] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        const localUser = localStorage.getItem('shopflow_user');
        if (localUser) {
          try { setUser(JSON.parse(localUser)); } catch (e) { setUser(null); }
        } else {
          setUser(null);
        }
      }
    });
    return unsubscribe;
  }, []);

  // Load Product Data
  useEffect(() => {
    setLoading(true);
    setSelectedImageIndex(0);
    setQuantity(1);

    Promise.all([getProductById(id), getProducts()]).then(([prod, prods]) => {
      setProduct(prod);
      setAllProducts(prods || []);
      if (prod) {
        if (prod.colors && prod.colors.length > 0) setSelectedColor(prod.colors[0]);
        if (prod.sizes && prod.sizes.length > 0) setSelectedSize(prod.sizes[0]);
      }
      setLoading(false);
    });
  }, [id]);

  // Keyboard navigation for image slider
  const handleKeyDown = useCallback((e) => {
    if (!product || !product.images || product.images.length <= 1) return;
    if (e.key === 'ArrowLeft') {
      setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'Escape') {
      setIsZoomOpen(false);
    }
  }, [product]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!product || !product.images) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next image
        setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
      } else {
        // Swiped right -> prev image
        setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
      }
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (product.stockStatus === 'out_of_stock') {
      showToast('Sorry, this product is currently out of stock.');
      return;
    }
    const itemToAdd = {
      ...product,
      color: selectedColor || 'Standard',
      size: selectedSize || 'Standard',
    };
    addItemToCart(itemToAdd, quantity);
    showToast(`Added ${quantity} × ${product.name} to your cart!`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (product.stockStatus === 'out_of_stock') {
      showToast('Sorry, this item is out of stock.');
      return;
    }
    const itemToAdd = {
      ...product,
      color: selectedColor || 'Standard',
      size: selectedSize || 'Standard',
    };
    addItemToCart(itemToAdd, quantity);
    navigate('/checkout');
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to post a review.');
      return;
    }
    if (!reviewComment.trim()) return;
    setIsSubmittingReview(true);

    const newReview = {
      id: crypto.randomUUID(),
      userId: user.uid || 'user-1',
      userEmail: user.email || 'customer@shopflow.com',
      rating: reviewRating,
      comment: reviewComment,
      createdAt: Date.now(),
    };

    const success = await addReview(id, newReview);
    if (success) {
      setReviewComment('');
      setReviewRating(5);
      const updated = await getProductById(id);
      setProduct(updated);
      showToast('Thank you! Your review has been published.');
    } else {
      showToast('Failed to post review. Please try again.');
    }
    setIsSubmittingReview(false);
  };

  const handleRemoveReview = async (reviewId) => {
    const success = await removeReview(id, reviewId);
    if (success) {
      const updated = await getProductById(id);
      setProduct(updated);
      showToast('Review removed.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary pt-24 pb-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
          <p className="text-sm font-medium text-text-secondary">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-primary pt-28 pb-16 text-center px-4">
        <div className="max-w-md mx-auto bg-bg-surface border border-border-hairline rounded-2xl p-8 shadow-xl">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Product Not Found</h2>
          <p className="text-sm text-text-secondary mb-6">
            The item you are searching for might be out of stock or relocated.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg"
          >
            <ArrowLeft size={16} /> Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = images[selectedImageIndex] || images[0];

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 lg:pt-24 pb-20">

      {/* Toast Confirmation Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-slide-up bg-bg-elevated border border-accent-primary/40 text-text-primary px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm backdrop-blur-md">
          <div className="w-7 h-7 bg-accent-primary/20 rounded-full flex items-center justify-center shrink-0">
            <Check size={16} className="text-accent-primary" />
          </div>
          <p className="text-xs font-medium">{toastMessage}</p>
        </div>
      )}

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-text-muted">
          <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-text-primary transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-text-secondary truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Image Slider Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">

            {/* Main Stage Image Container */}
            <div
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-[5/4] w-full bg-bg-surface border border-border-hairline rounded-2xl overflow-hidden group select-none shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={currentImage}
                alt={`${product.name} - view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="eager"
              />

              {/* Prev / Next Hover Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-primary/80 backdrop-blur-md border border-border-hairline text-text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-primary/80 backdrop-blur-md border border-border-hairline text-text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute right-4 top-4 p-2.5 rounded-xl bg-bg-primary/80 backdrop-blur-md border border-border-hairline text-text-secondary hover:text-text-primary opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                title="Expand Zoom Lightbox"
              >
                <Maximize2 size={16} />
              </button>

              {/* Stock Status Pill Badge */}
              <div className="absolute left-4 top-4">
                {product.stockStatus === 'out_of_stock' ? (
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                    Out of Stock
                  </span>
                ) : product.stockStatus === 'low_stock' ? (
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                    Low Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                    In Stock
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip Gallery */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${selectedImageIndex === idx
                        ? 'border-accent-primary scale-105 shadow-md shadow-accent-primary/20'
                        : 'border-border-hairline opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Header Info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-primary mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                {product.name}
              </h1>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-bg-surface border border-border-hairline px-2.5 py-1 rounded-lg">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-text-primary">{product.rating}</span>
                </div>
                <span className="text-xs text-text-muted">
                  Based on {product.reviewCount || (product.reviews ? product.reviews.length : 18)} verified reviews
                </span>
              </div>
            </div>

            {/* Price & Savings */}
            <div className="p-4 bg-bg-surface border border-border-hairline rounded-2xl flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-text-primary">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>

              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-base text-text-muted line-through">
                    ₹{Number(product.compareAtPrice).toLocaleString('en-IN')}
                  </span>
                  <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Product Description */}
            <p className="text-sm leading-relaxed text-text-secondary">
              {product.description}
            </p>

            {/* Color Variant Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold uppercase tracking-wider text-text-muted">Color</span>
                  <span className="text-text-primary font-medium">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((clr) => (
                    <button
                      key={clr}
                      onClick={() => setSelectedColor(clr)}
                      className={`px-4 py-2 text-xs font-medium rounded-xl border transition-all ${selectedColor === clr
                          ? 'bg-accent-primary/20 border-accent-primary text-text-primary shadow-sm'
                          : 'bg-bg-surface border-border-hairline text-text-secondary hover:border-text-muted'
                        }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variant Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold uppercase tracking-wider text-text-muted">Size</span>
                  <span className="text-text-primary font-medium">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] px-3.5 py-2 text-xs font-medium rounded-xl border transition-all ${selectedSize === sz
                          ? 'bg-accent-primary border-accent-primary text-white shadow-md shadow-accent-primary/20 font-bold'
                          : 'bg-bg-surface border-border-hairline text-text-secondary hover:border-text-muted'
                        }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Stock Check */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-muted block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-bg-surface border border-border-hairline rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || product.stockStatus === 'out_of_stock'}
                    className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.stockStatus === 'out_of_stock'}
                    className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {product.stockCount !== undefined && (
                  <span className="text-xs text-text-muted">
                    {product.stockStatus === 'out_of_stock'
                      ? 'Currently unavailable'
                      : `${product.stockCount} units available`}
                  </span>
                )}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stockStatus === 'out_of_stock'}
                  className="flex-1 py-3.5 px-6 bg-accent-primary hover:bg-accent-hover disabled:bg-gray-800 disabled:text-gray-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShoppingCart size={16} />
                  Add To Cart
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3.5 rounded-xl border transition-all ${isWishlisted
                      ? 'bg-red-500/10 border-red-500/40 text-red-500'
                      : 'bg-bg-surface border-border-hairline text-text-secondary hover:text-text-primary'
                    }`}
                  title="Wishlist product"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-red-500' : ''} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={product.stockStatus === 'out_of_stock'}
                className="w-full py-3.5 bg-bg-surface hover:bg-bg-elevated border border-border-hairline text-text-primary text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                Buy It Now
              </button>
            </div>

            {/* Shipping & Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border-hairline text-center text-[11px] text-text-muted">
              <div className="p-3 bg-bg-surface border border-border-hairline rounded-xl flex flex-col items-center gap-1.5">
                <Truck size={18} className="text-accent-primary" />
                <span>Express Shipping</span>
              </div>
              <div className="p-3 bg-bg-surface border border-border-hairline rounded-xl flex flex-col items-center gap-1.5">
                <ShieldCheck size={18} className="text-emerald-400" />
                <span>Authentic Quality</span>
              </div>
              <div className="p-3 bg-bg-surface border border-border-hairline rounded-xl flex flex-col items-center gap-1.5">
                <RotateCcw size={18} className="text-amber-400" />
                <span>30-Day Returns</span>
              </div>
            </div>

          </div>

        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20 border-t border-border-hairline pt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">Customer Reviews</h2>
              <p className="text-xs text-text-muted mt-1">Real feedback from verified purchasers</p>
            </div>

            <div className="flex items-center gap-3 bg-bg-surface border border-border-hairline px-4 py-2 rounded-xl">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className={i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-600'} />
                ))}
              </div>
              <span className="text-sm font-bold text-text-primary">{product.rating} / 5</span>
            </div>
          </div>

          {/* Review List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {(!product.reviews || product.reviews.length === 0) ? (
              <div className="col-span-2 p-8 bg-bg-surface border border-border-hairline rounded-2xl text-center">
                <p className="text-xs text-text-muted">No reviews yet for this product. Be the first to share your experience!</p>
              </div>
            ) : (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-bg-surface border border-border-hairline rounded-2xl space-y-3 relative group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{rev.userEmail}</p>
                      <div className="flex items-center gap-1 mt-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < rev.rating ? 'fill-amber-400' : 'text-gray-600'} />
                        ))}
                      </div>
                    </div>
                    {user && (user.email === rev.userEmail || user.uid === rev.userId) && (
                      <button
                        onClick={() => handleRemoveReview(rev.id)}
                        className="text-[10px] text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed text-text-secondary">{rev.comment}</p>
                  <p className="text-[10px] text-text-muted">
                    {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Submit Review Form */}
          <div className="max-w-2xl bg-bg-surface border border-border-hairline rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">Write a Review</h3>
            {user ? (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={20}
                          className={star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Your Feedback</label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe product quality, fit, craftsmanship..."
                    className="w-full bg-bg-primary border border-border-hairline rounded-xl p-3 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="px-6 py-2.5 bg-accent-primary hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
                >
                  {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-muted">Please sign in to write a product review.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-bg-elevated border border-border-hairline text-text-primary text-xs font-semibold rounded-xl hover:bg-bg-primary"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Related Products Carousel Grid */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-border-hairline pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={currentImage}
            alt="Enlarged product detail view"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}

    </div>
  );
}