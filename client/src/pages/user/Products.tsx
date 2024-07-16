import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, Product, addToFavorites, removeFromFavorites } from '../../redux/slices/productSlice';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import ProductList from '../../components/ProductList';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const favorites = useSelector((state: RootState) => state.products.favorites);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart({ ...product, quantity: 1 }));
  };

  const handleAddToFavorites = (id: number) => {
    if (favorites.includes(id)) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl my-4">Products</h2>
      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
        onAddToFavorites={handleAddToFavorites}
        favorites={favorites}
      />
    </div>
  );
};

export default Products;
