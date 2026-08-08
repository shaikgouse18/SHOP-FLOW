import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { MOCK_PRODUCTS } from "./mock-data";

// Helper to normalize product images into an array format
const normalizeProduct = (p) => {
  if (!p) return null;
  const primaryImage = p.image || p.imageUrl || (p.images && p.images[0]) || "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80";
  const imageList = Array.isArray(p.images) && p.images.length > 0 ? p.images : [primaryImage];
  return {
    ...p,
    image: primaryImage,
    images: imageList,
    rating: Number(p.rating || 4.8),
    reviewCount: Number(p.reviewCount || (p.reviews ? p.reviews.length : 12)),
    stockStatus: p.stockStatus || (p.stockCount === 0 ? "out_of_stock" : "in_stock"),
  };
};

// Get all products with fallback
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    if (snapshot && snapshot.docs && snapshot.docs.length > 0) {
      const dbProducts = snapshot.docs.map((docItem) => normalizeProduct({
        id: docItem.id,
        ...docItem.data(),
      }));
      // Merge DB products with mock products if DB has few items
      if (dbProducts.length < 5) {
        const dbIds = new Set(dbProducts.map(p => p.id));
        const extraMocks = MOCK_PRODUCTS.filter(m => !dbIds.has(m.id)).map(normalizeProduct);
        return [...dbProducts, ...extraMocks];
      }
      return dbProducts;
    }
  } catch (error) {
    console.warn("Firestore unreachable or empty, falling back to mock products:", error.message || error);
  }
  return MOCK_PRODUCTS.map(normalizeProduct);
};

// Get single product with fallback
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return normalizeProduct({
        id: docSnap.id,
        ...docSnap.data(),
      });
    }
  } catch (error) {
    console.warn("Firestore query failed for product ID, checking mock dataset:", error.message || error);
  }

  // Fallback to mock dataset search
  const foundMock = MOCK_PRODUCTS.find((p) => String(p.id) === String(id));
  return normalizeProduct(foundMock || MOCK_PRODUCTS[0]);
};

// Add a review to a product with fallback memory cache update
export const addReview = async (productId, reviewData) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = docSnap.data();
      const existingReviews = product.reviews || [];
      const newReviews = [...existingReviews, reviewData];

      const totalRating = newReviews.reduce((sum, rev) => sum + Number(rev.rating), 0);
      const newRating = (totalRating / newReviews.length).toFixed(1);

      await updateDoc(docRef, {
        reviews: newReviews,
        rating: Number(newRating)
      });
      return true;
    }
  } catch (error) {
    console.warn("Firestore review add failed, updating in-memory mock product:", error);
  }

  // Fallback for mock data
  const targetMock = MOCK_PRODUCTS.find((p) => String(p.id) === String(productId));
  if (targetMock) {
    if (!targetMock.reviews) targetMock.reviews = [];
    targetMock.reviews.push(reviewData);
    const total = targetMock.reviews.reduce((sum, r) => sum + Number(r.rating), 0);
    targetMock.rating = Number((total / targetMock.reviews.length).toFixed(1));
    targetMock.reviewCount = targetMock.reviews.length;
    return true;
  }
  return false;
};

// Remove a review from a product
export const removeReview = async (productId, reviewId) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = docSnap.data();
      const existingReviews = product.reviews || [];
      const newReviews = existingReviews.filter(rev => rev.id !== reviewId);

      let newRating = 0;
      if (newReviews.length > 0) {
        const totalRating = newReviews.reduce((sum, rev) => sum + Number(rev.rating), 0);
        newRating = Number((totalRating / newReviews.length).toFixed(1));
      }

      await updateDoc(docRef, {
        reviews: newReviews,
        rating: newRating
      });
      return true;
    }
  } catch (error) {
    console.warn("Firestore review remove failed:", error);
  }

  const targetMock = MOCK_PRODUCTS.find((p) => String(p.id) === String(productId));
  if (targetMock && targetMock.reviews) {
    targetMock.reviews = targetMock.reviews.filter(r => r.id !== reviewId);
    if (targetMock.reviews.length > 0) {
      const total = targetMock.reviews.reduce((sum, r) => sum + Number(r.rating), 0);
      targetMock.rating = Number((total / targetMock.reviews.length).toFixed(1));
    } else {
      targetMock.rating = 4.5;
    }
    targetMock.reviewCount = targetMock.reviews.length;
    return true;
  }
  return false;
};