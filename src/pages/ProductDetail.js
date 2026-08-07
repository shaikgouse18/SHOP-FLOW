import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { ProductCard } from '../components/product-card';
import { Button } from '../components/ui/button';
import { useCart } from '../lib/cart-context';
import { getProductById, getProducts, addReview, removeReview } from '../lib/products';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [user, setUser] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Fetch product + all products
  useEffect(() => {
    getProductById(id).then(setProduct);
    getProducts().then(setAllProducts);
  }, [id]);

  // Loading state
  if (!product) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  // Related products (from Firebase now)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    // Add to cart and go to checkout
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/checkout');
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to leave a review");
    if (!reviewComment.trim()) return alert("Comment cannot be empty");
    setIsSubmittingReview(true);
    const newReview = {
      id: crypto.randomUUID(),
      userId: user.uid,
      userEmail: user.email,
      rating: reviewRating,
      comment: reviewComment,
      createdAt: Date.now()
    };
    const success = await addReview(id, newReview);
    if (success) {
      setReviewComment('');
      setReviewRating(5);
      getProductById(id).then(setProduct);
    } else {
      alert("Failed to add review.");
    }
    setIsSubmittingReview(false);
  };

  const handleRemoveReview = async (reviewId) => {
    const success = await removeReview(id, reviewId);
    if (success) {
      getProductById(id).then(setProduct);
    } else {
      alert("Failed to remove review.");
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-16">

        {/* Back */}
        <nav className="mb-8">
          <Link to="/products" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </nav>

        {/* Product */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg"
          />

          {/* Info */}
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>

            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-gray-300'
                    }`}
                />
              ))}
              <span>{product.rating}</span>
            </div>

            <p className="text-xl font-bold mt-4">₹{product.price}</p>

            <p className="mt-4 text-muted-foreground">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-6 bg-muted rounded-lg p-3 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:bg-background rounded transition"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="px-4 font-semibold text-foreground min-w-[2rem] text-center">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:bg-background rounded transition"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAddToCart}
                variant="outline"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart ({quantity})
              </Button>

              <Button
                onClick={handleBuyNow}
                className="flex-1"
              >
                Buy Now
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
              </Button>
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          {/* Review List */}
          <div className="space-y-6 mb-8">
            {(!product.reviews || product.reviews.length === 0) ? (
              <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            ) : (
              product.reviews.map((rev) => (
                <div key={rev.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{rev.userEmail || rev.userId}</p>
                      <div className="flex items-center gap-1 mt-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    {user && (
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveReview(rev.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        Delete
                      </Button>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{rev.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          {user ? (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`h-6 w-6 cursor-pointer ${star <= reviewRating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Comment</label>
                  <textarea
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    rows="3"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                  />
                </div>
                <Button type="submit" disabled={isSubmittingReview}>
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
              <p>Log in to leave a review</p>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </div>
          )}
        </section>


        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}