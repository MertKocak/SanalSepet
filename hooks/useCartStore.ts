import { getToCart } from '@/actions/cart/getToCart'
import { create } from 'zustand'

type CartItem = {
  totalPrice: number;
  id: string;
  name: string;
  quantity: number;
  price: number;
  products: unknown;
  productsdocID: string;
  color: string,
  size: string,
  userId: number,
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
