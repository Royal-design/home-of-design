import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { ProductType } from "./productSlice";

export interface FavouriteState {
  items: ProductType[];
  totalFavourite: number;
}
const initialState: FavouriteState = (() => {
  try {
    const storedData = JSON.parse(localStorage.getItem("hd-favourite") || "{}");
    return {
      items: Array.isArray(storedData.items) ? storedData.items : [],
      totalFavourite:
        typeof storedData.totalFavourite === "number"
          ? storedData.totalFavourite
          : 0
    };
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return {
      items: [],
      totalFavourite: 0
    };
  }
})();

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ProductType>) => {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
        state.totalFavourite += 1;
      }
      toast.success("Product added to wishlist!");
      localStorage.setItem("hd-favourite", JSON.stringify(state));
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.totalFavourite -= 1;
      }
      localStorage.setItem("hd-favourite", JSON.stringify(state));
      toast.success("Product removed from wishlist!");
    },
    clearFavourite: (state) => {
      state.items = [];
      state.totalFavourite = 0;
      localStorage.setItem("hd-favourite", JSON.stringify(state));
      toast.success("All products cleared!");
    }
  }
});

export const { addFavorite, removeFavorite, clearFavourite } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
