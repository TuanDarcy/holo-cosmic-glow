import { create } from "zustand";
import { CartItem, Order, OrderStatus } from "@/types/payment";

interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clear: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  discount: 0,
  couponCode: undefined,

  addItem: (item: CartItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.productId === item.productId);
      let newItems;

      if (existing) {
        newItems = state.items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      } else {
        newItems = [...state.items, item];
      }

      const subtotal = newItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );

      return {
        items: newItems,
        subtotal,
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.productId !== productId);
      const subtotal = newItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );

      return {
        items: newItems,
        subtotal,
      };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => {
      const newItems = state.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      );
      const subtotal = newItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );

      return {
        items: newItems,
        subtotal,
      };
    });
  },

  applyCoupon: (code: string, discount: number) => {
    set({ couponCode: code, discount });
  },

  removeCoupon: () => {
    set({ couponCode: undefined, discount: 0 });
  },

  clear: () => {
    set({ items: [], subtotal: 0, discount: 0, couponCode: undefined });
  },

  getTotal: () => {
    const state = get();
    return state.subtotal - state.discount;
  },
}));
