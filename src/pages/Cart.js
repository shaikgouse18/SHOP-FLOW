import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 499;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const discountAmount = Math.round(subtotal * discount);
  const finalTotal = subtotal + shipping + tax - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'SHOPFLOW10') {
      setDiscount(0.10);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'DARKMODE20') {
      setDiscount(0.20);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promo code. Try SHOPFLOW10 or DARKMODE20');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-bg-surface border border-border-hairline rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-bg-primary border border-border-hairline flex items-center justify-center mx-auto text-text-muted">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Your Cart is Empty</h1>
            <p className="text-xs text-text-secondary mt-1">Explore our latest luxury apparel, audio gear, and accessories.</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 lg:pt-24 pb-20">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between border-b border-border-hairline pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-primary">Checkout Preparation</span>
            <h1 className="text-3xl font-extrabold text-text-primary mt-1">Shopping Bag</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-text-muted hover:text-red-400 underline transition-colors"
          >
            Empty Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-bg-surface border border-border-hairline rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-bg-primary border border-border-hairline rounded-xl relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-28 object-cover rounded-xl bg-bg-surface shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/products/${item.id}`}
                          className="font-bold text-sm text-text-primary hover:text-accent-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="text-text-muted hover:text-red-400 p-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        Category: {item.category} | Color: {item.color || 'Standard'} | Size: {item.size || 'Standard'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center bg-bg-surface border border-border-hairline rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, -1)}
                          className="p-1.5 text-text-secondary hover:text-text-primary"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-text-primary">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, 1)}
                          className="p-1.5 text-text-secondary hover:text-text-primary"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="text-base font-extrabold text-text-primary">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={16} /> Back to Catalog
            </Link>
          </div>

          {/* Right Column: Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Promo Code Form */}
            <div className="bg-bg-surface border border-border-hairline rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3 flex items-center gap-2">
                <Tag size={15} className="text-accent-primary" /> Promo Code
              </h3>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SHOPFLOW10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-bg-primary border border-border-hairline rounded-xl px-3 py-2 text-xs text-text-primary uppercase placeholder:normal-case placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase rounded-xl transition-all"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <p className="text-xs text-emerald-400 mt-2 font-semibold flex items-center gap-1">
                  <Check size={14} /> {discount * 100}% Discount Applied!
                </p>
              )}
              {promoError && (
                <p className="text-xs text-red-400 mt-2 font-medium">{promoError}</p>
              )}
            </div>

            {/* Summary Breakdown */}
            <div className="bg-bg-surface border border-border-hairline rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border-hairline">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs text-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="font-semibold text-text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-text-primary">
                    {shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST Tax (18%)</span>
                  <span className="font-semibold text-text-primary">₹{tax.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Promo</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border-hairline flex justify-between items-baseline">
                <span className="text-sm font-bold text-text-primary">Total Amount</span>
                <span className="text-2xl font-extrabold text-text-primary">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2"
              >
                Proceed To Checkout <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-text-muted">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>SSL Encrypted Checkout</span>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
