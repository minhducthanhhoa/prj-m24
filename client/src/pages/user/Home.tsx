import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, Product, addToFavorites, removeFromFavorites } from '../../redux/slices/productSlice';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import ProductList from '../../components/ProductList';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const favorites = useSelector((state: RootState) => state.products.favorites);
  const [category, setCategory] = useState('all');

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

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl my-4">Home</h2>
      <div className="mb-4">
        <button onClick={() => setCategory('all')} className="mr-4">All</button>
        <button onClick={() => setCategory('iphone')} className="mr-4">iPhone</button>
        <button onClick={() => setCategory('android')} className="mr-4">Android</button>
      </div>
      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onAddToFavorites={handleAddToFavorites}
        favorites={favorites}
      />
    </div>
  );
};

export default Home;
