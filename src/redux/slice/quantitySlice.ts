import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface quantityState {
  quantity: Record<string, number>;
}
interface UpdateQuantityPayload {
  productId: number;
}
const initialState: quantityState = {
  quantity: {}
};

export const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId } = action.payload;
      state.quantity[productId] = (state.quantity[productId] || 0) + 1;
    },
    decrement: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId } = action.payload;
      if (state.quantity[productId] > 0) {
        state.quantity[productId] -= 1;
      }
    }
  }
});

export const { decrement, increment } = quantitySlice.actions;

export default quantitySlice.reducer;
