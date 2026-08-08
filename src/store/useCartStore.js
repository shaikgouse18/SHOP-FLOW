import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            addItem: (newItem, quantity = 1) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        (item) =>
                            item.id === newItem.id &&
                            item.color === newItem.color &&
                            item.size === newItem.size
                    );

                    if (existingIndex > -1) {
                        const updated = [...state.items];
                        updated[existingIndex].quantity += quantity;
                        return { items: updated, isOpen: true };
                    }

                    return {
                        items: [...state.items, { ...newItem, quantity }],
                        isOpen: true,
                    };
                });
            },

            removeItem: (id, color, size) => {
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.id === id && i.color === color && i.size === size)
                    ),
                }));
            },

            updateQuantity: (id, color, size, delta) => {
                set((state) => ({
                    items: state.items
                        .map((item) => {
                            if (item.id === id && item.color === color && item.size === size) {
                                const newQty = item.quantity + delta;
                                return newQty > 0 ? { ...item, quantity: newQty } : null;
                            }
                            return item;
                        })
                        .filter(Boolean),
                }));
            },

            clearCart: () => set({ items: [] }),

            getSubtotal: () => {
                return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },

            getTotalItems: () => {
                return get().items.reduce((acc, item) => acc + item.quantity, 0);
            },
        }),
        {
            name: 'shopflow_cart_storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ items: state.items }),
        }
    )
);
