# 🛒 SHOP-FLOW - Modern E-Commerce Platform

![ShopFlow Banner](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80)

<div align="center">

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=black)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shop-flow-gouse.vercel.app/)

</div>

---

## 🔗 Quick Links

- 🌐 **Live Demo Application:** [https://shop-flow-gouse.vercel.app/](https://shop-flow-gouse.vercel.app/)
- 📦 **GitHub Repository:** [https://github.com/shaikgouse18/SHOP-FLOW](https://github.com/shaikgouse18/SHOP-FLOW)

---

## 📖 About The Project

**SHOP-FLOW** is a responsive, feature-rich e-commerce application designed to deliver an intuitive and fast shopping experience. From browsing products by categories to interactive product reviews, cart management, and seamless authentication, ShopFlow provides a end-to-end shopping experience powered by **React 19** and **Firebase**.

---

## ✨ Key Features

- 🛍️ **Product Catalog & Discovery:** Browse products across diverse categories (Electronics, Clothing, Bags, Accessories, Footwear, and more).
- 🔍 **Smart Filtering & Sorting:** Instant client-side filtering by category/search query, plus sorting by price (low to high, high to low), ratings, and featured status.
- ⭐️ **Product Reviews & Ratings:** Authenticated users can leave star ratings and detailed reviews on products, stored dynamically in Cloud Firestore.
- 🛒 **Cart & Wishlist Management:** Interactive shopping cart with quantity management, dynamic price calculations, and centered pop-up notifications when items are added.
- 🔐 **User Authentication:** Firebase Auth integration for seamless user registration, sign-in, and persistent session management.
- 📦 **Order Tracking & History:** View past orders with estimated delivery dates, tracking status, and order item breakdowns.
- 📱 **Fully Responsive UI:** Styled with Tailwind CSS, supporting mobile, tablet, and desktop viewports seamlessly.

---

## 🛠️ Tech Stack & Technologies

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | [React 19](https://react.dev/) & [React Router v7](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) & Lucide React Icons |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) & React Context API |
| **Backend / Database** | [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) |
| **Authentication** | [Firebase Auth](https://firebase.google.com/docs/auth) |
| **Deployment & Hosting** | [Vercel](https://vercel.com/) |

---

## 💻 Local Setup & Development

Follow these steps to clone and run the application locally on your machine:

### 1. Prerequisites
- Node.js (v18.x or higher recommended)
- npm (v9.x or higher)

### 2. Clone the Repository
```bash
git clone https://github.com/shaikgouse18/SHOP-FLOW.git
cd SHOP-FLOW/ecommerce-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the `ecommerce-app` directory with your Firebase project credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

> 💡 *Note: You can copy `.env.example` to create your `.env` file.*

### 5. Launch Development Server
```bash
npm start
```
The application will open automatically at [http://localhost:3000](http://localhost:3000).

---

## 🚀 Deployment Guide

### 🐙 1. Deploying to GitHub

To push your latest changes to GitHub:

1. **Stage all updated files:**
   ```bash
   git add .
   ```

2. **Commit your changes:**
   ```bash
   git commit -m "Update README, add Vercel routing configuration, and polish app"
   ```

3. **Push to the remote repository:**
   ```bash
   git push origin main
   ```

---

### ⚡ 2. Deploying to Vercel

ShopFlow is configured for continuous deployment on Vercel.

#### **Option A: GitHub Integration (Recommended)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** ➡️ **"Project"**.
2. Import your GitHub repository: `shaikgouse18/SHOP-FLOW`.
3. Set the **Root Directory** to `ecommerce-app` (if the repo contains `ecommerce-app` as a subdirectory).
4. Under **Framework Preset**, select **Create React App**.
5. Expand **Environment Variables** and add all `REACT_APP_FIREBASE_*` keys from your `.env` file.
6. Click **Deploy**. Vercel will automatically build and publish your site!

#### **Option B: Vercel CLI**
1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. Run deployment command inside the `ecommerce-app` directory:
   ```bash
   vercel --prod
   ```

> ⚠️ **SPA Route Support:** The included `vercel.json` ensures client-side routing (React Router) works seamlessly without `404` errors when refreshing routes on Vercel.

---

## 📂 Project Structure

```
ecommerce-app/
├── public/              # Static assets & HTML template
├── src/
│   ├── components/      # UI Components (Navbar, Footer, Modals, Cards)
│   ├── context/         # React Context state management
│   ├── firebase/        # Firebase initialization & services
│   ├── pages/           # Page routes (Home, Products, Cart, Checkout, Admin)
│   ├── types/           # Data models & helper definitions
│   ├── App.jsx          # App entry with router setup
│   └── index.css        # Tailwind CSS imports & global styles
├── .env.example         # Template for environment variables
├── vercel.json          # Vercel SPA rewrite configuration
├── package.json         # Project dependencies & scripts
└── README.md            # Documentation
```

---

## 👤 Author

- **Shaik Gouse** - [GitHub Profile](https://github.com/shaikgouse18)

---

*Made with ❤️ for a modern e-commerce web experience.*
