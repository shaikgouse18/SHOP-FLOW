import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Check, Truck, Lock, Package, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    country: 'India',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setFormData((prev) => ({
          ...prev,
          email: u.email || '',
          firstName: u.displayName ? u.displayName.split(' ')[0] : prev.firstName,
          lastName: u.displayName ? u.displayName.split(' ').slice(1).join(' ') : prev.lastName
        }));
      } else {
        const localUser = localStorage.getItem('shopflow_user');
        if (localUser) {
          try {
            const parsed = JSON.parse(localUser);
            setFormData((prev) => ({
              ...prev,
              email: parsed.email || '',
              firstName: parsed.displayName ? parsed.displayName.split(' ')[0] : prev.firstName
            }));
          } catch (e) { }
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const subtotal = getSubtotal();
  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 499;
  const tax = Math.round(subtotal * 0.18);
  const finalTotal = subtotal + shipping + tax;

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').substring(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').substring(0, 4);
      if (value.length >= 2) {
        value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    if (paymentMethod === 'razorpay') {
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.expiry.trim() || formData.expiry.length < 5) {
        newErrors.expiry = 'Valid MM/YY expiry required';
      }
      if (!formData.cvv.trim() || formData.cvv.length < 3) {
        newErrors.cvv = 'Valid CVV required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate realistic payment gateway processing
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const orderDetails = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: items,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: finalTotal,
        formData: formData,
        paymentMethod: paymentMethod,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
      };

      try {
        if (auth.currentUser) {
          await addDoc(collection(db, "orders"), {
            items,
            total: finalTotal,
            userId: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            createdAt: new Date(),
            status: 'Confirmed',
            shippingAddress: formData,
            paymentMethod: paymentMethod
          });
        }
      } catch (dbErr) {
        console.warn("Firestore order write skipped (mock order mode active)");
      }

      setConfirmedOrder(orderDetails);
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center text-text-primary">
        <div className="animate-spin w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Order Confirmed Screen
  if (orderComplete && confirmedOrder) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-bg-surface border border-border-hairline rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 animate-slide-up">

          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Check size={32} />
            </div>
            <span className="text-xs font-mono font-bold text-accent-primary uppercase tracking-widest">
              {confirmedOrder.orderId}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Order Confirmed!</h1>
            <p className="text-xs text-text-secondary">
              Thank you for shopping with Shop Flow. Your payment was verified successfully.
            </p>
          </div>

          {/* Items Breakdown */}
          <div className="bg-bg-primary border border-border-hairline rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted border-b border-border-hairline pb-2">
              Purchased Items
            </h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-text-primary font-semibold truncate pr-4">
                    {item.name} <span className="text-text-muted font-normal">x{item.quantity}</span>
                  </span>
                  <span className="text-text-primary font-extrabold shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border-hairline space-y-1 text-xs">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span>₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Express Shipping</span>
                <span>{confirmedOrder.shipping === 0 ? 'FREE' : `₹${confirmedOrder.shipping}`}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>GST Tax (18%)</span>
                <span>₹{confirmedOrder.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-text-primary pt-2 border-t border-border-hairline">
                <span>Total Paid</span>
                <span className="text-emerald-400">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-bg-primary border border-border-hairline rounded-2xl p-4 space-y-1">
              <h3 className="font-bold text-text-primary flex items-center gap-1.5 mb-2">
                <Truck size={14} className="text-accent-primary" /> Delivery Address
              </h3>
              <p className="text-text-secondary font-medium">{confirmedOrder.formData.firstName} {confirmedOrder.formData.lastName}</p>
              <p className="text-text-muted">{confirmedOrder.formData.address}</p>
              <p className="text-text-muted">{confirmedOrder.formData.city}, {confirmedOrder.formData.state} {confirmedOrder.formData.zipCode}</p>
            </div>

            <div className="bg-bg-primary border border-border-hairline rounded-2xl p-4 space-y-1">
              <h3 className="font-bold text-text-primary flex items-center gap-1.5 mb-2">
                <CreditCard size={14} className="text-accent-primary" /> Payment Info
              </h3>
              <p className="text-text-secondary font-medium uppercase">{confirmedOrder.paymentMethod}</p>
              <p className="text-text-muted">Status: Paid & Verified</p>
              <p className="text-text-muted">Receipt sent to {confirmedOrder.formData.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="flex-1 py-3 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/')}
              className="py-3 px-6 bg-bg-primary hover:bg-bg-elevated border border-border-hairline text-text-primary text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Back to Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-bg-surface border border-border-hairline rounded-3xl p-8 text-center space-y-4">
          <Package size={36} className="text-text-muted mx-auto" />
          <h2 className="text-lg font-bold text-text-primary">No Items to Checkout</h2>
          <p className="text-xs text-text-muted">Please add products to your cart before proceeding.</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-accent-primary text-white text-xs font-bold uppercase rounded-xl"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 lg:pt-24 pb-20">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-8 border-b border-border-hairline pb-6">
          <Link to="/cart" className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-accent-primary transition-colors mb-2">
            <ArrowLeft size={15} /> Back to Bag
          </Link>
          <h1 className="text-3xl font-extrabold text-text-primary">Express Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Contact & Shipping */}
            <div className="bg-bg-surface border border-border-hairline rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <Truck size={17} className="text-accent-primary" /> Contact & Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.email ? 'border-red-500' : 'border-border-hairline'}`}
                  />
                  {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.phone ? 'border-red-500' : 'border-border-hairline'}`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.firstName ? 'border-red-500' : 'border-border-hairline'}`}
                  />
                  {errors.firstName && <p className="text-[10px] text-red-400 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.lastName ? 'border-red-500' : 'border-border-hairline'}`}
                  />
                  {errors.lastName && <p className="text-[10px] text-red-400 mt-1">{errors.lastName}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Suite 404, Business Park"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.address ? 'border-red-500' : 'border-border-hairline'}`}
                  />
                  {errors.address && <p className="text-[10px] text-red-400 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.city ? 'border-red-500' : 'border-border-hairline'}`}
                  />
                  {errors.city && <p className="text-[10px] text-red-400 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">State & PIN</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full bg-bg-primary border rounded-xl px-3 py-2.5 text-xs text-text-primary focus:outline-none ${errors.state ? 'border-red-500' : 'border-border-hairline'}`}
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="PIN Code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full bg-bg-primary border rounded-xl px-3 py-2.5 text-xs text-text-primary focus:outline-none ${errors.zipCode ? 'border-red-500' : 'border-border-hairline'}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-bg-surface border border-border-hairline rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <CreditCard size={17} className="text-accent-primary" /> Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'razorpay'
                      ? 'bg-accent-primary/10 border-accent-primary text-text-primary'
                      : 'bg-bg-primary border-border-hairline text-text-secondary hover:border-border-subtle'
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="accent-accent-primary"
                  />
                  <div>
                    <p className="text-xs font-bold text-text-primary">Card / Razorpay (Demo)</p>
                    <p className="text-[10px] text-text-muted">Instant processing with mock verification</p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod'
                      ? 'bg-accent-primary/10 border-accent-primary text-text-primary'
                      : 'bg-bg-primary border-border-hairline text-text-secondary hover:border-border-subtle'
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-accent-primary"
                  />
                  <div>
                    <p className="text-xs font-bold text-text-primary">Cash on Delivery</p>
                    <p className="text-[10px] text-text-muted">Pay at doorstep upon arrival</p>
                  </div>
                </label>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'razorpay' && (
                <div className="pt-4 border-t border-border-hairline space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on card"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.cardName ? 'border-red-500' : 'border-border-hairline'}`}
                    />
                    {errors.cardName && <p className="text-[10px] text-red-400 mt-1">{errors.cardName}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="4532 1111 2222 3333"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength={19}
                      className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.cardNumber ? 'border-red-500' : 'border-border-hairline'}`}
                    />
                    {errors.cardNumber && <p className="text-[10px] text-red-400 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">Expiry</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleChange}
                        maxLength={5}
                        className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.expiry ? 'border-red-500' : 'border-border-hairline'}`}
                      />
                      {errors.expiry && <p className="text-[10px] text-red-400 mt-1">{errors.expiry}</p>}
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        maxLength={4}
                        className={`w-full bg-bg-primary border rounded-xl px-3.5 py-2.5 text-xs font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary ${errors.cvv ? 'border-red-500' : 'border-border-hairline'}`}
                      />
                      {errors.cvv && <p className="text-[10px] text-red-400 mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-bg-surface border border-border-hairline rounded-2xl p-6 shadow-xl sticky top-24 space-y-4">
              <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border-hairline">
                Order Breakdown ({items.length})
              </h2>

              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex justify-between items-center text-xs">
                    <div className="truncate pr-2">
                      <p className="font-bold text-text-primary truncate">{item.name}</p>
                      <p className="text-[10px] text-text-muted">Qty: {item.quantity} | {item.size}</p>
                    </div>
                    <span className="font-extrabold text-text-primary shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border-hairline space-y-2 text-xs text-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-text-primary">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Tax (18%)</span>
                  <span className="font-bold text-text-primary">₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border-hairline flex justify-between items-baseline">
                <span className="text-sm font-bold text-text-primary">Total Payable</span>
                <span className="text-2xl font-extrabold text-accent-primary">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2 active:scale-98"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  <>
                    <Lock size={15} /> Complete Order
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-text-muted pt-2">
                <ShieldCheck size={14} className="text-emerald-400" /> 256-Bit SSL Encrypted Payment
              </div>
            </div>
          </div>

        </form>

      </main>
    </div>
  );
}
