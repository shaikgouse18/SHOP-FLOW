import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

// Get all products
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get single product
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Add a review to a product
export const addReview = async (productId, reviewData) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = docSnap.data();
      const existingReviews = product.reviews || [];
      const newReviews = [...existingReviews, reviewData];

      // Calculate new average rating
      const totalRating = newReviews.reduce((sum, rev) => sum + Number(rev.rating), 0);
      const newRating = (totalRating / newReviews.length).toFixed(1);

      await updateDoc(docRef, {
        reviews: newReviews,
        rating: Number(newRating)
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error adding review:", error);
    return false;
  }
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

      // Calculate new average rating
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
    return false;
  } catch (error) {
    console.error("Error removing review:", error);
    return false;
  }
};