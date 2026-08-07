import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { db, auth } from "../lib/firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const STATUS_COLORS = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Shipped': 'bg-purple-100 text-purple-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

export default function MyOrders() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Check login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: 'Cancelled' });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  // 📦 Fetch user's orders
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p className="p-10">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6 pt-16">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't made your first purchase.</p>
            <Link to="/products">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">

                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-border">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Order Placed
                      </p>
                      <p className="font-semibold text-foreground">
                        {order.createdAt?.toDate
                          ? order.createdAt.toDate().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                          : "Processing"}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:text-right">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Order ID
                      </p>
                      <p className="font-mono text-sm text-foreground">{order.id}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4 mb-6">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 bg-background rounded-md overflow-hidden flex-shrink-0 border border-border">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">No Img</div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className={`px-4 py-1.5 text-sm ${STATUS_COLORS[order.status] || 'bg-secondary text-secondary-foreground'}`}>
                        {order.status || 'Pending'}
                      </Badge>
                      {(!order.status || order.status === 'Pending' || order.status === 'Processing') && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground mr-3">Order Total:</span>
                      <span className="text-2xl font-bold text-primary">₹{(order.total || 0).toFixed(2)}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link to="/products">
                <Button variant="outline" className="gap-2">Continue Shopping</Button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}