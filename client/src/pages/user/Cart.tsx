import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";

// Reusable Confirm Modal
interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <p>{message}</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [modalConfig, setModalConfig] = useState<{
    type: "remove" | "clear" | null;
    itemId?: number;
  }>({ type: null });

  const openRemoveModal = (id: number) =>
    setModalConfig({ type: "remove", itemId: id });

  const openClearModal = () => setModalConfig({ type: "clear" });

  const closeModal = () => setModalConfig({ type: null });

  const confirmAction = () => {
    if (modalConfig.type === "remove" && modalConfig.itemId !== undefined) {
      dispatch(removeItemFromCart(modalConfig.itemId));
    } else if (modalConfig.type === "clear") {
      dispatch(clearCart());
    }
    closeModal();
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
          <button
            onClick={openClearModal}
            className="bg-red-500 text-white px-4 py-2 mb-4 rounded"
          >
            Clear Cart
          </button>

          <ul>
            {items.map((item) => (
              <li key={item.id} className="mb-4">
                <h3 className="text-xl">{item.name}</h3>
                <p>Price: ${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, Number(e.target.value))
                  }
                  className="w-16 border px-2 py-1"
                />
                <button
                  onClick={() => openRemoveModal(item.id)}
                  className="bg-red-500 text-white px-4 py-2 ml-4 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {modalConfig.type && (
        <ConfirmModal
          title={
            modalConfig.type === "remove"
              ? "Confirm Deletion"
              : "Confirm Clear Cart"
          }
          message={
            modalConfig.type === "remove"
              ? "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
              : "Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?"
          }
          onConfirm={confirmAction}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default Cart;
