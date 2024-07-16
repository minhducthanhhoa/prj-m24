import { configureStore } from '@reduxjs/toolkit';
import productReducer, { ProductState } from './slices/productSlice';
import userReducer, { UserState } from './slices/userSlice';
import cartReducer, { CartState } from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = {
  products: ProductState;
  user: UserState;
  cart: CartState;
};
export type AppDispatch = typeof store.dispatch;
