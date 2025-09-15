import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  favorites: number[];
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  favorites: [],
};

// Async thunk fetch products
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>('http://localhost:5000/products');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (!state.favorites.includes(id)) {
        state.favorites.push(id);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((favId) => favId !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Actions
export const { addToFavorites, removeFromFavorites, toggleFavorite } =
  productSlice.actions;

// Selectors
export const selectAllProducts = (state: { products: ProductState }) =>
  state.products.items;
export const selectProductStatus = (state: { products: ProductState }) =>
  state.products.status;
export const selectFavorites = (state: { products: ProductState }) =>
  state.products.favorites;

export default productSlice.reducer;
