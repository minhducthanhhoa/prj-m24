import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/productSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { RootState, AppDispatch } from "../../redux/store";
import ProductList from "../../components/ProductList";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, favorites, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleAddToCart = (product: any) => {
    dispatch(addItemToCart({ ...product, quantity: 1 }));
  };

  const toggleFavorite = (id: number) => {
    const action = favorites.includes(id)
      ? removeFromFavorites(id)
      : addToFavorites(id);
    dispatch(action);
  };

  if (loading) {
    return (
      <div className="container mx-auto text-center py-10">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl my-4">Products</h2>
      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
        onAddToFavorites={toggleFavorite}
        favorites={favorites}
      />
    </div>
  );
};

export default Products;
