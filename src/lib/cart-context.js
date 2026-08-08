import React from "react";
import { useCartStore } from "../store/useCartStore";

export function CartProvider({ children }) {
  return <>{children}</>;
}

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const contextUpdateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  // Wrapper implementations to match the old Context API signatures
  const addToCart = (product) => {
    // Setting dummy size and color if they don't exist since old app didn't use them
    addItem({ ...product, color: product.color || 'Default', size: product.size || 'M' }, 1);
  };

  const removeFromCart = (productId) => {
    // Old implementation only passed ID. Remove by checking all items with that ID.
    const itemToRemove = items.find(i => i.id === productId);
    if (itemToRemove) {
      removeItem(itemToRemove.id, itemToRemove.color, itemToRemove.size);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const itemToUpdate = items.find(i => i.id === productId);
    if (!itemToUpdate) return;

    // newQuantity was absolute, zustand uses delta
    const delta = newQuantity - itemToUpdate.quantity;
    contextUpdateQuantity(itemToUpdate.id, itemToUpdate.color, itemToUpdate.size, delta);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems: getTotalItems(),
    totalPrice: getSubtotal(),
  };
}
