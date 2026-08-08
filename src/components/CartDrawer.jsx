import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';

const FREE_SHIPPING_THRESHOLD = 25000; // Free shipping above ₹25,000

export const CartDrawer = () => {
    const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
    const subtotal = getSubtotal();
    const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-bg-white border-l border-border-hairline flex flex-col justify-between shadow-2xl">
                    {/* Drawer Header */}
                    <div className="p-6 border-b border-border-hairline flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingBag size={18} />
                            <h2 className="font-sans text-sm uppercase tracking-widest font-semibold text-text-primary">
                                Your Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
                            </h2>
                        </div>
                        <button onClick={closeCart} className="p-1 text-text-primary hover:opacity-60" aria-label="Close Bag">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Free Shipping Progress Indicator */}
                    <div className="bg-bg-soft px-6 py-3 border-b border-border-hairline">
                        <p className="text-xs text-text-secondary mb-1.5 font-light">
                            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                <span className="text-accent-green font-medium">You qualify for Free Express Shipping across India!</span>
                            ) : (
                                <>Add <strong className="text-text-primary font-mono">₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')}</strong> more for Free Shipping</>
                            )}
                        </p>
                        <div className="w-full bg-border-hairline h-1 rounded-full overflow-hidden">
                            <div
                                className="bg-text-primary h-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Cart Item List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <p className="font-serif text-2xl text-text-muted mb-2">Your bag is empty.</p>
                                <p className="text-xs text-text-secondary mb-6">Explore our new tailored arrivals.</p>
                                <button
                                    onClick={closeCart}
                                    className="px-6 py-3 bg-text-primary text-bg-white text-xs uppercase tracking-widest"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 border-b border-border-hairline pb-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-24 object-cover bg-bg-soft flex-shrink-0"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium text-sm text-text-primary">{item.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id, item.color, item.size)}
                                                    className="text-xs text-text-muted hover:text-accent-red ml-2"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                            <p className="text-xs text-text-secondary mt-1">
                                                {item.color} / Size: <span className="text-text-primary font-medium">{item.size}</span>
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center border border-border-hairline">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, -1)}
                                                    className="p-1 px-2 text-text-primary hover:bg-bg-soft"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="px-3 text-xs font-mono">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, 1)}
                                                    className="p-1 px-2 text-text-primary hover:bg-bg-soft"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <span className="font-mono text-sm">
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
                        <div className="p-6 border-t border-border-hairline bg-bg-primary space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary uppercase tracking-wider text-xs">Subtotal</span>
                                <span className="font-mono text-base font-semibold">
                                    ₹{subtotal.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <p className="text-[11px] text-text-muted">Taxes and shipping calculated at checkout.</p>
                            <Link
                                to="/checkout"
                                onClick={closeCart}
                                className="w-full py-4 bg-text-primary text-bg-white font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-text-secondary transition-colors"
                            >
                                Proceed To Checkout <ArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
