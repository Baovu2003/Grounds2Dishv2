import React, { useState, useEffect } from "react";
import useCartStore from "../store/useCartStore";
import CartHeader from "../components/cart/CartHeader";
import EmptyCart from "../components/cart/EmptyCart";
import CartItemsList from "../components/cart/CartItemsList";
import OrderSummary from "../components/cart/OrderSummary";
import CheckoutModal from "../components/cart/CheckoutModal";

const Cart = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    toggleSelect,
    selectAll,
    unselectAll,
    clearSelected,
    getTotalPrice,
    getTotalSelectedItems,
    getSelectedItems,
  } = useCartStore();

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const selectedItems = getSelectedItems();
  const totalPrice = getTotalPrice();
  const totalSelectedItems = getTotalSelectedItems();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", {
      items: selectedItems,
      totalPrice,
      customerInfo: orderForm,
    });

    clearSelected();
    setShowCheckout(false);

    // Hiện thông báo thành công
    setSuccessMessage(
      "🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Grounds2Dish."
    );
  };

  // Tự động ẩn toast sau 3 giây
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <CartHeader
          itemsCount={items.length}
          selectedCount={getTotalSelectedItems()}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItemsList
            items={items}
            selectedItems={selectedItems}
            onSelectAll={selectAll}
            onUnselectAll={unselectAll}
            onClearSelected={clearSelected}
            onQuantityChange={handleQuantityChange}
            onRemove={removeItem}
            onToggleSelect={toggleSelect}
          />

          <OrderSummary
            totalPrice={totalPrice}
            totalSelectedItems={totalSelectedItems}
            onCheckout={() => setShowCheckout(true)}
          />
        </div>

        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          selectedItems={selectedItems}
          totalPrice={totalPrice}
          onSubmit={handleOrderSubmit}
        />

        {/* DaisyUI Toast */}
        {successMessage && (
          <div className="toast toast-top toast-end z-50">
            <div className="alert alert-success flex items-center">
              <span>{successMessage}</span>
              <button
                className="btn btn-sm btn-ghost ml-2"
                onClick={() => setSuccessMessage("")}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
