import { useCartStore } from '@/stores/cartStore';
import { CartItem } from '@/types/payment';

export function useCart() {
  const store = useCartStore();

  const addProduct = (product: any, quantity = 1) => {
    const item: CartItem = {
      productId: product.id,
      quantity,
      price: product.price,
      title: product.title,
      image: product.image,
    };
    store.addItem(item);
  };

  return {
    items: store.items,
    subtotal: store.subtotal,
    discount: store.discount,
    total: store.getTotal(),
    addProduct,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    applyCoupon: store.applyCoupon,
    removeCoupon: store.removeCoupon,
    clear: store.clear,
  };
}
