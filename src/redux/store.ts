import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { themeSlice } from "./slice/themeSlice";
import { authSlice } from "./slice/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productSlice } from "./slice/productSlice";
import { blogSlice } from "./slice/blogSlice";
import { quantitySlice } from "./slice/quantitySlice";
import { cartSlice } from "./slice/cartSlice";
import { favouriteSlice } from "./slice/favouriteSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    products: productSlice.reducer,
    blogs: blogSlice.reducer,
    quantity: quantitySlice.reducer,
    cart: cartSlice.reducer,
    favourite: favouriteSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firebase Timestamp warnings
        ignoredActions: ["auth/setUser", "auth/setUsers"],
        ignoredPaths: ["auth.user.updatedAt", "auth.users.updatedAt"]
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define AppThunk type for asynchronous actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
