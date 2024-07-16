import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeItemFromCart, updateItemQuantity, clearCart } from '../../redux/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const [showModal, setShowModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setItemToRemove(id);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      dispatch(removeItemFromCart(itemToRemove));
    }
    setShowModal(false);
    setItemToRemove(null);
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowClearModal(false);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl my-4">Cart</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng của bạn trống.</p>
      ) : (
        <div>
          <button onClick={handleClearCart} className="bg-red-500 text-white px-4 py-2 mb-4">Clear Cart</button>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="mb-4">
                <h3 className="text-xl">{item.name}</h3>
                <p>Price: ${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                  className="w-16 border px-2 py-1"
                />
                <button onClick={() => handleRemove(item.id)} className="bg-red-500 text-white px-4 py-2 ml-4">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 mr-2"
                    onClick={confirmRemove}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showClearModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Confirm Clear Cart</h3>
                <p>Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 mr-2"
                    onClick={confirmClearCart}
                  >
                    Clear Cart
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2"
                    onClick={() => setShowClearModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;