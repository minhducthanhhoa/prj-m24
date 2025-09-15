import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  Product,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/productSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import ProductList from "../../components/ProductList";

const CATEGORY_OPTIONS = [
  { key: "all", label: "All" },
  { key: "iphone", label: "iPhone" },
  { key: "android", label: "Android" },
];

const CategoryFilter: React.FC<{
  selected: string;
  onChange: (category: string) => void;
}> = ({ selected, onChange }) => (
  <div className="mb-4">
    {CATEGORY_OPTIONS.map((cat) => (
      <button
        key={cat.key}
        onClick={() => onChange(cat.key)}
        className={`mr-4 ${
          selected === cat.key ? "font-bold text-blue-600" : ""
        }`}
      >
        {cat.label}
      </button>
    ))}
  </div>
);

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const favorites = useSelector((state: RootState) => state.products.favorites);

  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => { 
    dispatch(addItemToCart({ ...product, quantity: 1 }));
    alert("Thêm vào giỏ hàng thành công");
  };

  const handleToggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? products
        : products.filter((product) => product.category === category),
    [products, category]
  );

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl my-4">Home</h2>
      <CategoryFilter selected={category} onChange={setCategory} />
      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onAddToFavorites={handleToggleFavorite}
        favorites={favorites}
      />
    </div>
  );
};

export default Home;
