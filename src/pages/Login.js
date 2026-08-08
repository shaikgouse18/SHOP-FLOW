import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  const formatAuthError = (errCode) => {
    if (!errCode) return 'Authentication failed. Please check your credentials.';
    if (errCode.includes('invalid-credential') || errCode.includes('wrong-password') || errCode.includes('user-not-found')) {
      return 'Invalid email or password. If you don\'t have an account yet, click "Sign Up" below.';
    }
    if (errCode.includes('email-already-in-use')) {
      return 'An account with this email already exists. Please switch to "Sign In".';
    }
    if (errCode.includes('weak-password')) {
      return 'Password must be at least 6 characters long.';
    }
    return 'Authentication notice: ' + errCode;
  };

  // ⚡ 1-Click Quick Demo Login
  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    const demoEmail = 'demo@shopflow.com';
    const demoPassword = 'password123';

    try {
      try {
        await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
      } catch (firstErr) {
        if (firstErr.code?.includes('user-not-found') || firstErr.code?.includes('invalid-credential')) {
          const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
          await setDoc(doc(db, "users", userCredential.user.uid), {
            email: demoEmail,
            name: "Demo Shopper",
            createdAt: new Date()
          });
        } else {
          throw firstErr;
        }
      }
      localStorage.setItem('shopflow_user', JSON.stringify({ email: demoEmail, name: "Demo Shopper" }));
      navigate('/');
    } catch (err) {
      console.warn("Using local demo auth fallback:", err.message);
      localStorage.setItem('shopflow_user', JSON.stringify({ email: demoEmail, name: "Demo Shopper" }));
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        try {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: user.displayName || email.split('@')[0],
            photo: user.photoURL || null,
            createdAt: new Date()
          });
        } catch (dbErr) { }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      localStorage.setItem('shopflow_user', JSON.stringify({ email, name: email.split('@')[0] }));
      navigate('/');
    } catch (err) {
      setError(formatAuthError(err.code || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: user.displayName || '',
          photo: user.photoURL || null,
          updatedAt: new Date()
        }, { merge: true });
      } catch (dbErr) { }

      localStorage.setItem('shopflow_user', JSON.stringify({ email: user.email, name: user.displayName }));
      navigate('/');
    } catch (err) {
      setError("Google sign-in cancelled or unavailable. Please use Email Sign In or 1-Click Quick Demo Login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="font-sans text-2xl tracking-[0.25em] font-extrabold text-text-primary uppercase hover:text-accent-primary transition-colors">
              SHOP FLOW
            </span>
          </Link>
          <h1 className="text-xl font-bold text-text-primary">
            {isSignup ? "Create Your Account" : "Welcome Back"}
          </h1>
          <p className="text-xs text-text-muted">
            {isSignup ? "Join Shop Flow to manage orders and checkout seamlessly" : "Sign in to access your saved cart & order history"}
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-bg-surface border border-border-hairline rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">

          {/* Quick Demo Login Banner */}
          <div className="p-4 bg-bg-primary border border-border-hairline rounded-2xl text-center space-y-2">
            <p className="text-xs text-text-secondary flex items-center justify-center gap-1.5 font-semibold">
              <Sparkles size={14} className="text-emerald-400" />
              Evaluating the Storefront? 1-Click Instant Access
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 bg-accent-primary hover:bg-accent-hover text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? <Loader size={15} className="animate-spin" /> : "⚡ Quick Demo Login"}
            </button>
          </div>

          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-text-muted" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full h-10 pl-10 pr-3.5 text-xs bg-bg-primary border border-border-hairline rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-text-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full h-10 pl-10 pr-3.5 text-xs bg-bg-primary border border-border-hairline rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-bg-elevated hover:bg-border-subtle border border-border-hairline text-text-primary text-xs uppercase tracking-wider font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={15} className="animate-spin" />
                  {isSignup ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                isSignup ? "Sign Up Now" : "Sign In"
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border-hairline" />
            <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-border-hairline" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 bg-bg-primary hover:bg-bg-elevated border border-border-hairline text-text-primary text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Toggle */}
          <p className="text-center text-xs text-text-muted pt-2">
            {isSignup ? "Already have an account?" : "Don't have an account yet?"}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="ml-1.5 text-accent-primary font-bold hover:underline"
            >
              {isSignup ? "Sign In" : "Create Account"}
            </button>
          </p>

        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors">
            <ArrowLeft size={14} /> Return to Storefront Home
          </Link>
        </div>

      </div>
    </div>
  );
}