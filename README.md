# 🛒 SHOP-FLOW - Modern E-Commerce Platform

![Shop-Flow Banner](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80) 
*(A fully functional, modern e-commerce platform built with React & Firebase)*

## 🔗 Links
- **Live Demo Application:** [https://shop-flow-gouse.vercel.app/](https://shop-flow-gouse.vercel.app/)
- **GitHub Repository:** [https://github.com/shaikgouse18/SHOP-FLOW](https://github.com/shaikgouse18/SHOP-FLOW)

---

## 📖 About The Project

**SHOP-FLOW** is a responsive, feature-rich e-commerce application. It provides users with a seamless shopping experience from browsing products to adding items to the cart and securely logging in to place orders. The UI is built to be modern, highly interactive, and lightning-fast, ensuring a premium e-commerce feel. 

The backend operations, including authentication, database management (products, reviews, and categories) are entirely powered by **Firebase**, while the frontend is deployed effortlessly on **Vercel**.

### ✨ Core Features
- **Product Discovery:** Browse hundreds of generic products across multiple categories (Electronics, Clothing, Bags, Accessories, Footwear, etc.).
- **Smart Filtering & Sorting:** Instantly filter items by category or keyword search. Sort them smartly by Price (Low/High), Ratings, or Featured.
- **Detailed Product Pages:** View product descriptions, read customer reviews, and see intelligent `Order Placed` & dynamically calculated `Expected Delivery` dates.
- **Cart & Wishlist:** Responsive cart management powered by Context API with a beautiful central pop-up toast notification when verifying additions to the cart.
- **User Authentication:** Robust login and signup flow directly integrated with Firebase Auth.
- **Customer Reviews:** Authenticated users can leave 1-to-5 star ratings and reviews on individual products.
- **Admin & Order History:** Dedicated pages to track mock order history and admin-level views.

---

## 🛠️ Built With

This project harnesses the power of modern web technologies to deliver a fast and scalable architecture:

- **Frontend Framework:** [React.js](https://reactjs.org/) (Create React App)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for beautiful, responsive UI design
- **Routing:** [React Router v7](https://reactrouter.com/) for client-side navigation
- **Icons:** [Lucide-React](https://lucide.dev/) for crisp, consistent iconography
- **Backend-as-a-Service (BaaS):** [Firebase](https://firebase.google.com/) 
  - **Firebase Auth** for secure user handling
  - **Cloud Firestore** for NoSQL data management (Products, Reviews, Cart details)
- **Deployment & Hosting:** [Vercel](https://vercel.com/)

---

## 💻 Running Locally

If you'd like to clone this repository and run it on your own machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/shaikgouse18/SHOP-FLOW.git
cd SHOP-FLOW
cd ecommerce-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase Environments
Create a `.env` file in the root of the `ecommerce-app` directory and add your Firebase configuration variables. 

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Start the Application
Run the setup in development mode:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🚀 Deployment

The production build of this application is fully optimized. It is deployed continuously utilizing **Vercel's** seamless GitHub integration. Pushing to the `main` branch automatically triggers a new deployment build.

1. Connect the GitHub Repo to Vercel.
2. Select standard `Create React App` framework presets.
3. Inject the `.env` variables into the Vercel project environment configuration securely.
4. Deploy!

---

*Custom designed and developed by Shaik Gouse.*
