import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image:string;
}

export interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
  favorites: number[];
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  favorites: [],
};

export const fetchProducts:any = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('http://localhost:5000/products');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<number>) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addToFavorites, removeFromFavorites } = productSlice.actions;

export default productSlice.reducer;
