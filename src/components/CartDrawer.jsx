import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';

const FREE_SHIPPING_THRESHOLD = 15000;

export const CartDrawer = () => {
    const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
    const subtotal = getSubtotal();
    const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
                <div className="w-screen max-w-md bg-bg-surface border-l border-border-hairline flex flex-col justify-between shadow-2xl">

                    {/* Drawer Header */}
                    <div className="p-5 border-b border-border-hairline flex items-center justify-between">
                        <div className="flex items-center gap-2 text-text-primary">
                            <ShoppingBag size={18} className="text-accent-primary" />
                            <h2 className="font-sans text-xs uppercase tracking-widest font-bold">
                                Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
                            </h2>
                        </div>
                        <button
                            onClick={closeCart}
                            className="p-1.5 text-text-muted hover:text-text-primary rounded-lg transition-colors"
                            aria-label="Close Bag"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Free Shipping Progress Indicator */}
                    <div className="bg-bg-primary px-5 py-3 border-b border-border-hairline">
                        <p className="text-[11px] text-text-secondary mb-1.5 flex items-center gap-1.5">
                            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                    <CheckCircle2 size={13} /> You qualify for Free Express Shipping!
                                </span>
                            ) : (
                                <>
                                    Add <strong className="text-text-primary font-bold">₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')}</strong> more for Free Shipping
                                </>
                            )}
                        </p>
                        <div className="w-full bg-bg-surface h-1.5 rounded-full overflow-hidden border border-border-hairline">
                            <div
                                className="bg-accent-primary h-full transition-all duration-300 rounded-full"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-bg-primary flex items-center justify-center text-text-muted border border-border-hairline">
                                    <ShoppingBag size={28} />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-text-primary">Your bag is empty</p>
                                    <p className="text-xs text-text-muted mt-1">Explore our latest items across tech and apparel.</p>
                                </div>
                                <button
                                    onClick={closeCart}
                                    className="px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={`${item.id}-${item.color}-${item.size}`}
                                    className="flex gap-4 p-4 bg-bg-primary border border-border-hairline rounded-2xl relative group"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-24 object-cover rounded-xl bg-bg-surface shrink-0"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-xs text-text-primary line-clamp-1 pr-4">{item.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id, item.color, item.size)}
                                                    className="text-text-muted hover:text-red-400 transition-colors"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <p className="text-[11px] text-text-muted mt-1">
                                                {item.color || 'Standard'} / Size: <span className="text-text-secondary font-semibold">{item.size || 'Standard'}</span>
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-3">
                                            <div className="flex items-center bg-bg-surface border border-border-hairline rounded-xl p-0.5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, -1)}
                                                    className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="px-2.5 text-xs font-bold text-text-primary">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, 1)}
                                                    className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <span className="text-xs font-extrabold text-text-primary">
                                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Drawer Footer / Checkout CTA */}
                    {items.length > 0 && (
                        <div className="p-5 border-t border-border-hairline bg-bg-primary space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-text-muted uppercase tracking-wider font-semibold">Subtotal</span>
                                <span className="text-base font-extrabold text-text-primary">
                                    ₹{subtotal.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <p className="text-[10px] text-text-muted">Taxes, shipping, and discounts calculated at checkout.</p>

                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <Link
                                    to="/cart"
                                    onClick={closeCart}
                                    className="py-3 bg-bg-surface hover:bg-bg-elevated border border-border-hairline text-text-primary text-xs uppercase tracking-wider font-bold rounded-xl flex items-center justify-center transition-all"
                                >
                                    View Cart
                                </Link>

                                <Link
                                    to="/checkout"
                                    onClick={closeCart}
                                    className="py-3 bg-accent-primary hover:bg-accent-hover text-white text-xs uppercase tracking-wider font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg transition-all"
                                >
                                    Checkout <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
