# 🛒 SHOP-FLOW — Modern Dark-Theme Storefront

![ShopFlow Banner](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80)

<div align="center">

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=black)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shop-flow-gouse.vercel.app/)

</div>

---

## 🔗 Quick Links

- 🌐 **Live Storefront Demo:** [https://shop-flow-gouse.vercel.app/](https://shop-flow-gouse.vercel.app/)
- 📦 **GitHub Repository:** [https://github.com/shaikgouse18/SHOP-FLOW](https://github.com/shaikgouse18/SHOP-FLOW)

---

## 📖 About Shop Flow

**SHOP-FLOW** is a state-of-the-art e-commerce storefront redesigned with a dark aesthetic, fluid micro-interactions, responsive touch-optimized navigation, and resilient mock data fallback systems.

Whether evaluated with or without a live backend connection, **Shop Flow** provides an interactive shopping experience complete with multi-category product filtering (including **Men's Fashion**, **Women's Fashion**, **Electronics**, **Accessories**, **Footwear**, **Bags**, and **Home**), instant side drawer cart management, discount promo codes, express checkout, and order history tracking.

---

## ✨ Key Features & Enhancements

- 🖤 **Dark Theme Design System:** Built on a palette (`#0A0A0B`, `#141416`, `#1C1C1F`) with electric indigo highlights (`#6366F1`) and subtle glassmorphic elements.
- 👔 **Men's & Women's Fashion Collections:** Dedicated categories for men's and women's apparel with multi-image product galleries, size/color variant selectors, and customer reviews.
- ⚡ **Resilient Mock Data Engine (`mock-data.js`):** 24 products with fallbacks ensuring 100% demo availability without database downtime.
- 🔍 **Interactive Filters & Sorting:** Real-time client-side filtering by category, search query, price slider (₹2,000–₹1,00,000), stock availability toggle, and sorting (Price, Rating, Newest).
- 🖼️ **Product Gallery Lightbox:** Multi-image carousel slider on product detail pages with thumbnail controls, keyboard navigation, and full-screen lightbox zoom.
- 🛒 **Cart & Free Shipping Bar:** Persistent cart state via `Zustand` with free shipping progress calculations, quantity modifiers, and promo codes (`SHOPFLOW10` / `DARKMODE20`).
- 💳 **Express Checkout:** Inline form validation, payment method selector (Razorpay/Card, COD), order summary, and order completion screens.
- 🔐 **Instant 1-Click Demo Auth:** Quick demo login alongside Firebase Auth and Google Sign-In support.
- 📦 **My Orders Dashboard:** Order history overview with status badges (*Confirmed*, *Shipped*, *Delivered*, *Cancelled*) and cancellation options.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | [React 19](https://react.dev/) & [React Router v7](https://reactrouter.com/) |
| **Styling & Icons** | [Tailwind CSS v3](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) (Cart persistence & drawer state) |
| **Backend & Auth** | [Firebase Auth](https://firebase.google.com/docs/auth) & [Cloud Firestore](https://firebase.google.com/docs/firestore) |
| **Data Fallback** | `src/lib/mock-data.js` & `src/lib/products.js` wrapper |
| **Hosting & Deployment** | [Vercel](https://vercel.com/) with SPA route rewriting (`vercel.json`) |

---

## 💻 Local Setup & Development

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### 2. Clone & Install
```bash
git clone https://github.com/shaikgouse18/SHOP-FLOW.git
cd SHOP-FLOW/ecommerce-app
npm install
```

### 3. Environment Configuration
Create a `.env` file in `ecommerce-app`:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

---

## 🚀 Deployment Guide (Vercel)

The repository includes a tuned `vercel.json` configuration to prevent deployment issues:

```json
{
  "buildCommand": "CI=false npm run build",
  "outputDirectory": "build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy Steps:
1. Push latest code to GitHub:
   ```bash
   git add .
   git commit -m "Update categories, dark theme polish, and Vercel build config"
   git push origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/dashboard):
   - **Root Directory**: `ecommerce-app`
   - **Framework Preset**: Create React App
   - **Build Command**: `CI=false npm run build`
   - **Output Directory**: `build`
3. Click **Deploy**. SPA rewrites prevent 404 errors when refreshing inner pages.

---

## 📂 Project Structure

```
ecommerce-app/
├── public/              # Index template & favicon assets
├── src/
│   ├── components/      # UI Header, Footer, ProductCard, CartDrawer, HomeEditorial
│   ├── lib/             # Firebase configuration, products API & mock-data.js
│   ├── pages/           # Home, Products, ProductDetail, Cart, Checkout, Login, MyOrders
│   ├── store/           # Zustand cart store (useCartStore.js)
│   ├── App.js           # Router & layout entry point
│   └── index.css        # Tailwind directives & dark theme utilities
├── vercel.json          # Vercel SPA build & rewrite rules
├── package.json         # Project scripts & dependencies
└── README.md            # Project documentation
```

---

## 👤 Author

- **Shaik Gouse** — [GitHub Profile](https://github.com/shaikgouse18)
