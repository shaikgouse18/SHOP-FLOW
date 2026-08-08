import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight, LogOut, Package, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const NAV_LINKS = [
    { name: 'MEN', href: '/products?category=Men' },
    { name: 'WOMEN', href: '/products?category=Women' },
    { name: 'NEW IN', href: '/products' },
    { name: 'COLLECTIONS', href: '/products' },
    { name: 'TAILORING', href: '/products?category=Tailoring' },
    { name: 'ACCESSORIES', href: '/products?category=Accessories' },
    { name: 'SALE', href: '/products', isSale: true },
];

export const Header = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const totalCartItems = useCartStore((state) => state.getTotalItems());
    const openCart = useCartStore((state) => state.openCart);

    // Listen to scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Listen to Firebase & Local Auth
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
            } else {
                const localUser = localStorage.getItem('shopflow_user');
                if (localUser) {
                    try {
                        setUser(JSON.parse(localUser));
                    } catch (e) {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            }
        });
        return unsub;
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setMobileMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.log("Signout notice:", e);
        }
        localStorage.removeItem('shopflow_user');
        setUser(null);
        setUserMenuOpen(false);
        navigate('/');
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                        ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-hairline h-16 shadow-sm'
                        : 'bg-bg-primary/80 backdrop-blur-sm border-b border-border-hairline/50 h-20'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

                    {/* Left Section: Mobile Toggle & Desktop Brand Logo */}
                    <div className="flex items-center gap-4 lg:gap-8">
                        <button
                            className="lg:hidden p-2 -ml-2 text-text-primary hover:opacity-70 transition-opacity"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open Navigation Menu"
                        >
                            <Menu size={22} />
                        </button>

                        <Link to="/" className="flex items-center gap-2 group shrink-0">
                            <span className="font-sans text-xl sm:text-2xl tracking-[0.2em] font-semibold text-text-primary uppercase group-hover:opacity-80 transition-opacity">
                                SHOP FLOW
                            </span>
                        </Link>
                    </div>

                    {/* Center Section: Desktop Navigation Links (Clean & Spaced, No Overlap) */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${link.isSale
                                        ? 'text-red-600 hover:text-red-700 font-bold'
                                        : 'text-text-primary hover:text-text-secondary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section: Action Icons */}
                    <div className="flex items-center gap-3 sm:gap-5">

                        {/* Inline Search Bar on Desktop / Toggle */}
                        <div className="relative">
                            {searchOpen ? (
                                <form onSubmit={handleSearchSubmit} className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="w-36 sm:w-56 h-9 pl-3 pr-8 text-xs bg-bg-white border border-border-hairline rounded-full focus:outline-none focus:ring-1 focus:ring-text-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setSearchOpen(false)}
                                        className="absolute right-2.5 text-text-muted hover:text-text-primary"
                                    >
                                        <X size={15} />
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="p-1.5 text-text-primary hover:opacity-70 transition-opacity"
                                    aria-label="Search Products"
                                >
                                    <Search size={19} strokeWidth={1.5} />
                                </button>
                            )}
                        </div>

                        {/* Account Menu / Login */}
                        <div className="relative">
                            {user ? (
                                <div>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="p-1.5 text-text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
                                        aria-label="User Account"
                                    >
                                        <User size={19} strokeWidth={1.5} className="text-emerald-600" />
                                        <span className="hidden xl:inline-block text-xs font-medium max-w-[80px] truncate">
                                            {user.displayName || user.name || user.email?.split('@')[0]}
                                        </span>
                                    </button>

                                    {/* User Dropdown */}
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-bg-white border border-border-hairline rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                                            <div className="px-4 py-2 border-b border-border-hairline">
                                                <p className="text-xs font-semibold text-text-primary truncate">
                                                    {user.displayName || user.name || "Signed In"}
                                                </p>
                                                <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/orders"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 text-xs text-text-primary hover:bg-bg-soft transition-colors"
                                            >
                                                <Package size={14} /> My Orders
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <LogOut size={14} /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="p-1.5 text-text-primary hover:opacity-70 transition-opacity"
                                    aria-label="Sign In"
                                >
                                    <User size={19} strokeWidth={1.5} />
                                </Link>
                            )}
                        </div>

                        {/* Cart Button */}
                        <button
                            onClick={openCart}
                            className="p-1.5 text-text-primary hover:opacity-70 transition-opacity relative flex items-center"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag size={19} strokeWidth={1.5} />
                            {totalCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-text-primary text-bg-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalCartItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* 📱 Mobile Navigation Slide-Over Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="fixed top-0 left-0 bottom-0 w-[310px] max-w-[85vw] bg-bg-white z-50 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform duration-300 animate-slide-in">
                        <div>
                            {/* Drawer Header */}
                            <div className="p-5 flex items-center justify-between border-b border-border-hairline">
                                <span className="font-sans text-xl tracking-[0.2em] font-semibold text-text-primary uppercase">
                                    SHOP FLOW
                                </span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-text-primary hover:opacity-70"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Mobile Search Form */}
                            <div className="p-4 border-b border-border-hairline bg-bg-primary/50">
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <Search size={16} className="absolute left-3 top-3 text-text-muted" />
                                    <input
                                        type="text"
                                        placeholder="Search catalog..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 pl-9 pr-4 text-xs bg-bg-white border border-border-hairline rounded-lg focus:outline-none focus:ring-1 focus:ring-text-primary"
                                    />
                                </form>
                            </div>

                            {/* Mobile Nav Links */}
                            <div className="py-2">
                                <p className="px-5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                    Categories
                                </p>
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary hover:bg-bg-soft transition-colors border-b border-border-hairline/40"
                                    >
                                        <span className={link.isSale ? 'text-red-600 font-bold' : ''}>
                                            {link.name}
                                        </span>
                                        <ChevronRight size={15} className="text-text-muted" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Drawer Footer Actions */}
                        <div className="p-5 border-t border-border-hairline bg-bg-soft space-y-3">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-text-primary">
                                        <Sparkles size={14} className="text-emerald-600" />
                                        Logged in as {user.displayName || user.name || user.email}
                                    </div>
                                    <Link
                                        to="/orders"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-2.5 bg-bg-white border border-border-hairline rounded-lg text-xs font-semibold text-text-primary flex items-center justify-center gap-2 hover:bg-bg-primary"
                                    >
                                        <Package size={15} /> My Orders
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-red-100"
                                    >
                                        <LogOut size={15} /> Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-3 bg-text-primary text-bg-white rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                                >
                                    <User size={15} /> Sign In / Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
