import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Admin from './pages/Admin';
import MyOrders from "./pages/MyOrders";

// New Editorial Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomeEditorial } from './components/HomeEditorial';

function App() {
  return (
    <>
      <Header />
      <CartDrawer />
      <div className="pt-20 lg:pt-16 min-h-screen bg-bg-primary text-text-primary">
        <Routes>
          <Route path="/" element={<HomeEditorial />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/orders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
