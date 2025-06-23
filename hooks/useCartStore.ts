import { getToCart } from '@/actions/cart/getToCart'
import { create } from 'zustand'

type CartItem = {
  totalPrice: number;
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: unknown;
}

type CartState = {
  items: CartItem[];
  fetchItems: (userId: unknown, jwt: unknown) => Promise<void>;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  fetchItems: async (userId, jwt) => {
    const data = await getToCart(userId, jwt);
    set({ items: data });
  }
}));

export default useCartStore;
