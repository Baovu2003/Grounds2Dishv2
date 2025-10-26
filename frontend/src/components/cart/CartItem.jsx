import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onQuantityChange, onRemove, onToggleSelect }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div
      className={`bg-white border rounded-2xl transition-all duration-300 ${item.selected ? "shadow-md border-[#20161F]" : "border-neutral-200"
        }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => onToggleSelect(item._id)}
          className="w-5 h-5 accent-[#20161F]"
        />

        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.thumbnail?.[0] || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2">
            {item.description}
          </p>
          <div className="font-bold text-base sm:text-lg text-[#20161F] mt-1">
            {formatPrice(item.price)}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(item._id, item.quantity - 1)}
            className="p-1 border rounded-full hover:bg-neutral-100"
          >
            <Minus className="w-4 h-4 text-[#20161F]" />
          </button>
          <span className="w-6 text-center font-semibold text-neutral-900">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item._id, item.quantity + 1)}
            className="p-1 border rounded-full hover:bg-neutral-100"
          >
            <Plus className="w-4 h-4 text-[#20161F]" />
          </button>
        </div>

        {/* Total */}
        <div className="w-28 text-right font-bold text-[#20161F]">
          {formatPrice(item.price * item.quantity)}
        </div>

        {/* Remove */}
        <button
          onClick={() => onRemove(item._id)}
          className="text-red-500 hover:text-red-600 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
