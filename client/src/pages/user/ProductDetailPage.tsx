import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, Product } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/productSlice';
import ProductDetail from '../../components/ProductDetail';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.products.items.find((item: Product) => item.id === Number(id))
  );
  const favorites = useSelector((state: RootState) => state.products.favorites);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart({ ...product, quantity: 1 }));
    }
  };

  const handleAddToFavorites = () => {
    if (product) {
      if (favorites.includes(product.id)) {
        dispatch(removeFromFavorites(product.id));
      } else {
        dispatch(addToFavorites(product.id));
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onAddToFavorites={handleAddToFavorites}
        isFavorite={favorites.includes(product.id)}
      />
    </div>
  );
};

export default ProductDetailPage;
