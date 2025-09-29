import React from "react";
import CartItem from "./CartItem";

const CartItemsList = ({ 
  items, 
  selectedItems, 
  onSelectAll, 
  onUnselectAll, 
  onClearSelected, 
  onQuantityChange, 
  onRemove, 
  onToggleSelect 
}) => {
  const isAllSelected = selectedItems.length === items.length && items.length > 0;

  return (
    <div className="lg:col-span-2">
      {/* Select All */}
      <div className="bg-green-50 border-2 border-green-100 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={isAllSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelectAll();
                } else {
                  onUnselectAll();
                }
              }}
            />
            <span className="text-green-900 font-semibold">
              Chọn tất cả ({items.length} sản phẩm)
            </span>
          </label>
          {selectedItems.length > 0 && (
            <button
              onClick={onClearSelected}
              className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
            >
              Xóa đã chọn
            </button>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;
