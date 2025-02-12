import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type Review = {
  user: string;
  rating: number;
  comment: string;
  image: string;
  date: string;
};
export type Price = {
  oldPrice: number;
  newPrice: number;
  currency: string;
};

export type AdditionalInfo = Record<
  string,
  string | number | (string | number)[] | undefined
>;

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: Price;
  rating: number;
  tags: string[];
  features: string[];
  description: string;
  mainImage: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  recommended: boolean;
  bestSelling: boolean;
  topProduct: boolean;
  additionalInformation?: AdditionalInfo;
  qty: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = (() => {
  try {
    const storedData = JSON.parse(localStorage.getItem("hd-cart") || "{}");
    return {
      items: Array.isArray(storedData.items) ? storedData.items : [],
      totalQuantity:
        typeof storedData.totalQuantity === "number"
          ? storedData.totalQuantity
          : 0,
      totalPrice:
        typeof storedData.totalPrice === "number" ? storedData.totalPrice : 0
    };
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return {
      items: [],
      totalQuantity: 0,
      totalPrice: 0
    };
  }
})();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        name,
        category,
        price,
        rating,
        tags,
        features,
        description,
        mainImage,
        images,
        inStock,
        featured,
        recommended,
        bestSelling,
        topProduct,
        additionalInformation,
        qty = 1
      }: CartItem = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += qty;
        existingItem.totalPrice = price.newPrice * existingItem.qty;
      } else {
        state.items.push({
          id,
          name,
          category,
          price,
          rating,
          tags,
          features,
          description,
          mainImage,
          images,
          inStock,
          featured,
          recommended,
          bestSelling,
          topProduct,
          additionalInformation,
          qty,
          totalPrice: qty * price.newPrice
        });
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.qty,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      localStorage.setItem("hd-cart", JSON.stringify(state));
      toast.success("Product added to cart");
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.qty,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      localStorage.setItem("hd-cart", JSON.stringify(state));
      toast.success("Product removed from cart!");
    },
    updateCart: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const { id, qty } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty = qty;
        existingItem.totalPrice = existingItem.price.newPrice * qty;
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.qty,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      localStorage.setItem("hd-cart", JSON.stringify(state));
      toast.success("Product quantity updated");
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      localStorage.setItem("hd-cart", JSON.stringify(state));
      toast.success("All products cleared from cart");
    },
    order: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      localStorage.setItem("hd-cart", JSON.stringify(state));
      toast.success("Order placed successfully");
    }
  }
});

export const { addToCart, removeFromCart, clearCart, updateCart, order } =
  cartSlice.actions;

export default cartSlice.reducer;
