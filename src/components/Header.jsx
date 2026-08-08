import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, LogOut, Package, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const NAV_LINKS = [
    { name: 'ALL PRODUCTS', href: '/products' },
    { name: "MEN'S FASHION", href: "/products?category=Men's Fashion" },
    { name: "WOMEN'S FASHION", href: "/products?category=Women's Fashion" },
    { name: 'ELECTRONICS', href: '/products?category=Electronics' },
    { name: 'ACCESSORIES', href: '/products?category=Accessories' },
    { name: 'FOOTWEAR', href: '/products?category=Footwear' },
    { name: 'BAGS', href: '/products?category=Bags' },
    { name: 'HOME', href: '/products?category=Home' },
];

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const totalCartItems = useCartStore((state) => state.getTotalItems());
    const openCart = useCartStore((state) => state.openCart);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
            } else {
                const localUser = localStorage.getItem('shopflow_user');
                if (localUser) {
                    try { setUser(JSON.parse(localUser)); } catch (e) { setUser(null); }
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
        try { await signOut(auth); } catch (e) { }
        localStorage.removeItem('shopflow_user');
        setUser(null);
        setUserMenuOpen(false);
        navigate('/');
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                    ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-hairline h-16 shadow-xl'
                    : 'bg-bg-primary/80 backdrop-blur-sm border-b border-border-hairline/60 h-20'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

                    {/* Left: Mobile Toggle & Brand Logo */}
                    <div className="flex items-center gap-4 lg:gap-8">
                        <button
                            className="lg:hidden p-2 -ml-2 text-text-primary hover:text-accent-primary transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open Navigation Menu"
                        >
                            <Menu size={22} />
                        </button>

                        <Link to="/" className="flex items-center gap-2 group shrink-0">
                            <span className="font-sans text-xl sm:text-2xl tracking-[0.25em] font-extrabold text-text-primary uppercase group-hover:text-accent-primary transition-colors">
                                SHOP FLOW
                            </span>
                        </Link>
                    </div>

                    {/* Center: Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
                        {NAV_LINKS.slice(0, 7).map((link) => {
                            const isActive = location.pathname + location.search === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-[11px] font-bold uppercase tracking-widest transition-all relative py-1 ${isActive
                                        ? 'text-accent-primary'
                                        : 'text-text-secondary hover:text-text-primary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">

                        {/* Inline Search Bar */}
                        <div className="relative">
                            {searchOpen ? (
                                <form onSubmit={handleSearchSubmit} className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search storefront..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="w-40 sm:w-60 h-9 pl-3 pr-8 text-xs bg-bg-surface border border-border-subtle rounded-full text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-primary"
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
                                    className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-bg-surface"
                                    aria-label="Search Catalog"
                                >
                                    <Search size={19} strokeWidth={1.75} />
                                </button>
                            )}
                        </div>

                        {/* Account Dropdown */}
                        <div className="relative">
                            {user ? (
                                <div>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="p-1.5 text-text-primary hover:text-accent-primary transition-colors flex items-center gap-2 rounded-xl bg-bg-surface border border-border-hairline px-3 py-1.5"
                                        aria-label="User Menu"
                                    >
                                        <User size={16} className="text-emerald-400" />
                                        <span className="hidden xl:inline-block text-xs font-semibold max-w-[90px] truncate text-text-primary">
                                            {user.displayName || user.name || user.email?.split('@')[0]}
                                        </span>
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 bg-bg-elevated border border-border-subtle rounded-2xl shadow-2xl py-2 z-50 animate-slide-up">
                                            <div className="px-4 py-2.5 border-b border-border-hairline">
                                                <p className="text-xs font-bold text-text-primary truncate">
                                                    {user.displayName || user.name || "Signed In"}
                                                </p>
                                                <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/orders"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors"
                                            >
                                                <Package size={15} /> My Orders
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
                                            >
                                                <LogOut size={15} /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-bg-surface flex items-center"
                                    aria-label="Sign In"
                                >
                                    <User size={19} strokeWidth={1.75} />
                                </Link>
                            )}
                        </div>

                        {/* Cart Trigger */}
                        <button
                            onClick={openCart}
                            className="p-2 text-text-primary hover:text-accent-primary transition-colors relative flex items-center bg-bg-surface border border-border-hairline rounded-full"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag size={19} strokeWidth={1.75} />
                            {totalCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-primary text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-bg-primary shadow-md">
                                    {totalCartItems}
                                </span>
                            )}
                        </button>

                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    <div className="fixed top-0 left-0 bottom-0 w-[310px] max-w-[85vw] bg-bg-surface border-r border-border-hairline z-50 flex flex-col justify-between overflow-y-auto shadow-2xl">
                        <div>
                            <div className="p-5 flex items-center justify-between border-b border-border-hairline">
                                <span className="font-sans text-xl tracking-[0.2em] font-extrabold text-text-primary uppercase">
                                    SHOP FLOW
                                </span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-text-secondary hover:text-text-primary"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Mobile Search Input */}
                            <div className="p-4 border-b border-border-hairline bg-bg-primary">
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <Search size={16} className="absolute left-3 top-3 text-text-muted" />
                                    <input
                                        type="text"
                                        placeholder="Search catalog..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 pl-9 pr-4 text-xs bg-bg-surface border border-border-hairline rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-primary"
                                    />
                                </form>
                            </div>

                            {/* Mobile Nav Links */}
                            <div className="py-2">
                                <p className="px-5 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                    Categories
                                </p>
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary hover:bg-bg-elevated transition-colors border-b border-border-hairline/40"
                                    >
                                        <span>{link.name}</span>
                                        <ChevronRight size={15} className="text-text-muted" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Footer User Section */}
                        <div className="p-5 border-t border-border-hairline bg-bg-primary space-y-3">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-text-primary">
                                        <Sparkles size={14} className="text-emerald-400" />
                                        Logged in as {user.displayName || user.name || user.email}
                                    </div>
                                    <Link
                                        to="/orders"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-2.5 bg-bg-surface border border-border-hairline rounded-xl text-xs font-semibold text-text-primary flex items-center justify-center gap-2 hover:bg-bg-elevated"
                                    >
                                        <Package size={15} /> My Orders
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full py-2.5 bg-red-500/10 text-red-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-red-500/20 hover:bg-red-500/20"
                                    >
                                        <LogOut size={15} /> Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-3 bg-accent-primary text-white rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg"
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
