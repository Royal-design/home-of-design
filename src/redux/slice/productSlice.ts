import { data } from "@/assets/data/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProductType = (typeof data.products)[0];

interface ProductState {
  products: ProductType[];
  filterProducts: ProductType[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  filterProducts: [],
  loading: false
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
      state.filterProducts = action.payload;
    },
    setFilterProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.filterProducts = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.filterProducts = state.products.filter(
        (product) =>
          product.category.toLowerCase() === action.payload.toLowerCase()
      );
    },
    filterByPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      const { min, max } = action.payload;
      state.filterProducts = state.products.filter(
        (product) =>
          product.price.newPrice >= min && product.price.newPrice <= max
      );
    },
    resetFilters: (state) => {
      state.filterProducts = state.products;
    }
  }
});

export const {
  setProducts,
  setFilterProducts,
  filterByCategory,
  filterByPriceRange,
  resetFilters,
  setLoading
} = productSlice.actions;

export default productSlice.reducer;
